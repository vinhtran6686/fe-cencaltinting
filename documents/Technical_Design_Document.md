# CENCALTINTING Frontend - Technical Design Document

## 1. Introduction

This document outlines the technical architecture and design principles for the CENCALTINTING Frontend application. The application is built following a module-centric architecture pattern that promotes maintainability, scalability, and performance.

## 2. Architecture Overview

The CENCALTINTING Frontend follows a **Module-Centric Architecture** where features are organized into self-contained modules. This approach provides several benefits:

- **Separation of Concerns**: Each module encapsulates a specific business feature
- **Code Organization**: Clear structure makes the codebase navigable and maintainable
- **Scalability**: New features can be added as independent modules
- **Team Collaboration**: Teams can work on different modules with minimal conflicts

## 3. Directory Structure

```
/src
  /modules                   # Each module represents an independent feature
    /[featureName]           # Example: /appointments
      /components            # Module components
        /[SubFeature]        # Example: /CreateAppointment
          index.tsx          # Main component of sub-feature
          /components        # Sub-feature components
        /shared              # Shared components within module
      /hooks                 # Custom hooks for module
      /services              # API services for module
      /redux                 # State management for module
        /[entity]Slice.ts    # Redux slice for entity
        /[entity]Types.ts    # Type definitions for redux state
        /[entity]Selectors.ts # State selectors
      /utils                 # Utilities for module (if needed)
      /types                 # Type definitions for module (if needed)
      index.ts               # Export all public APIs of module
  /pages                     # Next.js pages
    /[featureName]           # Pages for routing
      index.tsx              # Main page
      /[id].tsx              # Detail page
      /create.tsx            # Creation page
  /components                # Global UI components
    /common                  # Basic shared components
    /layout                  # Layout-related components
    /providers               # Provider components
    /[ComponentName]         # Individual components
  /services                  # Global services (API, auth, etc.)
  /store                     # Redux store configuration
    /slices                  # Redux slices
    rootReducer.ts           # Root reducer
    index.ts                 # Store configuration
  /types                     # Global type definitions
  /constants                 # Global constants
  /styles                    # Global styles
  /theme                     # Theme configuration
  /utils                     # Global utilities
```

## 4. Layering Principles

The application follows a clear layering structure:

- **Pages Layer**: Contains only routing and high-level layout code. Minimal logic.
- **Modules Layer**: Contains all business logic and feature-specific UI components.
- **Root Directories** (`/components`, `/services`, `/utils`, etc.): Contains code reused across multiple modules.

## 5. Component Design

### 5.1 Component Classification

#### Container Components
- Manage state and handle logic
- Call services/APIs, dispatch Redux actions
- Pass data and callbacks down to Presentational Components
- Handle transformation and data preparation

#### Presentational Components
- Focus on UI rendering
- Receive data and callbacks via props
- Should be wrapped with `React.memo()` to avoid unnecessary re-renders
- Contain minimal or no logic

### 5.2 Component Design Principles

- **Immutability & Single Responsibility**
  - Each component should have a single responsibility
  - Avoid side effects in components when possible
  - Prioritize stateless functional components
  - Always treat props and state as immutable

- **Reusability**
  - Components used across multiple modules: place in `/components`
  - Components used in multiple places within a module: place in `/modules/[featureName]/components/shared`
  - Components used only in one context: place in `/modules/[featureName]/components/[context]`
  - Extract complex UI patterns into reusable components

## 6. State Management

### 6.1 State Classification

- **UI State**: Use React's `useState` or `useReducer` (dropdowns, form validation, etc.)
- **Server State**: Use React Query or custom hooks (data from APIs)
- **Global State**: Use Redux (user auth, global settings, etc.)

### 6.2 Redux Organization

- **When to use Redux**:
  - For complex global state affecting many components
  - For state that needs to persist across navigation/page refreshes
  - For complex state manipulation with middleware (saga, thunk)

- **Redux Structure**:
  - Organized by domain/entity (e.g., `/store/slices/appointmentsSlice.ts`)
  - Use RTK (Redux Toolkit) to simplify Redux development
  - Create selectors for accessing state
  - Keep actions and reducers together in slice files
  - Organize state in a normalized standard

### 6.3 State Colocation

- Always place state at the lowest possible level
- Lift state up only when necessary
- Use Context for state that needs to be shared between multiple components
- Avoid prop drilling by creating custom hooks with context

### 6.4 Derived State

- Use `useMemo` for derived state from props or other state
- Don't store data that can be calculated
- Memoize expensive calculations

## 7. Services

### 7.1 Module Services (Local)

- Located in `/modules/[featureName]/services`
- Handle API calls related to specific modules
- Perform data transformation for the module
- Examples: `appointmentsService.ts`, `vehiclesService.ts`

### 7.2 Global Services

- Located in the root `/services` directory
- Provide infrastructure-related utility functions
- Used for authentication, logging, analytics, etc.
- Examples: `apiService.ts`, `authService.ts`, `errorService.ts`, `notificationService.ts`

### 7.3 Service Design Principles

- Module services should use global services
- Avoid circular dependencies
- Follow dependency injection principles
- Use interfaces for service contracts

## 8. Custom Hooks

### 8.1 Hook Design

- Focus on a single concern
- Names start with "use" (e.g., `useAppointments`)
- Return object with clear naming, not position-dependent
- Document input parameters and return values

### 8.2 Data Fetching Hooks

