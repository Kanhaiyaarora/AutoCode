# 🚀 AutoCode — AI-Powered Cloud IDE

<p align="center">
  <strong>Build, Edit & Run Applications in the Cloud with AI</strong>
</p>

<p align="center">
  AutoCode is an AI-powered cloud development platform that provisions isolated development environments on demand using Docker and Kubernetes. It combines an intelligent coding assistant, browser-based IDE, live preview, and terminal into a single seamless experience.
</p>

<p align="center">
  <a href="https://github.com/Kanhaiyaarora/AutoCode">
    <img src="https://img.shields.io/badge/GitHub-AutoCode-black?style=for-the-badge&logo=github">
  </a>
</p>

---

# 📑 Table of Contents

- Overview
- Features
- Architecture
- Microservices
- Tech Stack
- Project Workflow
- Live Preview & HMR
- Kubernetes Request Flow
- Local Setup
- Deployment
- Future Improvements
- Author

---

# 🌟 Overview

AutoCode is a cloud-based AI IDE inspired by modern developer platforms. Instead of writing code locally, users can generate, edit, preview, and execute applications directly from the browser inside isolated cloud sandboxes.

Every workspace runs inside its own Docker container managed by Kubernetes, ensuring secure execution and complete isolation between users. The platform follows a microservices architecture, making each component independently scalable and maintainable.

Whether users want to build a React application, edit an existing project, or interact with an AI coding assistant, AutoCode provides a complete browser-based development experience.

---

# ✨ Features

### 🤖 AI Coding Assistant

- Generate projects using AI
- Modify existing source code
- Explain code
- Refactor components
- Build complete applications from prompts

---

### 💻 Browser-Based IDE

- Syntax highlighting
- File Explorer
- Multiple file editing
- Real-time code updates

---

### 📂 Project File Manager

- Browse project files
- Create files
- Delete files
- Rename files
- Update source code instantly

---

### 🐳 Isolated Development Sandboxes

Each project runs inside an independent Docker container.

Benefits:

- Complete isolation
- Secure execution
- Independent dependencies
- Dedicated runtime

---

### ☸ Kubernetes Powered

AutoCode dynamically provisions containers using Kubernetes.

- Create workspace
- Start container
- Expose preview
- Destroy inactive workspaces

---

### ⚡ Live Preview

Projects are automatically served using a development server.

Users receive:

- Live Preview URL
- Instant browser updates
- Real-time application rendering

---

### 🔥 Hot Module Replacement (HMR)

Whenever the AI or developer edits code:

```
Edit File
      │
      ▼
Vite detects change
      │
      ▼
Compile module
      │
      ▼
WebSocket Event
      │
      ▼
Browser Updates
```

No page refresh required.

---

### 🖥 Browser Terminal

Interactive terminal directly inside the browser.

Supports:

- npm install
- npm run dev
- git
- node
- shell commands

---

### 🔐 Authentication

- JWT Authentication
- Secure APIs
- Protected Routes
- User Sessions

---

### 📧 Notification Service

- Login notifications
- System events
- Email notifications

---

### ☁ AWS Deployment

Entire platform is containerized and deployed on AWS.

---

# 🏗 Architecture

```
                         Browser
                              │
      ┌───────────────────────┼────────────────────────┐
      │                       │                        │
      ▼                       ▼                        ▼
 Monaco Editor            AI Chat              Live Preview
                              │
                              ▼
                      React Frontend
                              │
                     API Gateway / Nginx
                              │
      ┌───────────────────────┼────────────────────────┐
      ▼                       ▼                        ▼
 Auth Service        AI Orchestration        Notification
                              │
                              ▼
                      Sandbox Service
                              │
                              ▼
                     Kubernetes Cluster
                              │
      ┌───────────────────────┼────────────────────────┐
      ▼                       ▼                        ▼
 Docker Pod A          Docker Pod B           Docker Pod C
```

---

# 🧩 Microservices

## 🔐 Authentication Service

Responsible for:

- User Registration
- Login
- JWT Authentication
- Authorization
- User Management

---

## 🤖 AI Orchestration Service

Acts as the brain of AutoCode.

Responsibilities:

- Accept prompts
- Generate code
- Edit project files
- Coordinate with Sandbox Service
- Return AI responses

---

## 🐳 Sandbox Service

Responsible for:

- Creating Docker containers
- Provisioning Kubernetes Pods
- Managing workspace lifecycle
- Starting development servers
- Generating Preview URLs

---

## 📧 Notification Service

Responsible for:

- Login Emails
- Notifications
- Future alert integrations

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Socket.IO Client

---

## Backend

- Node.js
- Express.js
- JWT
- Socket.IO

---

## Infrastructure

- Docker
- Kubernetes
- Nginx
- AWS

---

## Database

- MongoDB

---

## AI

- OpenAI API / Anthropic API *(Configure your preferred provider)*

---

# 🔄 Project Workflow

```
User Prompt
      │
      ▼
AI Service
      │
Generate Code
      │
      ▼
Sandbox Service
      │
Create Workspace
      │
      ▼
Docker Container
      │
npm run dev
      │
      ▼
Preview URL
      │
      ▼
Browser
```

---

# ⚡ Live Preview & HMR

Whenever the user or AI modifies source code:

```
Source Code Updated
        │
        ▼
Container Filesystem
        │
        ▼
Vite detects change
        │
        ▼
Hot Module Replacement
        │
        ▼
Browser updates instantly
```

---

# 🌐 Kubernetes Request Flow

```
Browser
      │
      ▼
AWS Load Balancer
      │
      ▼
Nginx Ingress Controller
      │
      ▼
Sandbox Service
      │
      ▼
Kubernetes Service
      │
      ▼
Docker Container
      │
      ▼
React / Vite Dev Server
```

The Ingress Controller routes incoming requests to the appropriate workspace, allowing multiple isolated projects to run simultaneously without port conflicts.

---

# 🚀 Local Setup

Clone repository

```bash
git clone https://github.com/Kanhaiyaarora/AutoCode.git

cd AutoCode
```

Install dependencies

```bash
npm install
```

Start backend

```bash
npm run server
```

Start frontend

```bash
npm run dev
```

Run Docker services

```bash
docker compose up
```

Deploy Kubernetes resources

```bash
kubectl apply -f k8s/
```

---

# ☁ Deployment

AutoCode is deployed on AWS using a containerized microservices architecture.

Infrastructure includes:

- AWS
- Docker
- Kubernetes
- Nginx Ingress
- MongoDB
- Node.js Services

---

# 🔮 Future Improvements

- GitHub Integration
- Multi-AI Model Support
- Persistent Workspaces
- Workspace Snapshots
- Real-time Collaboration
- Multi-user Editing
- Plugin Marketplace
- AI Debugging Assistant
- One-click Project Deployment

---

# 📂 Repository

GitHub:

https://github.com/Kanhaiyaarora/AutoCode

---

# 👨‍💻 Author

**Kanhaiya Arora**

Full Stack MERN Developer

**Tech Stack**

- React
- Node.js
- Express
- MongoDB
- Docker
- Kubernetes
- AWS
- AI Applications

---

## ⭐ If you found this project interesting, don't forget to star the repository!
