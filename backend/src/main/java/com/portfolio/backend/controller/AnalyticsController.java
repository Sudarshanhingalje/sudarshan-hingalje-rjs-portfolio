package com.portfolio.backend.controller;

import com.portfolio.backend.model.VisitorLog;
import com.portfolio.backend.repository.VisitorLogRepository;
import com.portfolio.backend.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/analytics")
public class AnalyticsController {

    private final VisitorLogRepository visitorLogRepository;
    private final AuthService authService;
    private final RestTemplate restTemplate = new RestTemplate();

    public AnalyticsController(VisitorLogRepository visitorLogRepository, AuthService authService) {
        this.visitorLogRepository = visitorLogRepository;
        this.authService = authService;
    }

    // Public endpoint: Log visitor session page views
    @PostMapping("/track")
    public ResponseEntity<?> trackVisitor(@RequestBody Map<String, Object> req, HttpServletRequest request) {
        String browser = (String) req.getOrDefault("browser", "Unknown");
        String device = (String) req.getOrDefault("device", "Desktop");
        String os = (String) req.getOrDefault("os", "Unknown");
        int views = (int) req.getOrDefault("views", 1);
        long duration = ((Number) req.getOrDefault("duration", 0)).longValue();

        String ip = (String) req.get("ip");
        if (ip == null || ip.isEmpty() || "127.0.0.1".equals(ip) || "0:0:0:0:0:0:0:1".equals(ip)) {
            ip = request.getRemoteAddr();
        }
        String ipHash = authService.hashIp(ip);

        String country = (String) req.get("country");
        String city = (String) req.get("city");
        Double latitude = req.get("latitude") != null ? ((Number) req.get("latitude")).doubleValue() : null;
        Double longitude = req.get("longitude") != null ? ((Number) req.get("longitude")).doubleValue() : null;

        if (country == null || country.equalsIgnoreCase("Unknown")) {
            Map<String, Object> geo = getGeoLocation(ip);
            country = (String) geo.get("country");
            city = (String) geo.get("city");
            latitude = (Double) geo.get("lat");
            longitude = (Double) geo.get("lon");
        }

        VisitorLog log = VisitorLog.builder()
                .ipHash(ipHash)
                .browser(browser)
                .device(device)
                .os(os)
                .pageViews(views)
                .sessionDuration(duration)
                .country(country)
                .city(city)
                .latitude(latitude)
                .longitude(longitude)
                .build();

        VisitorLog saved = visitorLogRepository.save(log);
        return ResponseEntity.ok(Map.of("success", true, "data", saved));
    }

    // Admin endpoint: Fetch summary stats breakdowns
    @GetMapping("/summary")
    public ResponseEntity<?> getAnalyticsSummary() {
        List<VisitorLog> logs = visitorLogRepository.findAllByOrderByCreatedAtDesc();
        
        // Calculate breakdowns (last 500 records to prevent overhead)
        List<VisitorLog> sample = logs.stream().limit(500).toList();
        long total = sample.size();

        Map<String, Long> browserCounts = sample.stream()
                .filter(l -> l.getBrowser() != null)
                .collect(Collectors.groupingBy(VisitorLog::getBrowser, Collectors.counting()));
        Map<String, Integer> browserShares = new HashMap<>();
        browserCounts.forEach((k, v) -> browserShares.put(k, (int) Math.round((v * 100.0) / total)));

        Map<String, Long> deviceCounts = sample.stream()
                .filter(l -> l.getDevice() != null)
                .collect(Collectors.groupingBy(VisitorLog::getDevice, Collectors.counting()));
        Map<String, Integer> deviceShares = new HashMap<>();
        deviceCounts.forEach((k, v) -> deviceShares.put(k, (int) Math.round((v * 100.0) / total)));

        // Real page view totals from visitor logs
        long totalPV = logs.stream().mapToLong(VisitorLog::getPageViews).sum();
        Map<String, Integer> pageViews = new java.util.LinkedHashMap<>();
        pageViews.put("/", (int) totalPV);
        pageViews.put("/#projects", (int) (logs.stream()
                .filter(l -> l.getPageViews() > 1).mapToLong(VisitorLog::getPageViews).sum()));
        pageViews.put("/#experience", (int) (logs.stream()
                .filter(l -> l.getPageViews() > 2).mapToLong(VisitorLog::getPageViews).sum()));
        pageViews.put("/#contact", (int) (logs.stream()
                .filter(l -> l.getPageViews() > 3).mapToLong(VisitorLog::getPageViews).sum()));

        Map<String, Object> summary = Map.of(
                "browsers", browserShares,
                "devices", deviceShares,
                "pages", pageViews
        );

        return ResponseEntity.ok(Map.of(
                "success", true,
                "data", Map.of(
                        "logs", logs.stream().limit(50).toList(), // return last 50 visits
                        "summary", summary
                )
        ));
    }

