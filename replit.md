# ZANA AUTO - Luxury Car Dealership Platform

## Overview

ZANA AUTO is a premium luxury car dealership web application built with a React frontend and Express backend. The platform allows users to browse high-end vehicles, view detailed car listings, submit inquiries to sell their cars, and contact the dealership. The application features a dark automotive theme with French language localization, targeting the luxury/premium car market.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **Styling**: Tailwind CSS with custom dark automotive theme and CSS variables
- **UI Components**: shadcn/ui component library (New York style) built on Radix UI primitives
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Carousel**: Embla Carousel for mobile-friendly vehicle listing carousels
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: REST API with typed route definitions in `shared/routes.ts`
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Validation**: Zod for runtime validation, drizzle-zod for schema-to-validation integration
- **Development**: Hot module replacement via Vite middleware in development mode

### Data Storage
- **Database**: PostgreSQL (connection via `DATABASE_URL` environment variable)
- **Schema Location**: `shared/schema.ts` defines the `cars` table with fields for vehicle details (make, model, year, price, mileage, fuel type, transmission, body type, condition, colors, availability, images array, features array, description, featured flag)
- **Migrations**: Drizzle Kit for schema migrations (`drizzle-kit push` command)

### Project Structure
```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and query client
├── server/          # Express backend
│   ├── routes.ts    # API route handlers
│   ├── storage.ts   # Database access layer
│   └── db.ts        # Database connection
├── shared/          # Shared code between client/server
│   ├── schema.ts    # Drizzle database schema
│   └── routes.ts    # API route type definitions
```

### Key Design Patterns
- **Shared Types**: Database schema and API route definitions are shared between frontend and backend via the `shared/` directory
- **Storage Layer**: `DatabaseStorage` class implements `IStorage` interface for database operations, enabling easy testing/mocking
- **Type-safe API**: Routes are defined with Zod schemas for request/response validation
- **Path Aliases**: TypeScript path aliases (`@/`, `@shared/`) for clean imports

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connected via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database toolkit for type-safe queries and migrations

### UI/UX Libraries
- **Radix UI**: Headless accessible component primitives (dialog, dropdown, tabs, etc.)
- **shadcn/ui**: Pre-styled component library built on Radix
- **Lucide React**: Icon library
- **Framer Motion**: Animation library
- **Embla Carousel**: Touch-friendly carousel

### Fonts
- **Google Fonts**: Chakra Petch (display), Kumbh Sans (body), plus additional fonts loaded in HTML

### Images
- **Unsplash**: Vehicle images loaded from Unsplash CDN for demo purposes

### Development Tools
- **Vite**: Build tool and dev server
- **Replit Plugins**: Runtime error overlay, cartographer, and dev banner for Replit environment