- **Core Principles**:
  - Create dedicated hooks for each entity/resource
  - Place module-specific hooks in `/modules/[featureName]/hooks`
  - Place project-wide hooks in the root `/hooks` directory
  - Separate read operations from write operations
  - Use memoization to avoid unnecessary re-fetches

- **API Call Optimization**:
  - Use appropriate caching strategies
  - Implement proper retry and invalidation logic
  - Avoid fetching data unnecessarily multiple times
  - Transform data before it reaches components

- **Example Structure**:
  ```typescript
  export const useServicePackages = (params?: {
    search?: string;
    tag?: string;
  }) => {
    // Structured query key
    const queryKey = ['services', 'packages', params?.search || null, params?.tag || null];
    
    // Memoize fetch function
    const fetchServices = useCallback(() => {
      return ServicesService.getServicePackages(params);
    }, [params?.search, params?.tag]);
    
    return {
      data: [],
      isLoading: false,
      error: null,
      refetch: fetchServices
    };
  };
  ```

- **Preventing Excessive API Calls**:
  - Use the `enabled` flag to control when queries run
  - Implement `useCallback` for query functions dependent on changing variables
  - Use `keepPreviousData` when paginating or filtering
  - Implement request deduplication with unique query keys

### 8.3 Other Hook Types

- **UI Logic Hooks**: Extract logic from components
  - Example: `useFormValidation()`, `useModalState()`
- **Behavior Hooks**: Handle complex behaviors
  - Example: `useDragAndDrop()`, `useAutosave()`

### 8.4 Memoization in Hooks

- Use `useMemo` to cache expensive calculation results
- Use `useCallback` to prevent function recreation
- Always specify complete dependency arrays
- Consider using memoized selectors for Redux (reselect)

## 9. Type System Organization

### 9.1 Type Hierarchy

- **Domain Models**: Core business entities
  - Located in `/modules/[feature]/types/models` (if needed)
  - Example: `Appointment.ts`, `Vehicle.ts`
  
- **DTOs (Data Transfer Objects)**: API request/response shapes
  - Located in `/modules/[feature]/types/dto` (if needed)
  - Example: `AppointmentResponse.ts`, `CreateAppointmentRequest.ts`
  
- **UI Types**: Component props, state types
  - Co-located with components
  - Example: `AppointmentListProps.ts`
  
- **Utility Types**: Generic type utilities
  - Located in `/types` or `/utils/types`
  - Example: `Nullable<T>`, `DeepPartial<T>`

### 9.2 Type Composition and Inheritance

- Prioritize composition over inheritance
- Create small, focused interfaces
- Combine interfaces with intersection types
- Use generics for reusable type patterns

### 9.3 Type Declaration Best Practices

- Use clear type annotations for function parameters and returns
- Avoid `any` and `unknown` types
- Use discriminated unions for state machines
- Create mapped types for related concepts
- Document complex types with JSDoc comments

## 10. Performance Optimization

### 10.1 Component Memoization

- Use `React.memo()` for presentational components
- Provide custom comparison functions when needed
- Strategy for when to use memo

### 10.2 Callback Stability

- Use `useCallback` for all event handlers passed down
- Always specify complete dependency arrays
- Consider using callback refs instead of `useEffect` for DOM measurements

### 10.3 Using Refs Appropriately

- Use `useRef` for values that should be stored but not trigger re-renders
- Use refs for DOM element references
- Store previous values with refs when needed

### 10.4 State Management for Performance

- Split state into smaller pieces when possible
- Only update necessary state
- Consider using libraries like Immer for immutable updates

### 10.5 Component Design for Performance

- Avoid large component trees
- Consider windowing for long lists (react-window, react-virtualized)
- Implement lazy loading for components and data
- Use React Profiler to identify unnecessary re-renders

## 11. Coding Standards

### 11.1 TypeScript Usage

- Use TypeScript for all source code
- Avoid using `any` and `unknown`
- Clearly define interfaces and types
- Enable strict mode in tsconfig

### 11.2 Naming Conventions

- PascalCase for components: `AppointmentList`
- camelCase for variables, functions, methods: `useAppointments`
- UPPER_SNAKE_CASE for constants: `API_ENDPOINTS`
- Consider prefixing interfaces with 'I' (optional): `IAppointment`

### 11.3 Import Order

1. External libraries
2. Root-level components/hooks/utils/services
3. Module-specific components/hooks/utils
4. Local components/types
5. CSS/SCSS imports

## 12. Data Flow Patterns

### 12.1 Fetch Pattern

```
hooks/useEntity -> services/entityService -> services/apiService -> API Endpoint
```

### 12.2 State Update Pattern

```
UI Event -> Container Component -> Service Call/State Update -> Props Update -> UI Update
```

### 12.3 Redux Flow (when applicable)

```
UI Event -> Action Creator -> Middleware (if needed) -> Reducer -> Selectors -> Components
```

## 13. Quality Assurance Checklist

Before committing code, ensure:

1. Components are properly separated?
2. State is placed at the appropriate level?
3. Memo, useMemo, useCallback are used for performance optimization?
4. Dependencies of useEffect, useMemo, and useCallback are accurate?
5. There is a clear separation between UI and logic?
6. Services have single responsibilities?
7. Types and interfaces are fully defined?
8. Props and state are treated as immutable?
9. Code is easily testable?
10. Code adheres to the module-centric structure?
11. Optimizations are in place to avoid excessive API calls?
12. Type hierarchy is organized according to guidelines?
 