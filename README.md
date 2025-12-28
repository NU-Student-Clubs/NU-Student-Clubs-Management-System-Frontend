# NU Student Clubs Management System - Frontend

> A comprehensive frontend platform for managing student clubs at NU.  Built with Angular 21, TypeScript, and Tailwind CSS, this application provides a clean, modern UI to browse clubs, view profiles, explore events, see best members, and manage user authentication.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat&logo=angular&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Building](#building)
- [Testing](#testing)
- [Available Routes](#available-routes)
- [Environment Configuration](#environment-configuration)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The NU Clubs Hub platform is designed to streamline student club management by providing an intuitive interface for students, club administrators, and system administrators.  The frontend offers a smooth, user-friendly experience with lazy-loaded modules for optimal performance.

## ✨ Features

- **🏠 Home Dashboard**: Overview of active clubs and key statistics
- **🔐 Authentication**:  Secure login and registration system
- **📊 Dashboard**: Personalized dashboard for managing club activities
- **🎭 Clubs Management**: Browse, search, and manage student clubs
- **📅 Events**: View and manage upcoming club events
- **🖼️ Gallery**: Photo gallery for club memories
- **👥 Admin Panel**: Administrative tools for system management
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **⚡ Lazy Loading**: Optimized performance with lazy-loaded modules
- **🎨 Modern UI**: Clean and intuitive user interface

## 🛠️ Tech Stack

- **Framework**: Angular 21.0.0
- **Language**: TypeScript 5.9.2
- **Styling**: Tailwind CSS 3.4.19
- **Server**: Express.js 5.1.0 (for SSR)
- **State Management**: RxJS 7.8.0
- **Testing**: Vitest 4.0.8
- **Build Tool**: Angular CLI 21.0.3
- **Package Manager**: npm 11.6.2

## 📁 Project Structure

```
NU-Student-Clubs-Management-System-Frontend/
├── . github/                    # GitHub configurations
├── nu-student-clubs-frontend/  # Main application directory
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/           # Core module (guards, interceptors, services)
│   │   │   ├── shared/         # Reusable components and models
│   │   │   │   ├── components/ # Shared components (Navbar, Sidebar)
│   │   │   │   └── models/     # TypeScript interfaces (User, Club, Event)
│   │   │   ├── pages/          # Feature modules (lazy-loaded)
│   │   │   │   ├── auth/       # Authentication pages
│   │   │   │   ├── dashboard/  # Dashboard module
│   │   │   │   ├── clubs/      # Clubs management
│   │   │   │   ├── events/     # Events module
│   │   │   │   ├── gallery/    # Gallery module
│   │   │   │   ├── admin/      # Admin panel
│   │   │   │   └── home/       # Home page component
│   │   │   ├── app.ts          # Root component
│   │   │   ├── app.routes.ts   # Application routing
│   │   │   └── app.config.ts   # Application configuration
│   │   ├── main.ts             # Application entry point
│   │   ├── main.server.ts      # Server-side rendering entry
│   │   └── server.ts           # Express server configuration
│   ├── public/                 # Static assets
│   ├── angular.json            # Angular workspace configuration
│   ├── package.json            # Dependencies and scripts
│   ├── tsconfig.json           # TypeScript configuration
│   └── tailwind.config.js      # Tailwind CSS configuration
├── package.json                # Root package configuration
├── tailwind.config.js          # Root Tailwind configuration
└── postcss.config.js           # PostCSS configuration
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**:  Version 20.x or higher
- **npm**: Version 11.6.2 or higher (comes with Node.js)
- **Angular CLI**: Version 21.x or higher

```bash
# Install Angular CLI globally
npm install -g @angular/cli@21
```

## 🚀 Installation

1. **Clone the repository**

```bash
git clone https://github.com/NU-Student-Clubs/NU-Student-Clubs-Management-System-Frontend.git
cd NU-Student-Clubs-Management-System-Frontend
```

2. **Navigate to the application directory**

```bash
cd nu-student-clubs-frontend
```

3. **Install dependencies**

```bash
npm install
```

4. **Set up environment variables**

Create environment configuration files in `src/environments/`:

- `environment.ts` for development
- `environment.prod.ts` for production

Example configuration:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

## 💻 Development

### Start Development Server

```bash
cd nu-student-clubs-frontend
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload when you modify source files.

### Development with Custom Port

```bash
ng serve --port 4300
```

### Development with Open Browser

```bash
ng serve --open
```

## 🏗️ Building

### Development Build

```bash
ng build
```

Build artifacts will be stored in the `dist/` directory.

### Production Build

```bash
ng build --configuration production
```

This creates an optimized production build with: 
- Minified code
- Tree-shaking
- Ahead-of-time (AOT) compilation
- Production environment variables

### Server-Side Rendering (SSR) Build

```bash
npm run serve:ssr: nu-student-clubs-frontend
```

## 🧪 Testing

### Unit Tests

Run unit tests with Vitest:

```bash
ng test
```

### Watch Mode

```bash
ng test --watch
```

### End-to-End Tests

```bash
ng e2e
```

Note: Angular CLI doesn't come with an E2E testing framework by default. You can integrate Cypress or Playwright as needed.

## 🗺️ Available Routes

| Route | Description | Module |
|-------|-------------|--------|
| `/` | Home page | HomeComponent |
| `/auth` | Authentication pages | AuthModule |
| `/auth/login` | User login | LoginComponent |
| `/auth/register` | User registration | RegisterComponent |
| `/dashboard` | User dashboard | DashboardModule |
| `/clubs` | Clubs listing and management | ClubsModule |
| `/events` | Events listing | EventsModule |
| `/gallery` | Photo gallery | GalleryModule |
| `/admin` | Admin management panel | AdminModule |

All feature modules are **lazy-loaded** for optimal performance.

## ⚙️ Environment Configuration

The application uses environment-specific configuration files:

### Development Environment

**File**: `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  // Add other development-specific configurations
};
```

### Production Environment

**File**: `src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.nucluibshub.com',
  // Add other production-specific configurations
};
```

## 🏛️ Architecture

### Modular Structure

- **Core Module**: Contains singleton services, guards, and interceptors
- **Shared Module**: Reusable components, directives, and pipes
- **Feature Modules**: Lazy-loaded modules for each major section

### Key Features

- **Lazy Loading**: All feature modules are lazy-loaded to improve initial load time
- **Standalone Components**: Modern Angular standalone components for better tree-shaking
- **Server-Side Rendering**: Built-in SSR support for improved SEO and performance
- **Responsive Design**:  Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript support with strict type checking

## 📦 Dependencies

### Core Dependencies

- `@angular/core`: ^21.0.0
- `@angular/common`: ^21.0.0
- `@angular/router`: ^21.0.0
- `@angular/forms`: ^21.0.0
- `express`: ^5.1.0
- `rxjs`: ~7.8.0

### Development Dependencies

- `@angular/cli`: ^21.0.3
- `typescript`: ~5.9.2
- `tailwindcss`: ^3.4.19
- `autoprefixer`: ^10.4.23
- `vitest`: ^4.0.8

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow Angular style guide
- Use Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features

### Prettier Configuration

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "overrides": [
    {
      "files": "*.html",
      "options": {
        "parser": "angular"
      }
    }
  ]
}
```

## 📄 License

This project is maintained by the NU-Student-Clubs organization. 

## 🔗 Links

- **Repository**: [NU-Student-Clubs-Management-System-Frontend](https://github.com/NU-Student-Clubs/NU-Student-Clubs-Management-System-Frontend)
- **Organization**: [NU-Student-Clubs](https://github.com/NU-Student-Clubs)
- **Angular Documentation**: [angular.dev](https://angular.dev)
- **Tailwind CSS**:  [tailwindcss.com](https://tailwindcss.com)

## 📞 Support

For questions or support, please open an issue in the [GitHub repository](https://github.com/NU-Student-Clubs/NU-Student-Clubs-Management-System-Frontend/issues).

---

**Built with ❤️ by the NU Student Clubs Team**
