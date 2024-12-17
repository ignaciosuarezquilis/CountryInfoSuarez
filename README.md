# Country Info

A web application for exploring detailed information about countries, including borders, population trends, and flags. This project leverages React for the frontend, Node.js for the backend, and integrates with external APIs for real-time data retrieval.

## Features

- View detailed country information, including:
  - **Country name**
  - **Borders**
  - **Population trends** (with a dynamic chart)
  - **National flag**
- Navigate between countries by clicking on their bordering nations.
- Responsive and interactive design.
- Environment variable support for API endpoints.

## Tech Stack

- **Frontend**:
  - React
  - React Router DOM
  - Chart.js for population trend visualization
  - Vite for fast development and build tooling
- **Backend**:
  - Node.js
  - Axios for API requests
  - Express.js for routing

## Installation

1. Clone the repository

2. Install dependencies for both frontend and backend:

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up environment variables:

   ## Environment Variables

  The project includes a pre-configured `.env` file to simplify the setup process for local execution. 

Environment variables included in this project:

- `PORT`: The port for the backend server (default: 5000).
- `REACT_APP_API_URL`: The base URL for API requests in the frontend.


4. Start the backend:

   ```bash
   cd backend
   npm run dev
   ```

5. Start the frontend:

   ```bash
   cd frontend
   npm run dev
   ```

6. Open your browser and navigate to:

   ```
   http://localhost:5173
   ```

## Project Structure

```plaintext
root
├── backend
│   ├── controllers
│   │   └── countryController.js
│   ├── routes
│   │   └── countryRoutes.js
│   ├── server.js
│   └── .env
├── frontend
│   ├── components
│   │   └── PopulationChart.jsx
│   ├── pages
│   │   ├── CountryInfo.jsx
│   │   └── CountryList.jsx
│   ├── styles
│   │   └── PopulationChart.css
│   ├── App.jsx
│   ├── main.jsx
│   └── .env
├── README.md
└── .gitignore

```

## API Endpoints

- **GET /api/countries**
  - Returns a list of all available countries.
- **GET /api/countries/:countryCode**
  - Returns detailed information about a specific country, including borders, population trends, and flag.

