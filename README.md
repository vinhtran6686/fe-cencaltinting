# CENCALTINTING Frontend

A modern web application for Central California Tinting services built with Next.js, TypeScript, and Ant Design.

## 🚀 Quick Start Guide

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager
- Git

### Complete Setup Process

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd cencaltinting-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your specific configuration values.

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Environment Configuration

### Required Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Base URL for API requests | `http://localhost:4000/api/v1` |
| `NEXT_PUBLIC_API_TIMEOUT` | API request timeout (ms) | `30000` |
| `NEXT_PUBLIC_AUTH_ENABLED` | Enable/disable authentication | `true` |
| `NEXT_PUBLIC_FEATURE_NOTIFICATIONS` | Enable/disable notifications | `true` |

### Environment Files
- `.env.local`: Local development (not committed to git)
- `.env.development`: Development environment
- `.env.production`: Production environment

## 💻 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Lint code with ESLint |
| `npm run format` | Format code with Prettier |
| `npm run stylelint` | Lint CSS with Stylelint |

## 🛠️ Technology Stack

- **Frontend Framework:** Next.js with TypeScript
- **UI Components:** Ant Design
- **State Management:** Redux with Redux Toolkit
- **API Integration:** TanStack Query with Axios
- **API Standard:** RESTful
- **Routing:** Next.js Pages Router
- **Code Quality:** ESLint, Prettier, and Stylelint

## 📋 Development Guidelines

### Building for Production

```bash
npm run build
# or
yarn build
```

### Running Production Build

```bash
npm run start
# or
yarn start
```

## 📚 Documentation

For detailed technical information about the project architecture and development standards, please refer to:

- [Technical Design Document](./documents/Technical_Design_Document.md) - Comprehensive guide to the project's module-centric architecture, coding standards, and best practices
