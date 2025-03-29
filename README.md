# CENCALTINTING Frontend

A modern web application for CENCALTINTING built with Next.js, TypeScript, and Ant Design.

## Project Overview

- **Project Name:** CENCALTINTING
- **Project Scale:** Enterprise Application
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
