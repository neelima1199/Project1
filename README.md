#  Neelora | AI-Powered E-Commerce Platform

Neelora is a next-generation e-commerce platform designed to integrate artificial intelligence with a modern, interactive user experience. The goal of this project is to demonstrate how intelligent systems and scalable architecture can be combined to build a responsive and user-friendly digital product. It focuses not only on functionality but also on clean design, performance, and modular development.

The platform introduces an AI-powered concierge that helps users explore products, answer queries, and improve decision-making during the shopping experience. In addition, a dynamic pricing engine adjusts product prices based on simulated demand patterns, showcasing how data-driven techniques can be applied in real-world business scenarios.

From a system design perspective, Neelora is built using a monorepo architecture, which allows multiple applications and shared modules to be managed efficiently within a single repository. This approach improves code reusability, maintainability, and scalability, making the project closer to real-world industry practices.

The user-facing application (storefront) is designed using modern UI principles with smooth animations and responsive layouts, while the dashboard provides administrative capabilities such as monitoring and analytics. Shared logic, including UI components and AI functionalities, is separated into reusable packages to ensure a clean and organized codebase.

<img width="1851" height="1003" alt="image" src="https://github.com/user-attachments/assets/1ee02f2f-38d3-48db-9103-5c1a5c0e70a9" />


# Key Features

* AI-powered product recommendation and assistance system
* Dynamic pricing based on demand patterns
* Modular and scalable monorepo architecture
* Reusable UI component system
* Smooth animations and interactive user experience
* Cart and checkout functionality

# Project Structure

```
Neelora/
│
├── apps/
│   ├── storefront/        # Main user-facing application
│   └── dashboard/         # Admin panel for analytics and management
│
├── packages/
│   ├── lumina-ui/         # Reusable UI components
│   └── ai-core/           # AI logic and pricing engine
│
├── node_modules/          # Dependencies (ignored)
├── package.json           # Project configuration and scripts
├── turbo.json             # Monorepo configuration
├── Dockerfile             # Deployment setup
├── .gitignore             # Ignored files
└── README.md              # Documentation
```

# Detailed Explanation

## apps/storefront

This is the main application where users interact with the platform. It is built using Next.js and handles product display, navigation, animations, and overall user experience. It focuses on performance, responsiveness, and clean UI design.

## apps/dashboard

This application is designed for administrative purposes. It allows monitoring of data, viewing analytics, and managing different aspects of the platform. It represents the backend-facing interface of the system.

## packages/lumina-ui

This package contains reusable React components used across the project. It ensures consistency in design and reduces duplication by providing shared UI elements like buttons, cards, and layouts.

## packages/ai-core

This module contains the core logic for AI-based functionalities, including product recommendations and pricing strategies. It acts as the intelligence layer of the application.

## Configuration Files

* **package.json** manages dependencies and scripts required to run the project
* **turbo.json** controls how different parts of the monorepo are built and executed
* **Dockerfile** helps in containerizing the application for deployment
* **.gitignore** ensures unnecessary files like node_modules are not pushed to GitHub

# Tech Stack

* Next.js (Frontend Framework)
* Node.js (Backend Logic)
* Framer Motion (Animations)
* CSS (Styling)
* Turborepo (Monorepo Architecture)
* Docker (Deployment Support)

# Getting Started

To run the project locally:

```bash
npm install
npm run dev
```

# Conclusion

Neelora is a complete full-stack project that demonstrates the integration of frontend design, backend logic, and AI-based features into a single system. It highlights the ability to build scalable applications, structure large codebases effectively, and implement modern development practices. The project reflects a strong understanding of both technical implementation and system design.

# Author

Neelima
GitHub: https://github.com/neelima1199
