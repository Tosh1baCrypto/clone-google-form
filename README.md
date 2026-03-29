# Google Forms Clone - Monorepo

A full-stack Google Forms clone built with a modern tech stack, organized as a monorepo for seamless development.

## 🚀 Tech Stack

- **Monorepo Manager:** [Turborepo](https://turbo.build/)
- **Frontend:** React, TypeScript, Vite, Redux Toolkit (RTK Query)
- **Backend:** NestJS, TypeScript, GraphQL (Apollo)
- **Package Manager:** npm Workspaces

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9 or higher)

---

## 📥 Getting Started

1. npm install
2. npm run dev

   
📁 Project Structure
├── apps/
│   ├── client/       # React + Vite frontend
│   └── server/       # NestJS + GraphQL backend
├── packages/
│   └── typescript-config/  # Shared TS configurations
├── turbo.json        # Turborepo configuration
└── package.json      # Root workspace configuration

