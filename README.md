# 🌌 Sudarshan Hingalje - Interactive RJS Portfolio & CMS Admin Dashboard

A premium, highly interactive full-stack developer portfolio and content management system (CMS). Built with a state-of-the-art **React & Vite** frontend featuring rich micro-animations (Framer Motion, GSAP, Canvas Confetti) and powered by a robust **Spring Boot 3.5 (Java 21)** backend with **Spring Security & JWT**.

---

## 🚀 Key Features

*   **Dynamic Design & Animations**: Implemented sleek dark mode aesthetics, glassmorphism, responsive navigation, and smooth animations using GSAP and Framer Motion.
*   **Interactive Circle Menu**: Quick-action floating ring menu for instant navigation and actions.
*   **Admin CMS Dashboard**: Secure administration dashboard with credentials authentication (JWT tokens) to live-manage portfolio content.
*   **Real-time Resume Manager**: Direct resume upload/switch panel that automatically uploads documents to a GitHub Assets repository, updates active flags, and makes them instantly available.
*   **World Map Analytics**: Visual database-backed visitor analytics tracking contact form actions.
*   **Email Integrations**: Seamless SMTP mail sender integration to send email notifications immediately when visitor requests are made.

---

## 🛠️ Technology Stack

### Frontend
*   **Framework**: React 18 (Vite-powered for lightning-fast loads)
*   **Styling**: Tailwind CSS & Custom CSS modules
*   **Animations**: Framer Motion, GSAP (GreenSock), Canvas Confetti, Swiper.js, SplitType, Three.js
*   **Icons**: Lucide React & React Icons
*   **HTTP Client**: Axios

### Backend
*   **Framework**: Spring Boot 3.5.0 (Java 21)
*   **Security**: Spring Security & JSON Web Tokens (JWT) for secure admin sessions
*   **Database ORM**: Spring Data JPA with MySQL Connector
*   **Utilities**: Project Lombok, Java Mail Sender (SMTP)

---

## 📁 Project Structure

```text
sudarshan-hingalje-rjs-portfolio/
├── frontend/             # React Vite Application
│   ├── src/
│   │   ├── components/   # UI & Layout components (Circle Menu, Buttons, etc.)
│   │   ├── pages/        # Portfolio sections and Admin Dashboard
│   │   └── data/         # Mock data & Fallbacks
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies & scripts
│
└── backend/              # Spring Boot Java Application
    ├── src/main/java/    # Java controllers, services, repositories
    ├── src/main/resources/
    │   └── application.properties  # Database and server configs
    └── pom.xml           # Maven dependencies & properties
```

---

## ⚙️ Development Setup

Follow these steps to run the portfolio locally on your machine.

### Prerequisites
*   **Node.js**: v20.x or higher
*   **Java Development Kit (JDK)**: JDK 21
*   **Maven**: v3.9+
*   **MySQL Database**: Server running locally or in the cloud

---

### Backend Setup (Local)

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Create a `.env` file inside the `backend/` directory (ensure it is added to `.gitignore` to protect secrets):
    ```env
    DB_URL=jdbc:mysql://localhost:3306/portfolio_db?createDatabaseIfNotExist=true
    DB_USERNAME=your_mysql_username
    DB_PASSWORD=your_mysql_password
    JWT_SECRET=your_super_secret_jwt_key_should_be_at_least_256_bits
    GITHUB_TOKEN=your_github_personal_access_token_for_assets_upload
    SMTP_PASSWORD=your_email_smtp_app_password
    ```

3.  Set the `JAVA_HOME` environment variable to point to JDK 21 (if Maven uses an older version):
    *   **PowerShell**:
        ```powershell
        $env:JAVA_HOME = 'C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot'
        $env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
        ```
    *   **Git Bash / Linux**:
        ```bash
        export JAVA_HOME="/path/to/your/jdk-21"
        export PATH="$JAVA_HOME/bin:$PATH"
        ```

4.  Run the Spring Boot application:
    ```bash
    mvn spring-boot:run
    ```
    The backend server will spin up on `http://localhost:8080`.

---

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure local environment variables in a `frontend/.env.local` file:
    ```env
    VITE_API_URL=http://localhost:8080/api
    ```

4.  Start the Vite development server:
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

---

## 🎯 Production Workflow & Deployment

Since cloud platforms have limited free-tier options for running Spring Boot (Java) backends permanently, the portfolio uses a smart hybrid deployment strategy:

```text
[Local Backend + Admin CMS]  ──▶ Updates Resume & Assets  ──▶ Uploads to GitHub Repo
                                                                     │
[Vercel Frontend] ◀──────────────────────────────────────────────────┘
  - Fetches assets directly from GitHub
  - High performance & zero hosting cost!
```

### 1. Updating Portfolio Content & Resume
1.  Launch your local backend (`mvn spring-boot:run`) and local frontend (`npm run dev`).
2.  Login to the Admin Dashboard locally at `http://localhost:5173/admin/login`.
3.  Upload the latest resume, add new projects, skills, or experiences.
4.  The backend will automatically publish the new documents to your GitHub Assets repository and generate a public URL.

### 2. Hardcoding/Fallback Settings
When the frontend is deployed to Vercel and the backend is kept offline, the frontend will automatically use the configured fallback URLs.
*   **Active Resume Fallback**: Configured in [DownloadButton.jsx](file:///D:/sudarshan/Portfolio/sudarshan-hingalje-rjs-portfolio/sudarshan-hingalje-rjs-portfolio/frontend/src/components/DownloadButton.jsx) (`resumeUrl` prop) to pull directly from your raw GitHub assets repository:
    ```javascript
    resumeUrl: propResumeUrl = "https://raw.githubusercontent.com/Sudarshanhingalje/portfolio-assets/main/resumes/Sudarshan_Hingalje_Resume_3fff8ba8.pdf"
    ```

### 3. Deploying to Vercel
Simply push your frontend changes to GitHub, and Vercel will automatically trigger a new deployment.
If you need to redeploy manually:
1.  Go to your Vercel Dashboard.
2.  Select the project `sudarshan-hingalje-rjs-portfolio`.
3.  Click **Deployments** → Select the latest commit → click **Redeploy**.
