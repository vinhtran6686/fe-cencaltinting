# Cursor AI Coding Rules: React Module-Centric Architecture

## Module-Centric Structure

### 1. Directory Organization
```
/src
  /modules                   # Each module represents an independent feature
    /[featureName]           # Example: /appointments
      /components
        /[SubFeature]        # Example: /CreateAppointment
          index.tsx          # Main component for sub-feature
          /components        # Sub-feature specific components
        /shared              # Components shared within the module
        /[Entity]            # Entity-based components (e.g. /steps)
          /components        # Entity child components
        index.ts             # Export all components
      /hooks                 # Custom hooks for the module
      /services              # API services for the module
      /redux                 # State management for the module
        /[entity]Slice.ts    # Redux slice for entity
        /[entity]Types.ts    # Type definitions for redux state
        /[entity]Selectors.ts # State selectors
        /[entity]Actions.ts  # Action creators (if needed)
        store.ts             # Module-specific store configuration
      /utils                 # Module-specific utilities
      /types                 # Type definitions for the module
        /models              # Domain model types (e.g., Appointment.ts)
        /dto                 # Data Transfer Object types (API request/response)
        /enums               # Enumerations
        index.ts             # Aggregate exports
      index.ts               # Export all public APIs of the module
  /pages                     # Next.js/React Router pages
    /[featureName]           # Pages for routing only
      index.tsx              # Main listing page
      /[id].tsx              # Detail page
      /create                # Create page
        index.tsx
  /components                # Global UI components reused across the project
  /hooks                     # Global hooks reused across the project
  /services                  # Global services (API, auth, etc.)
  /utils                     # Global utilities reused across the project
```

### 2. Layering Principles
- **Pages**: Contains only routing code and high-level layout. Minimal logic.
- **Modules**: Contains all business logic and UI components specific to a feature.
- **Root-level directories** (`/components`, `/hooks`, `/services`, `/utils`): Contain code reused across multiple modules throughout the project.

## Component Design Rules

### 1. Component Classification
- **Container Components**: 
  - Manage state and handle logic
  - Call services/APIs, dispatch Redux actions
  - Pass data and callbacks down to Presentational Components
  - Handle data transformation and preparation

- **Presentational Components**:
  - Focus on UI rendering
  - Receive data and callbacks via props
  - Should be wrapped with `React.memo()` to prevent unnecessary re-renders
  - Should contain minimal or no logic

### 2. Immutability & Single Responsibility
- Each component should have a single responsibility
- Avoid side effects in components when possible
- Prefer stateless functional components
- Always treat props and state as immutable

### 3. Reusability
- Components shared across multiple modules: place in root `/components`
- Components shared across multiple places within a module: place in `/modules/[featureName]/components/shared`
- Components used only in one context: place in `/modules/[featureName]/components/[context]`
- Extract complex UI patterns into reusable components

## State Management

### 1. State Classification
- **UI State**: Use React's `useState` or `useReducer` (dropdowns, form validation, etc.)
- **Server State**: Use React Query or SWR (data from APIs)
- **Global State**: Use Redux or Context API (user auth, global settings, etc.)

### 2. Redux Role and Organization
- **When to use Redux**:
  - For complex global state that affects multiple components
  - For state that needs to persist across navigation/page refreshes
  - For complex state manipulation with middleware (saga, thunk)

- **Redux Structure**:
  - Organize by domain/entity (e.g., `/appointments/redux/appointmentsSlice.ts`)
  - Use RTK (Redux Toolkit) for simplified Redux development
  - Create selectors for accessing state (`/selectors.ts`)
  - Keep actions and reducers together in a slice file
  - Use normalized state shape for entities
  - Consider using RTK Query for data fetching if React Query isn't used

### 3. State Colocation
- Always place state at the lowest possible level
- Lift state up only when necessary
- Use Context for state that needs to be shared between multiple components
- Avoid prop drilling by creating custom hooks with context

### 4. Derived State
- Use `useMemo` for derived state from props or other state
- Don't store data that can be calculated
- Memoize expensive calculations

## Services

### 1. Module Services (Local)
- Place in `/modules/[featureName]/services`
- Handle API calls related to the specific module
- Perform data transformation for the module
- Example: `appointmentsService.ts`, `vehiclesService.ts`

### 2. Global Services
- Place in root `/services`
- Provide utility functions related to infrastructure
- Used for authentication, logging, analytics, etc.
- Example: `apiService.ts`, `authService.ts`

### 3. Service Composition
- Module services should use global services
- Avoid circular dependencies
- Follow dependency injection principles
- Use interfaces for service contracts

## Custom Hooks

### 1. Hook Design
- Focus on a single concern
- Name starting with "use" (e.g., `useAppointments`)
- Return object with clear naming, position-independent
- Document input parameters and return values

### 2. Data Fetching with React Query
- **Basic Principles**:
  - Create dedicated hooks for each entity/resource
  - Place module-specific hooks in `/modules/[featureName]/hooks`
  - Place project-wide hooks in root `/hooks`
  - Separate read operations from write operations
  - Use appropriate React Query features (invalidation, refetching, caching)

- **Optimizing API Calls**:
  - Use `staleTime` to control refetch frequency (e.g., `staleTime: 60000` for 1 minute)
  - Use `cacheTime` to control how long data stays in cache
  - Implement proper query keys with specific parameters
  - Use query key factories for consistent keys
  - Apply `select` to transform data before it enters the component