    // Admin endpoint: All individual visitors with coordinates (one dot per visitor)
    // active = visited within last 10 minutes → green dot
    // past   = older than 10 minutes         → blue dot
    @GetMapping("/visitors")
    public ResponseEntity<?> getAllVisitors() {
        List<VisitorLog> logs = visitorLogRepository.findAllByOrderByCreatedAtDesc();
        LocalDateTime activeThreshold = LocalDateTime.now().minusMinutes(10);

        List<Map<String, Object>> result = logs.stream()
                .filter(l -> l.getLatitude() != null && l.getLongitude() != null
                        && l.getLatitude() != 0.0 && l.getLongitude() != 0.0)
                .map(l -> {
                    boolean active = l.getCreatedAt() != null
                            && l.getCreatedAt().isAfter(activeThreshold);
                    Map<String, Object> m = new HashMap<>();
                    m.put("id",        l.getId());
                    m.put("lat",       l.getLatitude());
                    m.put("lon",       l.getLongitude());
                    m.put("city",      l.getCity() != null ? l.getCity() : "Unknown");
                    m.put("country",   l.getCountry() != null ? l.getCountry() : "Unknown");
                    m.put("device",    l.getDevice() != null ? l.getDevice() : "Unknown");
                    m.put("browser",   l.getBrowser() != null ? l.getBrowser() : "Unknown");
                    m.put("pageViews", l.getPageViews());
                    m.put("duration",  l.getSessionDuration());
                    m.put("active",    active);
                    m.put("createdAt", l.getCreatedAt() != null ? l.getCreatedAt().toString() : "");
                    return m;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(Map.of("success", true, "data", result));
    }

    // Admin endpoint: Fetch geographical coordinates bubbles
    @GetMapping("/geography")
    public ResponseEntity<?> getGeographicalDetails() {
        List<VisitorLog> logs = visitorLogRepository.findAll();

        // Group by City and Country to aggregate counts
        Map<String, List<VisitorLog>> grouped = logs.stream()
                .filter(l -> l.getCity() != null && !l.getCity().equals("Unknown"))
                .collect(Collectors.groupingBy(l -> l.getCity() + ", " + l.getCountry()));

        List<Map<String, Object>> list = new ArrayList<>();
        grouped.forEach((label, cityLogs) -> {
            VisitorLog first = cityLogs.get(0);
            long count = cityLogs.size();

            Double lat = first.getLatitude();
            Double lon = first.getLongitude();
            // Default center if no coordinates
            if (lat == null) lat = 20.5937;
            if (lon == null) lon = 78.9629;

            // Active in last 10 minutes
            long activeCount = cityLogs.stream().filter(l -> {
                if (l.getCreatedAt() == null) return false;
                return l.getCreatedAt().isAfter(LocalDateTime.now().minusMinutes(10));
            }).count();

            list.add(Map.of(
                    "code", first.getCountry().substring(0, Math.min(first.getCountry().length(), 2)).toUpperCase(),
                    "name", label, // e.g. "Kolhapur, India"
                    "city", first.getCity(),
                    "country", first.getCountry(),
                    "count", count,
                    "active", activeCount > 0 ? (int) activeCount : 0,
                    "lat", lat,
                    "lon", lon
            ));
        });

        // Add a fallback if empty
        if (list.isEmpty()) {
            list.add(Map.of("code", "IN", "name", "Pune, India", "city", "Pune", "country", "India", "count", 0L, "active", 0, "lat", 18.5204, "lon", 73.8567));
        }

        // Sort by visit count descending
        list.sort((a, b) -> Long.compare((Long) b.get("count"), (Long) a.get("count")));

        return ResponseEntity.ok(Map.of("success", true, "data", list));
    }

    private Map<String, Object> getGeoLocation(String ip) {
        if ("127.0.0.1".equals(ip) || "0:0:0:0:0:0:0:1".equals(ip)) {
            return Map.of("country", "India", "city", "Pune", "lat", 18.5204, "lon", 73.8567);
        }
        try {
            // Free geolocator API
            Map<?, ?> geo = restTemplate.getForObject("http://ip-api.com/json/" + ip, Map.class);
            if (geo != null && "success".equals(geo.get("status"))) {
                return Map.of(
                        "country", geo.get("country") != null ? (String) geo.get("country") : "Unknown",
                        "city", geo.get("city") != null ? (String) geo.get("city") : "Unknown",
                        "lat", geo.get("lat") != null ? ((Number) geo.get("lat")).doubleValue() : 0.0,
                        "lon", geo.get("lon") != null ? ((Number) geo.get("lon")).doubleValue() : 0.0
                );
            }
        } catch (Exception e) {
            // Ignore
        }
        return Map.of("country", "Unknown", "city", "Unknown", "lat", 0.0, "lon", 0.0);
    }
}
