# Hulma

**Hulma** is an AI-powered portfolio template generator that helps users create and manage their portfolio using reusable templates. Users can switch between portfolio templates while keeping their saved portfolio content, with AI assistance available for portfolio review and suggestions.

## Running Hulma with Docker

The easiest way to run Hulma for team development is with Docker. This keeps Python, PostgreSQL, Node.js, npm, Tailwind CSS, and project dependencies inside containers so contributors do not need to install them locally.

### 1. Install Docker

Install Docker Desktop or Docker Engine for your operating system.

### 2. Clone Hulma

```bash
git clone <repo-url>
cd hulma
```

### 3. Configure environment

Copy the example environment file and update values if needed:

```bash
cp .env.example .env
```

The default values are set for the local Docker environment. Update the API keys as needed:

- `GROQ_API_KEY`
- `GEMINI_API_KEY`

### 4. Start Hulma

```bash
docker compose up --build
```

This starts the PostgreSQL service, builds the FastAPI app, and runs Tailwind in watch mode for the Jinja templates.

### 5. Open the application

```text
http://localhost:8000
```

### 6. Stop Hulma

```bash
docker compose down
```

### 7. Delete the local database

Only use this if you intentionally want to delete the local PostgreSQL data volume:

```bash
docker compose down -v
```

> Warning: `-v` removes the Docker database volume and all stored PostgreSQL data.

## Tech Stack

### Backend

* FastAPI
* Python
* Jinja2
* SQLAlchemy
* PostgreSQL

### Frontend

* HTML
* Jinja2 Templates
* Tailwind CSS
* JavaScript

### Development Tools

* Git
* GitHub
* npm
* Node.js

---

## Project Structure

```text
projectbai/
├── backend/
│   └── app/
│       ├── __init__.py
│       ├── main.py
│       │
│       ├── models/
│       │
│       ├── routers/
│       │   ├── __init__.py
│       │   └── landing.py
│       │
│       ├── schemas/
│       │
│       └── services/
│
├── frontend/
│   ├── static/
│   │   └── css/
│   │       ├── input.css
│   │       └── output.css
│   │
│   ├── templates/
│   │   ├── base.html
│   │   │
│   │   ├── landing/
│   │   │   └── index.html
│   │   │
│   │   ├── auth/
│   │   │   ├── login.html
│   │   │   └── register.html
│   │   │
│   │   ├── dashboard/
│   │   │   └── index.html
│   │   │
│   │   ├── ai/
│   │   │   └── review.html
│   │   │
│   │   ├── templates/
│   │   │   └── index.html
│   │   │
│   │   └── components/
│   │       ├── navbar.html
│   │       ├── sidebar.html
│   │       └── footer.html
│   │
│   ├── package.json
│   └── package-lock.json
│
├── requirements.txt
├── README.md
├── .gitignore
└── venv/
```

---

# Requirements

Before starting the project, make sure you have:

* Python 3.x
* Node.js
* npm
* Git

> **Note:** npm is included when you install Node.js. You do not need to install Tailwind CSS globally.

---

# Backend Setup

## 1. Clone the Repository

```bash
git clone <repository-url>
cd projectbai
```

## 2. Create a Virtual Environment

```bash
python -m venv venv
```

### Linux / macOS

```bash
source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

## 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

## 4. Run FastAPI

From the project root:

```bash
uvicorn backend.app.main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

---

# Frontend Setup

Hulma uses **Tailwind CSS** for styling.

## 1. Install Node.js

If you don't have Node.js installed, download the LTS version from the official website:

[Node.js](https://nodejs.org/?utm_source=chatgpt.com)

After installing, verify:

```bash
node -v
npm -v
```

You should see the installed versions.

## 2. Install Frontend Dependencies

Navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

This automatically installs the Tailwind CSS packages defined in `package.json`.

## 3. Start Tailwind CSS

```bash
npm run dev
```

Keep this terminal running while developing.

Tailwind will automatically rebuild the CSS whenever you make changes.

---

# Running the Project

You need **two terminals** during development.

### Terminal 1 — Tailwind

```bash
cd ~/Downloads/projectbai/frontend
npm run dev
```

### Terminal 2 — FastAPI

```bash
cd ~/Downloads/projectbai
source venv/bin/activate
uvicorn backend.app.main:app --reload
```

Then open:

```text
http://127.0.0.1:8000
```

---

# For Team Members

If you are working on Hulma for the first time:

### 1. Clone the repository

```bash
git clone <repository-url>
cd projectbai
```

### 2. Set up Python

```bash
python -m venv venv
```

Activate the virtual environment and install dependencies:

```bash
pip install -r requirements.txt
```

### 3. Set up Node.js

Install Node.js if you don't already have it.

Check:

```bash
node -v
npm -v
```

### 4. Install frontend dependencies

```bash
cd frontend
npm install
```

### 5. Start Tailwind

```bash
npm run dev
```

### 6. Start FastAPI

In another terminal:

```bash
cd projectbai
source venv/bin/activate
CC
```

---

# Development Workflow

The project separates the backend and frontend to make it easier for team members to work on different parts of Hulma.

### Backend

Located in:

```text
backend/
```

Used for:

* FastAPI application
* API routes
* Page routes
* Database models
* Pydantic schemas
* Business logic
* AI services

### Frontend

Located in:

```text
frontend/
```

Used for:

* Jinja2 templates
* HTML
* Tailwind CSS
* JavaScript
* Static assets

---

# Important Notes

### Tailwind CSS

Do **not** install Tailwind globally.

After installing Node.js, simply run:

```bash
cd frontend
npm install
npm run dev
```

The project's `package.json` controls the Tailwind version and dependencies.

### Do Not Commit `node_modules`

Make sure `.gitignore` contains:

```gitignore
frontend/node_modules/
venv/
__pycache__/
*.pyc
.env
```

The `node_modules` folder should not be pushed to GitHub.

---

# Git Workflow

Before starting work:

```bash
git pull
```

Create or switch to your branch:

```bash
git checkout -b feature-name
```

After making changes:

```bash
git add .
git commit -m "Add feature"
git push origin feature-name
```

Create a Pull Request on GitHub when your work is ready for review.

---

# Current Architecture

```text
                 ┌──────────────────┐
                 │      Browser     │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │     FastAPI      │
                 │    backend/app   │
                 └────────┬─────────┘
                          │
                 ┌────────▼─────────┐
                 │      Jinja2      │
                 │ frontend/templates│
                 └────────┬─────────┘
                          │
                 ┌────────▼─────────┐
                 │   Tailwind CSS   │
                 │ frontend/static  │
                 └──────────────────┘
```

## Project Goal

Hulma aims to make portfolio creation easier by providing reusable portfolio templates, persistent portfolio content, and AI-assisted portfolio review and suggestions.
