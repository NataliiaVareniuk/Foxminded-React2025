# React E-Commerce Demo

A compact, component-driven e-commerce demo application built with React and Vite. Designed as a portfolio project to demonstrate state management, custom hooks, modular styling, and checkout flow architecture.

**Live Demo**
[View the live app](https://.netlify.app/)

**Overview**
This project implements a small online shop interface including:

- Product listing
- Cart management
- Shipment and contact forms
- Order review and submit flow

State is managed via React Context API, data fetching is encapsulated in custom hooks, and styling is handled with SCSS and CSS Modules.

**Core Features**

- Product list with add-to-cart and quantity control
- Centralized cart state using Context API
- Shipment and contact forms with validation
- Region and country lookup logic
- Order summary page with calculated totals
- Modular styling architecture (SCSS base + CSS Modules)
- Provider pattern for scalable state handling
- Responsive layout suitable for production UI

**Architecture Highlights**

- Context-based state management (CartProvider, ProductProvider, ProgressProvider)
- Custom data hooks (useProductsApi, useCountriesApi, useRegionsApi)
- API abstraction layer in src/api/
- Validation utilities separated from UI logic
- Clear folder separation by responsibility

**Tech Stack**
React (Vite)
JavaScript
SCSS + CSS Modules
Vite development tooling

**Project Structure**
src/
├── components/ # UI components
├── context/ # React contexts
├── hooks/ # Custom data hooks
├── provider/ # Providers and action types
├── pages/ # Route-level pages
├── api/ # API abstraction layer
├── assets/styles/ # SCSS base and layout

**Local Setup**

Install dependencies:
npm install

Run development server:
npm run dev

Build for production:
npm run build

Preview production build:
npm run preview

**Technical Focus**

This project demonstrates:

- Context API for scalable shared state
- Separation of concerns between UI, logic, and data access
- Custom hooks for side effects
- Form validation strategy
- Modular SCSS architecture

**License**
Educational and demonstration purposes. Add a LICENSE file if you want to define explicit usage terms.
