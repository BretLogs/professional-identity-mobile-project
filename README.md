# Professional Identity Mobile Project

A React Native/Expo mobile application built with MVC architecture for professional identity management.

## Project Structure

This project follows the Model-View-Controller (MVC) architectural pattern for better code organization and maintainability.

```
src/
├── models/           # Data models and business logic
├── views/            # UI components and screens
├── controllers/      # Business logic and state management
├── services/         # External API calls and data management
│   ├── api/         # API service functions
│   └── storage/     # Local storage services
├── components/       # Reusable UI components
│   ├── ui/          # Basic UI components
│   └── common/      # Shared components
├── constants/        # Application constants
├── hooks/           # Custom React hooks
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Architecture Overview

### Models (`src/models/`)
- Define data structures and business logic
- Handle data validation and transformation
- Export: `User`, `Profile`, etc.

### Views (`src/views/`)
- UI components and screens
- Present data to users
- Handle user interactions
- Export: `HomeScreen`, `ProfileScreen`, etc.

### Controllers (`src/controllers/`)
- Business logic and state management
- Coordinate between models and views
- Handle application flow
- Export: `UserController`, `ProfileController`, etc.

### Services (`src/services/`)
- External API calls and data management
- Handle data persistence
- Manage external integrations
- Export: API services, storage services

### Components (`src/components/`)
- Reusable UI components
- UI components (`src/components/ui/`)
- Common components (`src/components/common/`)

### Constants (`src/constants/`)
- Application constants and configuration
- Colors, dimensions, API endpoints

### Hooks (`src/hooks/`)
- Custom React hooks
- Shared state logic
- Reusable component logic

### Types (`src/types/`)
- TypeScript type definitions
- Interface definitions
- Type exports

### Utils (`src/utils/`)
- Utility functions and helpers
- Formatters, validators, helpers

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npx expo start
   ```

## Development Guidelines

- Follow the MVC pattern for new features
- Place components in appropriate directories
- Use TypeScript for type safety
- Export components through index files
- Keep business logic in controllers
- Keep UI logic in views
- Keep data logic in models

## Technologies Used

- React Native
- Expo
- TypeScript
- Tamagui (UI library)
- Expo Router (navigation)
