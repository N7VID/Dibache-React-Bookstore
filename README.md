# Dibache - React Bookstore

Welcome to **Dibache**, an online bookstore specializing in selling physical books across various categories, including Fiction & Novels, Psychology, Literature, and art. Dibache offers a seamless shopping experience with a user-friendly interface, an admin dashboard for managing inventory, products and orders with advanced filtering in category pages.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Features

- **User Features**:

  - Browse books by category and subcategory.
  - Filter books by price, discount, date, or publications.
  - Add books to the cart and manage purchases.
  - View detailed information about each book, including price, availability, and description.
  - Checkout and payment system for completing orders.
  - Dynamic shopping cart stored in local storage.

- **Admin Features**:

  - Admin dashboard to manage orders, inventory, and products.
  - Add, edit, and delete books through a modal form.
  - Toggle the status of orders.
  - Pagination and sorting for product and order lists.


## Tech Stack

- **Frontend**: React (TypeScript), NextUI, TailwindCSS
- **State Management**: Context API, React Query
- **Data Fetching**: Axios
- **Form Handling**: React Hook Form, Zod for validation, NextUI Select, Input, TinyMCE editor for descriptions
- **Routing**: React Router
- **Build Tool**: Vite
- **Version Control**: Git Flow for branching strategy
- **Authentication**: JWT with refresh tokens (for both users and admin)

## Installation

To get started with **Dibache**, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/N7VID/Dibache-React-Bookstore.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Dibache-React-Bookstore/
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Running the App

- **Development Mode**:
  ```bash
  npm run dev
  ```
- **Production Mode**:
  Build the project for production and serve it.
  ```bash
  npm run build
  npm run preview
  ```

### Environment Variables

Ensure you have a `.env` file set up with the necessary environment variables, including API keys and database configurations.

## Project Structure

```
Dibache/
│
├── src/
│   ├── assets/           # Static assets such as images, fonts, and SVG icons
│   ├── components/       # Reusable and shared UI components (buttons, cards, etc.)
│   ├── configs/          # Configuration files (e.g., routes, API paths)
│   ├── constants/        # Application-wide constants and enums
│   ├── context/          # Global state management with Context API
│   ├── hooks/            # Custom React hooks (includes React Query, Axios hooks)
│   ├── layouts/          # Layout components (header, footer, dashboard layout, etc.)
│   ├── lib/              # Third-party integrations or utilities (React Query setup)
│   ├── pages/            # Main page components (Home, Category, Product, etc.)
│   ├── providers/        # Application providers (context providers, theme providers)
│   ├── queryhooks/       # Custom hooks for CRUD operations (admin and user)
│   ├── routes/           # React Router with private routes and protected routes
│   ├── services/         # API services (e.g., axios instances, API calls)
│   ├── types/            # TypeScript types and interfaces used across the app
│   └── utils/            # General utility functions (formatting, data transformations, etc.)
│
├── public/               # Public static files (served as-is; images, fonts, etc.)
├── package.json          # Project metadata, scripts, and dependencies
└── README.md             # Project documentation
```

## Contributing

We welcome contributions to improve **Dibache**. To contribute:

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature/my-feature
   ```
3. Commit your changes following [conventional commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/my-feature
   ```
5. Submit a Pull Request.
