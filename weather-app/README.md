# Weather API Wrapper Service

A weather application that provides real-time weather data with Redis caching for improved performance.

**Project Reference:** https://roadmap.sh/projects/weather-api-wrapper-service

## 🌟 Features

- **Real-time Weather Data**: Fetches current weather conditions from Visual Crossing API
- **Redis Caching**: Caches responses for 60 seconds to reduce API calls and improve response time
- **RESTful API**: Simple Express.js backend with CORS support
- **Clean UI**: Responsive frontend with gradient design
- **Cache Indicator**: Shows whether data is served from cache or fresh API call

## 🏗️ Architecture

```
weather-app/
├── client/          # Frontend (HTML/CSS/JS)
│   ├── index.html
│   └── script.js
└── server/          # Backend (Node.js/Express)
    ├── src/
    │   ├── index.js           # Express server
    │   ├── redisClient.js     # Redis connection
    │   └── weatherService.js  # Weather API + caching
    ├── .env
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Redis server

### Installation

1. **Install Redis** (macOS):
   ```bash
   brew install redis
   brew services start redis
   ```

2. **Install dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   WEATHER_API_KEY=your_api_key_here
   REDIS_URL=redis://localhost:6379
   CACHE_TTL=60
   ```

4. **Start the server**:
   ```bash
   npm start
   ```

5. **Open the client**:
   Open `client/index.html` in your browser

## 🔌 API Endpoints

### GET `/weather?city={cityName}`

Returns weather data for the specified city.

**Response:**
```json
{
  "source": "cache|api",
  "data": {
    "currentConditions": {
      "temp": 72.5,
      "humidity": 65,
      "conditions": "Partly cloudy"
    }
  }
}
```

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Caching**: Redis
- **Weather API**: Visual Crossing Weather API
- **Frontend**: Vanilla HTML/CSS/JavaScript

## 📝 License

MIT
