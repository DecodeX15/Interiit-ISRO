# GeoNLI Backend API

**Built for Inter IIT Tech Meet 14.0**

RESTful API backend for satellite image intelligence platform. Handles interactive chat queries and evaluation mode for AI-powered satellite image analysis.

![Status](https://img.shields.io/badge/status-active-success) ![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

---

## 🎯 Overview

The GeoNLI backend provides two main modes:

1. **Interactive Mode** - Real-time chat interface for satellite image queries
2. **Evaluation Mode** - Advanced JSON-based query evaluation for testing and validation

Both modes integrate with an ML model endpoint for processing satellite imagery.

---

## 📁 Project Structure

```
ISRO_backend/
│
├── 📄 Configuration Files
│   ├── app.js                         # Express app setup & middleware
│   ├── index.js                       # Server entry point
│   ├── package.json                   # Dependencies & scripts
│   ├── .env                           # Environment variables
│   └── .gitignore                     # Git ignore rules
│
├── 📁 Controller/                     # Business logic handlers
│   ├── Interactive_response_handler.js
│   │   └── Handles real-time chat queries
│   │       - Processes user messages
│   │       - Calls ML model endpoint
│   │       - Formats responses for frontend
│   │       - Returns: {answer, boxesArray}
│   │
│   └── evaluation_response_handler.js
│       └── Handles evaluation mode requests
│           - Processes JSON input payloads
│           - Validates query structure
│           - Calls ML model endpoint
│           - Returns formatted model response
│
└── 📁 rotues/                         # API route handlers
    ├── interactive_mode.router.js
    │   └── Route: POST /api/interactive_analysis
    │       - Endpoint for chat mode queries
    │       - Calls Interactive_response_handler
    │       - Handles: caption, grounding, attribute queries
    │
    └── evaluation_mode.router.js
        └── Route: POST /api/evaluation
            - Endpoint for evaluation mode
            - Calls Evaluation_response_handler
            - Handles: complex JSON payloads
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **npm** or **yarn** package manager
- **ML Model Endpoint** (configured via environment variables)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DecodeX15/Interiit-ISRO.git
   cd Interiit-ISRO/ISRO_backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   
   # Frontend URL (CORS)
   FRONTEND_URL=http://localhost:5173
   
   # ML Model Endpoint
   ML_MODEL_ENDPOINT=https://your-ml-model-endpoint.com
   
   # Optional: Database
   MONGODB_URI=mongodb://localhost:27017/geonli
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   
   Or with nodemon for development:
   ```bash
   npm run dev
   ```

   Server will be available at `http://localhost:3000`

---

## 📡 API Endpoints

### 1. Interactive Analysis Mode

**Endpoint:** `POST /api/interactive_analysis`

**Description:** Real-time satellite image analysis for chat interface

**Request Body:**
```json
{
  "input_image": {
    "image_id": "sample.png",
    "image_url": "https://bit.ly/4oYfvr0",
    "metadata": {
      "width": 512,
      "height": 512,
      "spatial_resolution_m": 1.57
    }
  },
  "queries": {
    "caption_query": {
      "instruction": "Generate a detailed caption describing all visible elements"
    },
    "grounding_query": {
      "instruction": "Locate and return bounding boxes for the field"
    },
    "attribute_query": {
      "binary": { "instruction": "Is there an aeroplane?" },
      "numeric": { "instruction": "What is the area in meters?" },
      "semantic": { "instruction": "What is the color of the building?" }
    }
  }
}
```

**Response (Success):**
```json
{
  "success": true,
  "model_response": {
    "queries": {
      "caption_query": {
        "response": "The image shows a residential area with..."
      },
      "grounding_query": {
        "response": [
          {
            "obbox": [0.5, 0.5, 0.2, 0.15, 45]
          }
        ]
      },
      "attribute_query": {
        "binary": { "response": "Yes, there is an aeroplane" },
        "numeric": { "response": "1500.5 square meters" },
        "semantic": { "response": "The building is white" }
      }
    }
  },
  "timestamp": "2025-12-05T10:30:00Z"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Missing required fields in input_image"
}
```

---

### 2. Evaluation Mode

**Endpoint:** `POST /api/evaluation`

**Description:** Advanced evaluation mode for complex queries with JSON validation

**Request Body:**
```json
{
  "input": {
    "input_image": {
      "image_id": "sample2.png",
      "image_url": "https://bit.ly/4oYfvr0",
      "metadata": {
        "width": 512,
        "height": 512,
        "spatial_resolution_m": 1.57
      }
    },
    "queries": {
      "caption_query": {
        "instruction": "Generate a detailed caption"
      },
      "grounding_query": {
        "instruction": "Locate ground features"
      },
      "attribute_query": {
        "binary": { "instruction": "Is there water?" },
        "numeric": { "instruction": "Count buildings" },
        "semantic": { "instruction": "Describe vegetation" }
      }
    }
  }
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "queries": {
      "caption_query": { "response": "..." },
      "grounding_query": { "response": [...] },
      "attribute_query": { "response": "..." }
    }
  },
  "timestamp": "2025-12-05T10:30:00Z"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "ML model endpoint not configured"
}
```

---

## 🔧 Controller Functions

### Interactive_response_handler.js

**Purpose:** Handles real-time chat queries

**Key Logic:**
- Validates input image and query parameters
- Calls ML model endpoint with request timeout
- Parses model response based on query type
- Returns formatted answer and bounding boxes

**Return Format:**
```javascript
{
  success: true,
  answer: "Model response text",
  boxesArray: [
    { obbox: [cx, cy, w, h, angle] },
    // ... more boxes
  ],
  timestamp: "ISO timestamp"
}
```

**Error Handling:**
- Validates input structure
- Checks ML endpoint configuration
- Implements 30-second timeout
- Returns descriptive error messages

---

### evaluation_response_handler.js

**Purpose:** Handles evaluation mode requests with full JSON validation

**Key Logic:**
- Validates complete input payload
- Checks ML model endpoint configuration
- Calls ML model with timeout protection
- Parses and validates JSON response
- Returns full model response

**Return Format:**
```javascript
{
  success: true,
  data: {
    // Complete model response
  },
  timestamp: "ISO timestamp"
}
```

**Error Handling:**
- Validates input existence and format
- Timeout protection (30 seconds)
- JSON parsing error handling
- Response validation
- Detailed error messages

---

## 🔌 Router Configuration

### interactive_mode.router.js

```javascript
import { Router } from "express";
import { Interactive_response_handler } from "../Controller/Interactive_response_handler.js";

export const interactive_router = Router();

// POST /api/interactive_analysis
interactive_router.post("/interactive_analysis", Interactive_response_handler);
```

**Handles:**
- Caption queries (image description)
- Grounding queries (bounding box detection)
- Attribute queries (binary/numeric/semantic)

---

### evaluation_mode.router.js

```javascript
import { Router } from "express";
import { Evaluation_response_handler } from "../Controller/evaluation_response_handler.js";

export const evaluation_router = Router();

// POST /api/evaluation
evaluation_router.post("/evaluation", Evaluation_response_handler);
```

**Handles:**
- Complex JSON payloads
- Multiple query types
- Detailed evaluation requests

---

## 🌐 Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | `3000` |
| `NODE_ENV` | Environment mode | No | `development` or `production` |
| `FRONTEND_URL` | Frontend CORS origin | No | `http://localhost:5173` |
| `ML_MODEL_ENDPOINT` | ML model API URL | **Yes** | `https://ml-api.example.com` |
| `MONGODB_URI` | MongoDB connection string | No | `mongodb://localhost:27017/geonli` |

---

## 📊 Request/Response Flow

### Interactive Mode Flow

```
Frontend (Chat)
    ↓
POST /api/interactive_analysis
    ↓
interactive_mode.router.js
    ↓
Interactive_response_handler
    ├─ Validate input
    ├─ Parse query type
    ├─ Call ML model endpoint
    ├─ Format response
    └─ Return {answer, boxesArray}
    ↓
Frontend (Display results & boxes)
```

### Evaluation Mode Flow

```
Frontend (Eval Mode)
    ↓
POST /api/evaluation
    ↓
evaluation_mode.router.js
    ↓
Evaluation_response_handler
    ├─ Validate input payload
    ├─ Check ML endpoint
    ├─ Call ML model (30s timeout)
    ├─ Parse JSON response
    ├─ Validate output format
    └─ Return {success, data}
    ↓
Frontend (Display JSON output)
```

---

## 🛡️ Error Handling

### HTTP Status Codes

| Code | Meaning | Scenario |
|------|---------|----------|
| `200` | Success | Request processed successfully |
| `400` | Bad Request | Missing/invalid input parameters |
| `500` | Server Error | ML model endpoint not configured |
| `502` | Bad Gateway | ML model invalid response |
| `504` | Gateway Timeout | ML model took too long to respond |

### Error Response Format

```json
{
  "success": false,
  "error": "Descriptive error message",
  "timestamp": "2025-12-05T10:30:00Z"
}
```

---

## 🔐 Security Features

- ✅ **CORS Protection** - Whitelist frontend URL
- ✅ **Request Size Limits** - 50MB for image uploads
- ✅ **Timeout Protection** - 30-second timeout on ML calls
- ✅ **Input Validation** - Check all required fields
- ✅ **Error Sanitization** - Remove sensitive info in production
- ✅ **Environment Variables** - Sensitive data in `.env`

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `express` | Web framework |
| `cors` | Cross-origin resource sharing |
| `dotenv` | Environment variable management |
| `cookie-parser` | Cookie parsing middleware |
| `nodemon` | Development auto-reload (dev) |

Install via:
```bash
npm install express cors dotenv cookie-parser
npm install --save-dev nodemon
```

---

## 📝 Available Scripts

```bash
# Development server with auto-reload
npm run dev

# Production server
npm start

# Install dependencies
npm install

# View package info
npm list
```

---

## 🧪 Testing Endpoints

### Using cURL

**Interactive Mode:**
```bash
curl -X POST http://localhost:3000/api/interactive_analysis \
  -H "Content-Type: application/json" \
  -d '{
    "input_image": {
      "image_id": "test.png",
      "image_url": "https://example.com/image.png",
      "metadata": {"width": 512, "height": 512, "spatial_resolution_m": 1.57}
    },
    "queries": {
      "caption_query": {"instruction": "Describe the image"}
    }
  }'
```

**Evaluation Mode:**
```bash
curl -X POST http://localhost:3000/api/evaluation \
  -H "Content-Type: application/json" \
  -d '{
    "input": {
      "input_image": {...},
      "queries": {...}
    }
  }'
```

### Using Postman

1. Create new POST request
2. URL: `http://localhost:3000/api/interactive_analysis`
3. Headers: `Content-Type: application/json`
4. Body: Paste JSON payload
5. Send

---

## 🚢 Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Environment Variables on Vercel

Set in Vercel dashboard:
```
ML_MODEL_ENDPOINT=https://your-ml-endpoint.com
FRONTEND_URL=https://your-frontend.vercel.app
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t geonli-backend .
docker run -p 3000:3000 --env-file .env geonli-backend
```

---

## 🔄 ML Model Integration

The backend expects ML model endpoint to:

1. Accept POST requests with image and query data
2. Return JSON with `queries` field containing responses
3. Support timeout handling (30 seconds)
4. Return proper HTTP status codes

**Expected Model Response:**
```json
{
  "success": true,
  "queries": {
    "caption_query": {
      "response": "Image description"
    },
    "grounding_query": {
      "response": [
        {
          "obbox": [center_x, center_y, width, height, angle]
        }
      ]
    },
    "attribute_query": {
      "binary": { "response": "Yes/No answer" },
      "numeric": { "response": "Numerical result" },
      "semantic": { "response": "Semantic result" }
    }
  }
}
```

---

## 📚 API Documentation

### Query Types Supported

| Type | Purpose | Response |
|------|---------|----------|
| `caption_query` | Image description | Text response |
| `grounding_query` | Locate objects | Array of bounding boxes |
| `attribute_query` | Answer specific questions | Binary/Numeric/Semantic responses |

### Bounding Box Format

```javascript
obbox: [
  center_x,      // 0-1 (normalized)
  center_y,      // 0-1 (normalized)
  width,         // 0-1 (normalized)
  height,        // 0-1 (normalized)
  angle          // 0-360 degrees
]
```

---


## 👥 Team

**Built by:** Team_24 
**For:** Inter IIT Tech Meet 14.0 x ISRO

---


## 🐛 Troubleshooting

### ML Model Endpoint Not Configured
**Error:** `ML model endpoint not configured`  
**Fix:** Add `ML_MODEL_ENDPOINT` to `.env` file

### Request Timeout
**Error:** `Request timeout: ML model response took too long`  
**Fix:** 
- Check ML model server status
- Increase timeout in controller (currently 30s)
- Optimize ML model inference

### CORS Error
**Error:** `Access to XMLHttpRequest blocked by CORS`  
**Fix:** 
- Verify `FRONTEND_URL` in `.env`
- Check CORS middleware configuration in `app.js`

### Invalid JSON Response
**Error:** `Invalid JSON response from ML model`  
**Fix:**
- Verify ML model returns valid JSON
- Check content-type headers

