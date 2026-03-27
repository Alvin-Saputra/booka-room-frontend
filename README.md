# Booka Room - Frontend 🏢

This repository contains the **Frontend** application for the **Booka Room** (Meeting Room Management System) portfolio project. It is designed to provide a responsive, user-friendly interface for managing meeting room reservations, integrating seamlessly with the Express.js backend API.

## 🚀 Technologies Used

This project leverages a modern frontend stack to ensure high performance and maintainability:
- **Framework:** Vue 3
- **Build Tool:** Vite
- **State Management:** Pinia
- **Routing:** Vue Router
- **UI & Styling:** Vuetify and Tailwind CSS
- **HTTP Client:** Axios
- **Component Workshop:** Histoire

## ⚙️ Prerequisites

Before you begin, ensure you have the correct Node.js version installed:
- **Node.js:** `^20.19.0` or `>=22.12.0`

## 🛠️ Installation & Setup

1. **Clone this repository:**
   ```bash
   git clone [https://github.com/your-username/booka-room-frontend.git](https://github.com/your-username/booka-room-frontend.git)
   cd booka-room-frontend
   
2. **Install Depedencies:**
   ```bash
   npm install
   
3. **Set Up Environemnt Variables:**
   ```bash
   VITE_API_BASE_URL=http://localhost:3000
   
4. **Run The Development Server:**
   ```bash
   Run the Development Server

## 📜 Available Scripts
      In the project directory, you can run the following commands:
      npm run dev : Starts the Vite development server.
      npm run build : Compiles and minifies the application for production.
      npm run story:dev : Starts the Histoire development server to view and develop UI components in isolation.lly.

## 📂 Project Structure
   ```
   booka-room-frontend/
   ├── src/
   │   ├── assets/        # Static assets (CSS, images)
   │   ├── components/    # Reusable Vue components
   │   ├── layout/        # Layout components (e.g., AdminLayout, UserLayout)
   │   ├── router/        # Vue Router configuration
   │   ├── service/       # Axios API services (Auth, Booking, Room, User)
   │   ├── store/         # Pinia state management stores
   │   ├── views/         # Page-level components
   │   ├── App.vue        # Root component
   │   └── main.js        # Application entry point
   ├── public/            # Public static assets
   ├── .env.example       # Example environment variables
   ├── package.json       # Project dependencies and scripts
   ├── vite.config.js     # Vite configuration
   ├── tailwind.config.js # Tailwind CSS configuration
   └── README.md          # Project documentation
