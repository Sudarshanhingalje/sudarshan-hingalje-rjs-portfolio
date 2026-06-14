# 🌌 Sudarshan Hingalje — AI-Powered Full Stack Portfolio & CMS

<div align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5-6DB33F?logo=springboot&logoColor=white&style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white&style=for-the-badge)
![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk&logoColor=white&style=for-the-badge)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?logo=tailwindcss&logoColor=white&style=for-the-badge)
![Ollama](https://img.shields.io/badge/Ollama-Local_AI-000000?logo=ollama&logoColor=white&style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white&style=for-the-badge)

**A premium, highly interactive full-stack developer portfolio with a built-in AI voice assistant, multilingual support, and a fully-featured CMS admin dashboard.**

[🌐 Live Demo](https://sudarshan-hingalje-rjs-portfolio.vercel.app) · [🐛 Report Bug](https://github.com/Sudarshanhingalje/sudarshan-hingalje-rjs-portfolio/issues) · [✨ Request Feature](https://github.com/Sudarshanhingalje/sudarshan-hingalje-rjs-portfolio/issues)

</div>

---

## 📸 Preview

> A modern developer portfolio combining React animations, an offline-first AI voice assistant, and a secure admin CMS — all in one codebase.

---

## ✨ Features

### 🤖 AI Voice Assistant ("Sudarshan AI")
- **Conversational Voice Chat** — Click the avatar to activate. The assistant speaks and listens in turn-based mode (mic opens only after the AI finishes speaking, preventing self-interruption).
- **Multilingual Support** — Fully supports **English**, **Hindi (हिंदी)**, and **Marathi (मराठी)**:
  - Language-specific speech recognition (Web Speech API `lang` codes: `en-US`, `hi-IN`, `mr-IN`).
  - Automatic TTS voice selection using Devanagari Unicode range detection (`\u0900-\u097F`).
  - Ollama backend detects the user's question language and responds in the **same language**.
  - Multilingual welcome greetings and exit phrase detection in all 3 languages.
- **First-Person Persona** — The AI responds as Sudarshan himself (first-person "I", "my projects", etc.).
- **Strict Length Control** — All responses are capped at 2–5 lines (max 7 lines) for natural conversational pacing.
- **Offline-First** — Powered by [Ollama](https://ollama.com) running locally — **zero API keys, zero cloud costs**.
- **Instant Outside-Click Kill-Switch** — Clicking anywhere outside the avatar immediately and forcefully stops all speech synthesis, mic, and async operations.
- **Click-to-Interrupt** — Click the avatar mid-speech to instantly stop it and open the mic for a new question.
- **Multilingual Exit Detection** — Say "bye", "बाय", "धन्यवाद", "टाटा", or "आभारी आहे" to end the session.

### 🌀 Sudarshan Chakra Navigation Wheel
- **Rotatable Navigation** — A physical yellow SVG wheel fixed to the bottom-right corner lets visitors spin to scroll through portfolio sections.
- **First-Visit Onboarding** — On every page load, a bouncing glowing **"SUDARSHAN CHAKRA"** badge with a double-chevron down arrow appears directly above the wheel to guide new visitors.
- **Smart Dismissal** — The onboarding badge disappears the moment the visitor scrolls, clicks, or touches the wheel.
- **Inertia & Snap** — The wheel snaps to the nearest section with a spring animation and plays a click sound on each rotation.

### 💬 Smart Speech Bubble (TalkingBubble)
- **Typewriter Effect** — Text types out letter-by-letter for a premium feel.
- **Dynamic Word Highlighting** — The term **"Sudarshan Chakra"** is automatically highlighted in glowing yellow (`text-yellow-400 animate-pulse`) whenever it appears in the bubble.
- **Combined Onboarding Message** — The first-visit bubble shows both the standard welcome and the wheel usage instruction in one elegant box with a clear gap.

### 🎛️ Admin CMS Dashboard (Ember Studio)
- **Secure Login** — JWT-authenticated admin panel at `/admin/login`.
- **AI Assistant Panel** — Full control over the Ollama AI: toggle the chatbot, edit the portfolio knowledge base, update behavior prompts, and view live chat logs.
- **Projects, Experience & Skills Manager** — CRUD management for all portfolio content backed by MySQL.
- **Resume Manager** — Upload and publish resumes directly to GitHub Assets via a GitHub token; new public URLs are generated automatically.
- **Analytics & World Map** — Real-time visitor tracking with country, city, browser, and device data visualized on a world map.
- **Contact Logs** — View and manage all visitor contact form submissions.
- **Security Center** — IP blocking and advanced request controls.

### 🎨 Design & Animations
- Glassmorphism UI with dark mode aesthetics.
- Smooth section transitions using **Framer Motion** and **GSAP**.
- **Galaxy & Stars Background** — Dynamic canvas particle backgrounds in dark mode.
- **Interactive Circle Menu** — Quick-access floating ring menu for instant section navigation.
- **Responsive** — Fully optimized for mobile, tablet, and desktop.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 18 + Vite 5 |
| **Styling** | Tailwind CSS 3 + Custom CSS |
| **Animations** | Framer Motion, GSAP, Canvas Confetti, Swiper.js |
| **Voice AI (Frontend)** | Web Speech API (SpeechRecognition + SpeechSynthesis) |
| **AI Backend** | Ollama (local LLM — `llama3.2:3b` or any compatible model) |
| **Backend Framework** | Spring Boot 3.5.0 (Java 21) |
| **Security** | Spring Security + JWT |
| **Database** | MySQL 8 + Spring Data JPA |
| **Email** | Java Mail Sender (SMTP) |
| **Deployment** | Vercel (Frontend) + Local/Self-hosted (Backend) |

---

## 📁 Project Structure

```text
sudarshan-hingalje-rjs-portfolio/
├── frontend/                        # React Vite Application
│   ├── src/
│   │   ├── sections/
│   │   │   └── Header.jsx           # AI voice assistant & avatar logic
│   │   ├── components/
│   │   │   ├── Wheel.jsx            # Sudarshan Chakra navigation wheel
│   │   │   ├── TalkingBubble.jsx    # Speech bubble with word highlighting
│   │   │   ├── CircleMenu.jsx       # Floating quick-nav ring menu
│   │   │   └── ...
│   │   ├── admin/                   # Admin CMS Dashboard (Ember Studio)
│   │   │   ├── pages/
│   │   │   │   ├── AiManagement.jsx # AI Assistant admin control panel
│   │   │   │   ├── Analytics.jsx
│   │   │   │   └── ...
│   │   │   └── components/
│   │   │       └── Sidebar.jsx
│   │   └── App.jsx                  # Root app with onboarding reset logic
│   └── package.json
│
└── backend/                         # Spring Boot Java Application
    ├── src/main/java/com/portfolio/backend/
    │   ├── controller/
    │   │   └── AiController.java    # /webhook/chat & /ai/* endpoints
    │   └── service/
    │       └── OllamaService.java   # Multilingual prompt builder
    ├── src/main/resources/
    │   └── application.properties
    └── pom.xml
```

---

## ⚙️ Local Development Setup

### Prerequisites

| Tool | Version |
|---|---|
| Node.js | v20.x or higher |
| Java Development Kit (JDK) | JDK 21 |
| Maven | v3.9+ |
| MySQL | v8.x |
| Ollama | Latest ([download](https://ollama.com)) |

---

### 1. Backend Setup

```bash
cd backend
```

Create a `.env` file inside the `backend/` directory:

```env
DB_URL=jdbc:mysql://localhost:3306/portfolio_db?createDatabaseIfNotExist=true
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_super_secret_jwt_key_should_be_at_least_256_bits
GITHUB_TOKEN=your_github_personal_access_token_for_assets_upload
SMTP_PASSWORD=your_email_smtp_app_password
```

Set `JAVA_HOME` if Maven picks up a different JDK (PowerShell):

```powershell
$env:JAVA_HOME = 'C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot'
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
```

Run the Spring Boot server:

```bash
mvn spring-boot:run
```

> Backend runs at `http://localhost:8080`

---

### 2. Ollama AI Setup (Required for Voice Assistant)

Install Ollama from [https://ollama.com](https://ollama.com), then pull and run the model:

```bash
ollama run llama3.2:3b
```

> Ollama must be running at `http://localhost:11434` before starting the backend.
> The AI assistant will gracefully fall back to an offline message if Ollama is not running.

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:8080/api
```

Start the development server:

```bash
npm run dev
```

> Frontend runs at `http://localhost:5173`

---

## 🚀 Deployment

Since cloud platforms have limited free-tier options for running Spring Boot backends permanently, the portfolio uses a smart hybrid deployment strategy:

```
[Local Backend + Admin CMS]  ──▶  Uploads Resume & Assets  ──▶  GitHub Assets Repo
                                                                        │
[Vercel Frontend] ◀─────────────────────────────────────────────────────┘
  - Fetches assets directly from GitHub
  - High performance & zero hosting cost
```

### Steps

1. Run the backend locally: `mvn spring-boot:run`
2. Log in to the Admin Dashboard at `http://localhost:5173/admin/login`
3. Upload resumes, update projects, skills, or experiences.
4. Push frontend changes to GitHub — Vercel auto-deploys.

---

## 🎤 Using the AI Voice Assistant

| Action | Result |
|---|---|
| Click the avatar | Starts the session — speaks a welcome message |
| Speak your question | AI fetches answer from Ollama and speaks it back |
| Click language pill (English / हिंदी / मराठी) | Switches voice recognition and synthesis language |
| Click avatar while speaking | Instantly interrupts the AI and opens the mic |
| Say "bye" / "धन्यवाद" / "टाटा" | Ends the conversation |
| Click anywhere outside the avatar | Immediately kills all voice and mic activity |

---

## 🌀 Using the Sudarshan Chakra Wheel

| Action | Result |
|---|---|
| Drag / rotate the wheel | Smoothly scrolls to the next or previous section |
| Click left half | Scrolls to the previous section |
| Click right half | Scrolls to the next section |
| Scroll mouse wheel over it | Navigates sections with inertia |

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author

**Sudarshan Hingalje**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white&style=flat-square)](https://www.linkedin.com/in/sudarshanhingalje)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white&style=flat-square)](https://github.com/Sudarshanhingalje)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?logo=vercel&logoColor=white&style=flat-square)](https://sudarshan-hingalje-rjs-portfolio.vercel.app)

---

<div align="center">
⭐ If you found this project helpful, please give it a star — it helps others discover it!
</div>
