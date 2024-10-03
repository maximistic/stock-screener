Frontend - React (Next)
Backend: Node.js (Express)
API Integration: yfinance API for fetching stock data
Charting Library: Chart.js/ recharts
requests to backedn: axios


## Dependencies

### Frontend
 - npm create vite@latest frontend -- --template react
 - cd frontend
 - npm install
 - npm run dev
 - npm install react-router-dom axios recharts

### Backend
 - mkdir backend
 - cd backend
 - npm init -y
 - npm install express cors yahoo-finance2


## File Structure

stock-screener/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── StockList.jsx
│   │   │   ├── StockDetails.jsx
│   │   │   └── Chart.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── StockPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── stocks.js
│   ├── services/
│   │   └── stockService.js
│   └── package.json
│
└── README.md

src/components/
Contains reusable React components:

SearchBar.jsx: Implements the search functionality for stocks.
StockList.jsx: Displays a list of stocks based on search results or filters.
StockDetails.jsx: Shows detailed information for a specific stock.
Chart.jsx: Renders stock price charts using a library like recharts.

src/pages/
Contains main page components:

Home.jsx: The landing page with search and stock list.
StockPage.jsx: Detailed view for a single stock.

src/App.jsx
The main React component that sets up routing and overall app structure.
src/main.jsx
The entry point for the React application.
src/index.css
Global styles for the application.
public/
Stores static assets like images, fonts, or global CSS files.
index.html
The main HTML file that serves as the entry point for the React app.
vite.config.js
Configuration file for Vite, including plugin setup and build options.
package.json
Defines project dependencies and scripts for the frontend.
Backend
server.js
The main Express.js server file that sets up middleware, routes, and starts the server.
routes/stocks.js
Defines API endpoints related to stock operations (e.g., search, get details).
services/stockService.js
Contains business logic for interacting with the stock API (yahoo-finance2).