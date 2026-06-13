# ─── Build Stage ─────────────────────────────────────────────────────────────
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy Maven files
COPY pom.xml .
# Downloader dependencies first (caching layer)
RUN mvn dependency:go-offline -B

# Copy project source
COPY src ./src
# Build application jar
RUN mvn clean package -DskipTests

# ─── Run Stage ──────────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy built artifact from build container
COPY --from=build /app/target/*.jar app.jar

# Port mapping
EXPOSE 8080

# Run commands
ENTRYPOINT ["java", "-jar", "app.jar"]
