# CENCALTINTING Frontend

CENCALTINTING built with Next.js, TypeScript, and Ant Design.

## Project Overview

- **Project Name:** CENCALTINTING 
- **Architecture:** Modular structure with Pages Router pattern

## Technology Stack

- **Core Technology:** NextJS, TypeScript
- **UI Library:** Ant Design
- **State Management:** Redux with Redux Toolkit
- **Data Fetching & Caching:** TanStack Query with Axios
- **API Standard:** RESTful
- **Routing:** NextJS built-in Pages Router
- **Linting & Formatting:** ESLint, Prettier, and Stylelint

## Project Structure

```
cencaltinting-frontend/
├── public/                      # Static files
├── src/                         # Main source directory
│   ├── components/              # Reusable components
│   │   ├── common/              # Common UI components
│   │   └── layout/              # Layout components
│   ├── hooks/                   # Custom React hooks
│   ├── modules/                 # Feature-based modules
│   ├── pages/                   # NextJS pages
│   ├── services/                # Global services
│   ├── store/                   # Redux store configuration
│   ├── styles/                  # Global styles
│   ├── types/                   # TypeScript type definitions
│   └── utils/                   # Utility functions
├── .eslintrc.js                 # ESLint configuration
├── .prettierrc                  # Prettier configuration
├── .stylelintrc.js              # Stylelint configuration
├── next.config.js               # NextJS configuration
└── tsconfig.json                # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd cencaltinting-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
# or
yarn build
```

### Starting Production Server

```bash
npm run start
# or
yarn start
```

## Code Conventions

- **Naming:**
  - Use PascalCase for components and interface names
  - Use camelCase for variables, functions, and methods
  - Use kebab-case for CSS class names

- **File Organization:**
  - Group related files in directories
  - Keep components focused on a single responsibility
  - Follow the modular architecture pattern

## Available Scripts

- `npm run dev` - Run development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Lint code with ESLint
- `npm run format` - Format code with Prettier
- `npm run stylelint` - Lint CSS with Stylelint

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Ant Design Documentation](https://ant.design/docs/react/introduce)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [TanStack Query Documentation](https://tanstack.com/query/latest/)

## Environment Variables

The application uses environment variables for configuration. Make sure to set these up before running the application:

### Setup Environment Variables

1. Copy `.env.example` to `.env.local` for local development:
   ```bash
   cp .env.example .env.local
   ```

2. Update the values in `.env.local` according to your environment.

### Available Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Base URL for API requests | `http://localhost:4000` |
| `NEXT_PUBLIC_API_TIMEOUT` | API request timeout in milliseconds | `30000` |
| `NEXT_PUBLIC_AUTH_ENABLED` | Enable/disable authentication | `true` |
| `NEXT_PUBLIC_FEATURE_NOTIFICATIONS` | Enable/disable notification system | `true` |

### Environment Files

- `.env.local`: Local development environment (not committed to git)
- `.env.development`: Development environment
- `.env.production`: Production environment

## Notification System

The application includes a comprehensive notification system built with Ant Design. For detailed documentation, see [docs/notification-system.md](docs/notification-system.md).

### Features

- Automatically displays notifications based on API response status codes
- Supports four notification types: success, info, warning, and error
- Can be toggled on/off using the `NEXT_PUBLIC_FEATURE_NOTIFICATIONS` environment variable
- Customizable duration, placement, and content

### Testing Notifications

You can test the notification system by visiting the Proposal page at `/proposal`, which includes a test UI for triggering different types of notification messages.