- **Example Structure**:
  ```typescript
  export const useServicePackages = (params?: {
    search?: string;
    tag?: string;
  }) => {
    // Structured query key to ensure proper caching
    const queryKey = ['services', 'packages', params?.search || null, params?.tag || null];
    
    return useQuery<ServicePackagesData, Error>({
      queryKey,
      queryFn: () => ServicesService.getServicePackages(params),
      staleTime: 300000, // 5 minutes
      cacheTime: 600000, // 10 minutes
      select: (data) => transformData(data), // Optional transformation
    });
  };
  ```

- **Preventing Excessive API Calls**:
  - Use `enabled` flag to control when queries run
  - Implement `useCallback` for query functions that depend on changing variables
  - Use `keepPreviousData` when paginating or filtering
  - Implement request deduplication with unique query keys
  - Consider using `refetchOnWindowFocus: false` for less critical data
  - Use `useQueries` for batch fetching multiple resources

### 3. Other Hook Types
- **UI Logic Hooks**: Separate logic from components
  - Example: `useFormValidation()`, `useModalState()`
- **Behavior Hooks**: Handle complex behaviors
  - Example: `useDragAndDrop()`, `useAutosave()`

### 4. Memoization in Hooks
- Use `useMemo` to cache expensive computation results
- Use `useCallback` to prevent recreation of functions
- Always specify complete dependency arrays
- Consider using memoized selectors for Redux (reselect)

## Type System Organization

### 1. Type Hierarchy
- **Domain Models**: Core business entities
  - Place in `/modules/[feature]/types/models`
  - Example: `Appointment.ts`, `Vehicle.ts`
  
- **DTOs (Data Transfer Objects)**: API request/response shapes
  - Place in `/modules/[feature]/types/dto`
  - Example: `AppointmentResponse.ts`, `CreateAppointmentRequest.ts`
  
- **UI Types**: Component props, state types
  - Co-locate with components
  - Example: `AppointmentListProps.ts`
  
- **Utility Types**: Generic type utilities
  - Place in `/modules/[feature]/types/utils` or root `/utils/types`
  - Example: `Nullable<T>`, `DeepPartial<T>`

### 2. Type Composition and Inheritance
- Prefer composition over inheritance
- Create small, focused interfaces
- Combine interfaces with intersection types
- Use generics for reusable type patterns

### 3. Type Declaration Best Practices
- Use explicit type annotations for function parameters and returns
- Avoid `any` and `unknown` types
- Use discriminated unions for state machines
- Create mapped types for related concepts
- Document complex types with JSDoc comments

### 4. Example Type Structure
```typescript
// Domain model
export interface Appointment {
  id: string;
  contactId: string;
  vehicleDetails: VehicleDetails;
  services: AppointmentService[];
  startDate: string;
  notes: string;
  status: AppointmentStatus;
}

// DTO
export interface AppointmentResponse {
  _id: string;
  contact: ContactResponse;
  vehicle: VehicleResponse;
  services: ServiceResponse[];
  startDate: string;
  endDate: string;
  notes: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Request type
export interface CreateAppointmentRequest {
  contactId: string;
  vehicleDetails: VehicleDetailsRequest;
  services: AppointmentServiceRequest[];
  startDate: string;
  notes?: string;
}
```

## Performance Optimization and Preventing Re-renders

### 1. Component Memoization
- Use `React.memo()` for presentational components
- Provide custom comparison function when needed
- Be strategic about when to use memo

### 2. Callback Stability
- Use `useCallback` for all event handlers passed down
- Always specify complete dependency arrays
- Consider using callback refs instead of `useEffect` for DOM measurements

### 3. Refs for Non-Render-Triggering Values
- Use `useRef` for values that need to be stored but shouldn't trigger re-renders
- Use refs for DOM element references
- Store previous values with refs when needed

### 4. State Splitting
- Split state into smaller pieces when possible
- Update only the necessary state
- Consider using libraries like Immer for immutable updates

### 5. Component Design for Performance
- Avoid large component trees
- Consider windowing for long lists (react-window, react-virtualized)
- Implement lazy loading for components and data
- Use the React Profiler to identify unnecessary renders

## Coding Standards

### 1. TypeScript
- Use TypeScript for all source code
- Avoid using `any` and `unknown`
- Define clear interfaces and types
- Enable strict mode in tsconfig

### 2. Naming Conventions
- PascalCase for components: `AppointmentList`
- camelCase for variables, functions, methods: `useAppointments`
- UPPER_SNAKE_CASE for constants: `API_ENDPOINTS`
- Consider prefixing interfaces with 'I' (optional): `IAppointment`

### 3. Import Order
1. External libraries
2. Root-level components/hooks/utils/services
3. Module specific components/hooks/utils
4. Local components/types
5. CSS/SCSS imports

## Data Flow

### 1. Fetch Pattern
```
hooks/useEntity -> services/entityService -> services/apiService -> API Endpoint
```

### 2. State Update Pattern
```
UI Event -> Container Component -> Service Call/State Update -> Props Update -> UI Update
```

### 3. Redux Flow (when applicable)
```
UI Event -> Action Creator -> Middleware (if needed) -> Reducer -> Selectors -> Components
```

## Pre-Commit Checklist

1. Are components appropriately decomposed?
2. Is state placed at the appropriate level?
3. Are memo, useMemo, useCallback utilized for performance optimization?
4. Are dependencies of useEffect, useMemo, and useCallback correct?
5. Is there a clear separation between UI and logic?
6. Do services have single responsibilities?
7. Are types and interfaces fully defined?
8. Are props and state treated as immutable?
9. Is the code easily testable?
10. Does the code adhere to the module-centric structure?
11. Are React Query configurations optimized to prevent excessive API calls?
12. Is the type hierarchy organized according to guidelines?

---

_By following these rules, you will build a highly modular codebase that is maintainable, extensible, and optimized for performance._ 