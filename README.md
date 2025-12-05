# GeoNLI - Satellite Image Intelligence Platform

**Inter IIT Tech Meet 14.0 x ISRO Collaboration**

Advanced AI-powered satellite image analysis platform with interactive chat and evaluation modes for geospatial intelligence.

![Architecture](https://img.shields.io/badge/Architecture-Full%20Stack-blue) ![Status](https://img.shields.io/badge/Status-Active-success) ![Version](https://img.shields.io/badge/Version-1.0.0-brightgreen)

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Backend Documentation](#backend-documentation)
6. [Frontend Documentation](#frontend-documentation)
7. [Getting Started](#getting-started)
8. [API Integration](#api-integration)
9. [Data Flow](#data-flow)
10. [Deployment](#deployment)
11. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

GeoNLI is a comprehensive satellite image analysis platform that leverages machine learning to provide intelligent insights from satellite imagery. The platform supports two main modes:

### **Interactive Mode**
Real-time conversational interface for satellite image queries with instant AI responses and visual annotations.

### **Evaluation Mode**
Advanced JSON-based evaluation system for testing model performance with complex multi-query payloads.

### **Key Features**
- 🌍 Satellite image upload and processing
- 💬 Interactive chat-based queries
- 📊 Real-time bounding box detection and visualization
- 🔍 Multiple query types (caption, grounding, attribute)
- 🎨 Dark/Light theme support
- 📱 Fully responsive design
- ⚡ Real-time session management
- 📈 Evaluation metrics and reporting

---

## 🏗️ Architecture

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React/Vite)                    │
├─────────────────────────────────────────────────────────────────┤
│  Pages:                                                         │
│  ├─ Home.jsx (Landing page)                                    │
│  ├─ Dashboard.jsx (Main interface selector)                    │
│  ├─ Chat.jsx (Interactive & Eval mode switcher)               │
│  ├─ Chateval2.jsx (Evaluation UI)                             │
│  └─ ChatEvalMode.jsx (Alternative eval mode)                  │
│                                                                 │
│  Components:                                                    │
│  ├─ Chatleft.jsx (Session management sidebar)                 │
│  ├─ Chatmiddle.jsx (Image viewer & canvas)                    │
│  ├─ Chatright.jsx (Chat interface)                            │
│  ├─ Navbar.jsx (Navigation)                                   │
│  ├─ Footer.jsx (Footer section)                               │
│  └─ UI Components (Reusable UI elements)                      │
│                                                                 │
│  Context:                                                       │
│  ├─ sessioncontext (Session management)                        │
│  └─ themecontext (Dark/Light mode)                            │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTP/CORS
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js/Express)                    │
├─────────────────────────────────────────────────────────────────┤
│  Routes:                                                        │
│  ├─ /api/interactive_analysis (POST)                          │
│  └─ /api/evaluation (POST)                                     │
│                                                                 │
│  Controllers:                                                   │
│  ├─ Interactive_response_handler                              │
│  └─ Evaluation_response_handler                               │
│                                                                 │
│  Middleware:                                                    │
│  ├─ CORS                                                       │
│  ├─ JSON Parser                                                │
│  ├─ Cookie Parser                                              │
│  └─ Error Handler                                              │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTP
┌─────────────────────────────────────────────────────────────────┐
│                 ML MODEL (External API)                         │
├─────────────────────────────────────────────────────────────────┤
│  Endpoints:                                                     │
│  ├─ /api/interactive_analysis (ML inference)                  │
│  ├─ /api/evaluation (ML evaluation)                           │
│  └─ Query Processing & Bounding Box Generation               │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow Diagram

```
USER INPUT
    ↓
[Frontend Form]
    ↓
[Validate Input] → Image URL + Query Type
    ↓
[Create Request Payload]
    ↓
[Send to Backend API]
    ↓
[Backend Validation]
    ↓
[Call ML Model Endpoint]
    ↓
[Parse ML Response]
    ├─ Caption Response
    ├─ Bounding Boxes (8-coordinate format)
    └─ Attribute Responses
    ↓
[Format Response for Frontend]
    ↓
[Send Back to Frontend]
    ↓
[Update Chat History]
    ↓
[Render Image + Canvas]
    ↓
[Draw Bounding Boxes on Canvas]
    ↓
[Display Results to User]
```

---

## 💻 Technology Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | UI Framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Styling |
| **Lucide React** | Icons |
| **UUID** | Session ID generation |
| **Axios** | HTTP client |
| **React Context API** | State management |
| **React Resizable Panels** | Responsive panel layout |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | Runtime |
| **Express.js** | Web framework |
| **Axios** | HTTP client for ML calls |
| **CORS** | Cross-origin handling |
| **dotenv** | Environment variables |
| **Cookie Parser** | Cookie handling |

### Development & Deployment
| Tool | Purpose |
|------|---------|
| **Git** | Version control |
| **Vercel** | Frontend deployment |
| **Docker** | Backend containerization |
| **Postman** | API testing |

---

## 📁 Project Structure

```
Interiit-ISRO/
│
├── 📄 MAINREADME.md                    # Main documentation (this file)
│
├── 📁 ISRO_backend/                    # Backend application
│   ├── 📄 app.js                       # Express app setup & middleware
│   ├── 📄 index.js                     # Server entry point
│   ├── 📄 package.json                 # Dependencies & scripts
│   ├── 📄 .env                         # Environment variables
│   ├── 📄 .gitignore                   # Git ignore rules
│   ├── 📄 README.md                    # Backend documentation
│   │
│   ├── 📁 Controller/                  # Request handlers
│   │   ├── 📄 Interactive_response_handler.js
│   │   │   └─ Handles real-time chat queries
│   │   │   └─ Processes: caption, grounding, attribute queries
│   │   │   └─ Returns: {answer, boxesArray}
│   │   │
│   │   └── 📄 evaluation_response_handler.js
│   │       └─ Handles evaluation mode requests
│   │       └─ Processes: complex JSON payloads
│   │       └─ Returns: full model response
│   │
│   └── 📁 rotues/                      # API routes
│       ├── 📄 interactive_mode.router.js
│       │   └─ Route: POST /api/interactive_analysis
│       │   └─ Connects to: Interactive_response_handler
│       │
│       └── 📄 evaluation_mode.router.js
│           └─ Route: POST /api/evaluation
│           └─ Connects to: Evaluation_response_handler
│
├── 📁 ISRO_frontend/                   # Frontend application
│   ├── 📄 index.html                   # HTML entry point
│   ├── 📄 main.jsx                     # React app entry
│   ├── 📄 vite.config.js               # Vite configuration
│   ├── 📄 tailwind.config.js           # Tailwind configuration
│   ├── 📄 postcss.config.js            # PostCSS configuration
│   ├── 📄 package.json                 # Dependencies & scripts
│   ├── 📄 jsconfig.json                # JS module resolution
│   ├── 📄 .env                         # Environment variables
│   ├── 📄 .gitignore                   # Git ignore rules
│   ├── 📄 README.md                    # Frontend documentation
│   ├── 📄 vercel.json                  # Vercel deployment config
│   ├── 📄 components.json              # Component registry
│   ├── 📄 eslint.config.js             # Linting rules
│   │
│   ├── 📁 public/                      # Static assets
│   │
│   └── 📁 src/                         # Source code
│       ├── 📄 App.jsx                  # Main app component
│       ├── 📄 index.css                # Global styles
│       │
│       ├── 📁 Pages/                   # Page components
│       │   ├── 📄 Home.jsx
│       │   │   └─ Landing page
│       │   │   └─ Hero section & project showcase
│       │   │   └─ Navigation to Chat/Dashboard
│       │   │
│       │   ├── 📄 Dashboard.jsx
│       │   │   └─ Mode selector dashboard
│       │   │   └─ Interactive vs Evaluation mode
│       │   │   └─ Session overview
│       │   │
│       │   ├── 📄 Chat.jsx
│       │   │   └─ Main chat interface container
│       │   │   └─ Manages mode switching (interactive/evaluation)
│       │   │   └─ Responsive panel layout
│       │   │   └─ Integrates: Chatleft, Chatmiddle, Chatright
│       │   │
│       │   ├── 📄 Chateval2.jsx
│       │   │   └─ Evaluation mode UI (JSON editor)
│       │   │   └─ Input/Output JSON display
│       │   │   └─ Bounding box visualization
│       │   │   └─ Execute evaluation button
│       │   │
│       │   └── 📄 ChatEvalMode.jsx
│       │       └─ Alternative evaluation interface
│       │       └─ Backup eval mode component
│       │
│       ├── 📁 Components/              # Reusable components
│       │   ├── 📄 Navbar.jsx
│       │   │   └─ Top navigation bar
│       │   │   └─ Logo & branding
│       │   │   └─ Mode toggle buttons
│       │   │
│       │   ├── 📄 Footer.jsx
│       │   │   └─ Bottom footer section
│       │   │   └─ Links & credits
│       │   │
│       │   ├── 📄 Chatleft.jsx
│       │   │   └─ Left sidebar component
│       │   │   └─ Session management (create/delete)
│       │   │   └─ Session list display
│       │   │   └─ Collapsible sidebar
│       │   │
│       │   ├── 📄 Chatmiddle.jsx
│       │   │   └─ Center panel - Image viewer
│       │   │   └─ Image upload (drag & drop)
│       │   │   └─ Canvas for bounding boxes
│       │   │   └─ Image analysis display
│       │   │
│       │   ├── 📄 Chatright.jsx
│       │   │   └─ Right panel - Chat interface
│       │   │   └─ Message input & display
│       │   │   └─ Query type selector
│       │   │   └─ Real-time AI responses
│       │   │
│       │   ├── 📄 Error.jsx
│       │   │   └─ Error boundary component
│       │   │   └─ Error display & handling
│       │   │
│       │   ├── 📄 apicaller.js
│       │   │   └─ API request handler
│       │   │   └─ Calls ML model endpoint
│       │   │   └─ Handles different query types
│       │   │   └─ Processes model responses
│       │   │
│       │   ├── 📄 HeroHighlightDemo.jsx
│       │   │   └─ Hero section animation
│       │   │   └─ Landing page visual effect
│       │   │
│       │   ├── 📄 LayoutTextFlipDemo.jsx
│       │   │   └─ Text animation component
│       │   │   └─ Flip text effect
│       │   │
│       │   ├── 📄 Style_slider.jsx
│       │   │   └─ Slider animation component
│       │   │   └─ Image carousel/slider
│       │   │
│       │   └── 📁 ui/                  # Reusable UI elements
│       │       ├── 📄 alert-dialog.jsx
│       │       │   └─ Alert/confirmation dialogs
│       │       │
│       │       ├── 📄 button.jsx
│       │       │   └─ Reusable button component
│       │       │
│       │       ├── 📄 chat-input.jsx
│       │       │   └─ Chat message input field
│       │       │   └─ Message submission handler
│       │       │
│       │       ├── 📄 query-type-selector.jsx
│       │       │   └─ Query type dropdown/selector
│       │       │   └─ Caption/Grounding/Attribute selection
│       │       │
│       │       ├── 📄 shiny-button.jsx
│       │       │   └─ Animated button effect
│       │       │
│       │       ├── 📄 typing-animation.jsx
│       │       │   └─ Typing effect animation
│       │       │   └─ Message streaming effect
│       │       │
│       │       ├── 📄 animated-list.jsx
│       │       │   └─ Animated list component
│       │       │
│       │       ├── 📄 hero-highlight.jsx
│       │       │   └─ Hero highlight effect
│       │       │
│       │       ├── 📄 layout-text-flip.jsx
│       │       │   └─ Text flip animation
│       │       │
│       │       ├── 📄 button-group.jsx
│       │       │   └─ Button group container
│       │       │
│       │       ├── 📄 TextType.jsx
│       │       │   └─ Text type component
│       │       │
│       │       ├── 📄 sonner.jsx
│       │       │   └─ Toast notification system
│       │       │
│       │       ├── 📄 StarField.jsx
│       │       │   └─ Animated star background
│       │       │
│       │       ├── 📄 globe-light.jsx
│       │       │   └─ Globe visualization (light)
│       │       │
│       │       └── 📄 globe.jsx
│       │           └─ Globe visualization (dark)
│       │
│       ├── 📁 Context/                 # Global state management
│       │   ├── 📁 session/
│       │   │   ├── 📄 sessioncontext.jsx
│       │   │   │   └─ Creates React Context for sessions
│       │   │   │   └─ Provides: sessions, activeSessionId, setSessions, etc.
│       │   │   │
│       │   │   └── 📄 sessionprovide.jsx
│       │   │       └─ Session context provider
│       │   │       └─ Loads/manages session storage
│       │   │       └─ Wraps app with session context
│       │   │
│       │   └── 📁 theme/
│       │       ├── 📄 Themecontext.jsx
│       │       │   └─ Creates React Context for theme
│       │       │   └─ Provides: darkMode, toggleTheme
│       │       │
│       │       └── 📄 Themeprovider.jsx
│       │           └─ Theme context provider
│       │           └─ Persists theme preference
│       │           └─ Wraps app with theme context
│       │
│       ├── 📁 lib/                     # Utility functions
│       │   └── 📄 utils.js
│       │       └─ Helper utility functions
│       │       └─ Common logic (formatting, validation, etc.)
│       │
│       └── 📁 assets/                  # Static assets
│           └─ Images & SVGs
```

---

## 🔌 Backend Documentation

### Overview
The backend is a Node.js/Express server that acts as a middleware between the frontend and ML model endpoint.

### Key Responsibilities
1. **Request Validation** - Validates incoming requests
2. **ML Integration** - Calls external ML model endpoint
3. **Response Processing** - Formats ML responses for frontend
4. **Error Handling** - Manages errors gracefully
5. **CORS Management** - Handles cross-origin requests

### Application Structure

#### `app.js` - Express Configuration
```javascript
// Responsibilities:
├─ Import dependencies (express, cors, dotenv, etc.)
├─ Load environment variables
├─ Initialize Express app
├─ Configure middleware:
│  ├─ CORS (with origin whitelist)
│  ├─ JSON parser (50MB limit)
│  ├─ URL-encoded parser
│  └─ Cookie parser
├─ Register routes:
│  ├─ /api (interactive_router)
│  └─ /api (evaluation_router)
├─ Add global error handler
├─ Add 404 handler
└─ Export app module
```

#### `index.js` - Server Entry Point
```javascript
// Responsibilities:
├─ Import app module
├─ Define PORT from env or default to 3000
├─ Create HTTP server
├─ Listen on PORT
├─ Log server status
└─ Handle graceful shutdown (SIGTERM/SIGINT)
```

### API Routes

#### Route 1: Interactive Analysis
```
POST /api/interactive_analysis

Request Body:
{
  "input_image": {
    "image_id": "unique_id",
    "image_url": "https://...",
    "metadata": {
      "width": 512,
      "height": 512,
      "spatial_resolution_m": 1.57
    }
  },
  "queries": {
    "caption_query": { "instruction": "..." },
    "grounding_query": { "instruction": "..." },
    "attribute_query": {
      "binary": { "instruction": "..." },
      "numeric": { "instruction": "..." },
      "semantic": { "instruction": "..." }
    }
  }
}

Response (Success):
{
  "success": true,
  "model_response": {
    "queries": {
      "caption_query": { "response": "..." },
      "grounding_query": { "response": [...] },
      "attribute_query": { "response": "..." }
    }
  },
  "timestamp": "ISO timestamp"
}

Response (Error):
{
  "success": false,
  "error": "Error message"
}
```

#### Route 2: Evaluation Mode
```
POST /api/evaluation

Request Body:
{
  "input": {
    "input_image": {...},
    "queries": {...}
  }
}

Response (Success):
{
  "success": true,
  "data": {
    "queries": {
      "caption_query": { "response": "..." },
      ...
    }
  },
  "timestamp": "ISO timestamp"
}

Response (Error):
{
  "success": false,
  "error": "Error message"
}
```

### Controllers

#### `Interactive_response_handler.js`
```
Purpose: Handle real-time interactive queries

Flow:
1. Extract input from request body
2. Validate input_image and queries exist
3. Validate ML_MODEL_ENDPOINT configured
4. Call ML model endpoint with 180s timeout
5. Handle errors (timeout, invalid response, etc.)
6. Parse model response
7. Extract answers & bounding boxes
8. Return formatted response

Returns:
{
  success: true,
  answer: "AI response text",
  boxesArray: [
    { obbox: [x1,y1,x2,y2,x3,y3,x4,y4] },
    ...
  ],
  timestamp: "ISO timestamp"
}
```

#### `evaluation_response_handler.js`
```
Purpose: Handle evaluation mode requests

Flow:
1. Extract input from request body
2. Validate input exists
3. Validate ML_MODEL_ENDPOINT configured
4. Call ML model endpoint with 180s timeout
5. Handle axios-specific errors:
   - ECONNABORTED (timeout)
   - ECONNREFUSED (connection failed)
   - Server error responses
6. Validate response format
7. Return full model response

Returns:
{
  success: true,
  data: { /* full model response */ },
  timestamp: "ISO timestamp"
}
```

### Environment Variables
```env
# Server
PORT=3000
NODE_ENV=development

# Frontend CORS
FRONTEND_URL=http://localhost:5173

# ML Model
ML_MODEL_ENDPOINT=https://your-ml-api.com/infer
```

### Error Handling

| Error Type | HTTP Code | Handling |
|-----------|-----------|----------|
| Missing input | 400 | Validate request body |
| No ML endpoint | 500 | Check .env configuration |
| ML timeout | 504 | Extend timeout or optimize ML |
| Invalid response | 502 | Check ML endpoint format |
| Connection refused | 503 | Verify ML endpoint is running |

---

## 🎨 Frontend Documentation

### Overview
React/Vite frontend application providing interactive UI for satellite image analysis.

### Core Architecture

#### State Management

##### Session Context
```javascript
// sessioncontext.jsx
Provides:
├─ sessions: Array of session objects
├─ activeSessionId: Currently active session
├─ setSessions: Update sessions
├─ setActiveSessionId: Switch active session
└─ Session object:
   ├─ sessionId: UUID
   ├─ name: Display name
   ├─ createdAt: Timestamp
   ├─ publicImageURL: Image URL
   ├─ messages: Chat history
   ├─ draftText: Draft message
   ├─ aiLoading: Loading state
   └─ unreadCount: Unread messages
```

##### Theme Context
```javascript
// Themecontext.jsx
Provides:
├─ darkMode: Boolean (dark theme enabled)
└─ toggleTheme: Function to toggle theme
```

### Page Components

#### `Home.jsx` - Landing Page
```
Purpose: Entry point and project showcase

Sections:
├─ Navbar (navigation)
├─ Hero Section (title, description)
├─ Features Showcase
├─ How It Works (step-by-step guide)
├─ CTA (Call-to-action buttons)
├─ Animations (hero highlight, text flip)
└─ Footer (links, credits)

Navigation:
└─ Links to Chat/Dashboard pages
```

#### `Dashboard.jsx` - Mode Selector
```
Purpose: Choose between Interactive and Evaluation modes

Components:
├─ Mode cards (Interactive vs Evaluation)
├─ Mode descriptions
├─ Start buttons for each mode
├─ Recent sessions display
└─ Statistics

Functionality:
├─ Display available modes
├─ Navigation to chosen mode
└─ Session preview
```

#### `Chat.jsx` - Main Interface
```
Purpose: Primary working interface for image analysis

Features:
├─ Responsive 3-panel layout (desktop)
├─ 2-panel layout (tablet)
├─ Mobile tab-based navigation
├─ Mode switching (Interactive ↔ Evaluation)
├─ Real-time session management
└─ Dynamic panel resizing

Panels:
├─ Left Panel (Chatleft)
│  └─ Session management
├─ Middle Panel (Chatmiddle)
│  └─ Image viewer & bounding boxes
└─ Right Panel (Chatright)
   └─ Chat interface & queries

State:
├─ mode: 'interactive' | 'evaluation'
├─ boundingBoxes: Array of detection boxes
├─ sidebarOpen: Sidebar toggle state
├─ windowWidth: For responsive breakpoints
└─ Calculated breakpoints (isMobile, isTablet, isDesktop)
```

#### `Chateval2.jsx` - Evaluation Interface
```
Purpose: JSON-based evaluation mode

Components:
├─ JSON Input Editor (textarea)
├─ Execute Button
├─ JSON Output Display
├─ Image with bounding boxes
├─ Execution statistics

Functionality:
├─ Load JSON from file
├─ Edit JSON payload
├─ Execute evaluation
├─ Display results
├─ Export report
├─ Copy to clipboard
└─ Visualize bounding boxes on image

State:
├─ jsonInput: Input payload
├─ jsonOutput: Model response
├─ imageUrl: Satellite image URL
├─ boundingBoxes: Detection results
├─ isProcessing: Loading state
├─ executionTime: API response time
└─ status: 'success' | 'error' | null
```

### Component Structure

#### `Chatleft.jsx` - Session Sidebar
```
Purpose: Session management

Features:
├─ Create new session
├─ Delete session (with confirmation)
├─ Session list with dates
├─ Active session highlight
├─ Collapsible sidebar
└─ Empty state message

Modal Dialog:
├─ Chat name input
├─ Create button
└─ Validation (non-empty name)

Data:
├─ Session list from context
├─ Active session indicator
├─ LocalStorage persistence
└─ Session timestamps
```

#### `Chatmiddle.jsx` - Image Viewer
```
Purpose: Display satellite image with annotations

Features:
├─ Image upload (drag & drop)
├─ Preview modal
├─ Canvas overlay for bounding boxes
├─ Responsive image sizing
├─ Dark/Light theme support
└─ Image analysis header

Functionality:
├─ Drag & drop upload
├─ File input click
├─ Image preview confirmation
├─ Upload to backend
├─ Canvas drawing (bounding boxes)
└─ Error handling

Canvas Drawing:
├─ 8-coordinate bounding boxes
├─ Semi-transparent fills
├─ Colored borders
├─ Corner circles
└─ Box labels

State:
├─ tempPreview: Image preview
├─ uploading: Upload progress
├─ imageRef: Image DOM reference
├─ canvasRef: Canvas DOM reference
└─ dragActive: Drag state
```

#### `Chatright.jsx` - Chat Interface
```
Purpose: Query input and response display

Features:
├─ Query type selector
├─ Message input field
├─ Send button
├─ Message history display
├─ AI response streaming
├─ Loading indicators
└─ Error messages

Query Types:
├─ Caption (image description)
├─ Grounding (object detection)
├─ Attribute (binary/numeric/semantic)
└─ Type-specific responses

Message Structure:
├─ User messages
├─ AI responses
├─ Timestamps
├─ Query type indicator
└─ Bounding boxes (if applicable)

State:
├─ messages: Chat history
├─ message: Current input
├─ selectedQueryType: Current query type
├─ aiLoading: Response loading state
└─ selectedImageURL: Current image
```

### API Integration

#### `apicaller.js` - API Handler
```javascript
Purpose: Handle API calls to backend

Functions:
├─ handlemodelresponse(queryType, prompt, sessionId, imageUrl)
│  ├─ Purpose: Send query to backend
│  ├─ Inputs:
│  │  ├─ queryType: Query type (Caption/Grounding/Attribute)
│  │  ├─ prompt: User query/instruction
│  │  ├─ sessionId: Session identifier
│  │  └─ imageUrl: Image URL
│  │
│  ├─ Process:
│  │  ├─ Create payload based on query type
│  │  ├─ Make POST request to /api/interactive_analysis
│  │  ├─ Handle timeout (30 seconds)
│  │  ├─ Parse response based on query type
│  │  └─ Extract bounding boxes if applicable
│  │
│  └─ Returns:
│     ├─ success: true/false
│     ├─ answer: AI response text
│     ├─ boxesArray: Bounding boxes (if any)
│     └─ error: Error message (if failed)

Payload Structure:
{
  input_image: {
    image_id: sessionId,
    image_url: imageUrl,
    metadata: { width, height, spatial_resolution_m }
  },
  queries: {
    caption_query: { instruction } | null,
    grounding_query: { instruction } | null,
    attribute_query: {
      binary: { instruction } | null,
      numeric: { instruction } | null,
      semantic: { instruction } | null
    }
  }
}

Response Parsing:
├─ Caption Query
│  └─ Extract: response.data.queries.caption_query.response
├─ Grounding Query
│  ├─ Extract: response.data.queries.grounding_query.response
│  ├─ Format: Array of { obbox: [x1,y1,x2,y2,x3,y3,x4,y4] }
│  └─ Generate description based on count
└─ Attribute Query
   └─ Extract binary/numeric/semantic responses
```

### File Organization Summary

```
Frontend Structure:
├─ Pages (5 files)
│  └─ Main views for different routes
├─ Components (5 main + 12 UI sub-components)
│  └─ Reusable components
├─ Context (2 contexts × 2 files each)
│  └─ Global state management
├─ lib (1 utils file)
│  └─ Helper functions
└─ assets
   └─ Static images/SVGs
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+ (frontend & backend)
- npm or yarn package manager
- ML Model endpoint URL

### Installation

#### 1. Clone Repository
```bash
unzip Interiit-ISRO.zip
cd Interiit-ISRO
```

#### 2. Setup Backend

```bash
cd ISRO_backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
ML_MODEL_ENDPOINT=https://your-ml-endpoint.com
EOF

# Start server
npm start
# Or with nodemon for development
npm run dev
```

#### 3. Setup Frontend

```bash
cd ../ISRO_frontend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
VITE_BACKEND_ENDPOINT=http://localhost:3000
EOF

# Start development server
npm run dev
```

#### 4. Access Application
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

---

## 📊 Data Flow

### Interactive Mode Flow

```
1. User Interaction (Frontend)
   └─ Select image
   └─ Choose query type
   └─ Enter query text
   └─ Click send

2. Frontend Processing
   ├─ Validate input
   ├─ Build API payload
   ├─ Create request with headers
   └─ Send to backend

3. Backend Processing
   ├─ Receive request
   ├─ Validate payload
   ├─ Check ML endpoint
   ├─ Call ML model
   ├─ Parse response
   └─ Return to frontend

4. Response Handler
   ├─ Receive response
   ├─ Extract answer
   ├─ Extract bounding boxes
   ├─ Update message history
   ├─ Draw canvas
   └─ Display to user

5. Canvas Rendering
   ├─ Load image
   ├─ Overlay canvas
   ├─ Draw bounding boxes
   ├─ Label boxes
   └─ Display results
```

### Evaluation Mode Flow

```
1. JSON Input
   └─ Load or edit JSON
   └─ Configure queries

2. Frontend Processing
   └─ Validate JSON
   └─ Send to /api/evaluation

3. Backend Processing
   ├─ Extract input
   ├─ Call ML model
   ├─ Return full response

4. Response Display
   ├─ Show JSON output
   ├─ Extract image URL
   ├─ Display bounding boxes
   └─ Show execution time
```

### Bounding Box Format (8-Coordinate)

```javascript
// Format: [x1, y1, x2, y2, x3, y3, x4, y4]
// Represents 4 corner points of a quadrilateral

Example:
{
  obbox: [0.1, 0.2, 0.4, 0.15, 0.5, 0.5, 0.2, 0.55]
  // Point 1: (0.1, 0.2)   - Top-left
  // Point 2: (0.4, 0.15)  - Top-right
  // Point 3: (0.5, 0.5)   - Bottom-right
  // Point 4: (0.2, 0.55)  - Bottom-left
  
  // All coordinates normalized (0-1)
}

// On Canvas:
// Multiply by canvas width/height to get pixel coordinates
const pixelX1 = x1 * canvasWidth;
const pixelY1 = y1 * canvasHeight;
```

---

## 🌐 API Integration

### ML Model Endpoint Requirements

The ML model endpoint must:

1. **Accept POST requests** with JSON payload
2. **Return JSON response** with queries object
3. **Support timeout handling** (≥30 seconds)
4. **Return proper HTTP status codes**
5. **Format bounding boxes** as 8-coordinate arrays

### Expected Request Format
```json
{
  "input_image": {
    "image_id": "unique_id",
    "image_url": "https://...",
    "metadata": {
      "width": 512,
      "height": 512,
      "spatial_resolution_m": 1.57
    }
  },
  "queries": {
    "caption_query": { "instruction": "..." },
    "grounding_query": { "instruction": "..." },
    "attribute_query": {
      "binary": { "instruction": "..." },
      "numeric": { "instruction": "..." },
      "semantic": { "instruction": "..." }
    }
  }
}
```

### Expected Response Format
```json
{
  "success": true,
  "queries": {
    "caption_query": {
      "response": "Image description text"
    },
    "grounding_query": {
      "response": [
        { "obbox": [0.1, 0.2, 0.4, 0.15, 0.5, 0.5, 0.2, 0.55] },
        { "obbox": [0.6, 0.3, 0.8, 0.25, 0.9, 0.7, 0.7, 0.75] }
      ]
    },
    "attribute_query": {
      "binary": { "response": "Yes" },
      "numeric": { "response": "1500 square meters" },
      "semantic": { "response": "White building" }
    }
  }
}
```

---

## 🐳 Deployment

### Frontend Deployment (Vercel)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
cd ISRO_frontend
vercel

# 4. Set environment variables in Vercel dashboard
# VITE_BACKEND_ENDPOINT = https://your-backend-url.com
```

### Backend Deployment (Docker/Cloud)

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

### Environment Variables

#### Frontend (.env)
```env
VITE_BACKEND_ENDPOINT=https://your-backend-url.com
```

#### Backend (.env)
```env
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.com
ML_MODEL_ENDPOINT=https://your-ml-endpoint.com
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. CORS Error
**Error:** `Access to XMLHttpRequest blocked by CORS`

**Solutions:**
- Verify `FRONTEND_URL` in backend `.env`
- Check CORS middleware configuration in `app.js`
- Ensure backend is running on correct port

#### 2. ML Model Timeout
**Error:** `Request timeout: ML model response took too long`

**Solutions:**
- Check ML model server status
- Verify ML endpoint is responding
- Increase timeout in controller (currently 180s)
- Optimize ML model inference time

#### 3. ML Endpoint Not Configured
**Error:** `ML model endpoint not configured`

**Solutions:**
- Add `ML_MODEL_ENDPOINT` to `.env`
- Restart backend server
- Verify endpoint URL is correct

#### 4. Invalid JSON Response
**Error:** `Invalid JSON response from ML model`

**Solutions:**
- Verify ML model returns valid JSON
- Check `Content-Type: application/json` header
- Validate response format matches expected structure

#### 5. Session Not Persisting
**Issue:** Sessions lost on page refresh

**Solutions:**
- Check browser localStorage is enabled
- Verify `sessioncontext` provider wraps app
- Check console for storage errors

#### 6. Image Upload Fails
**Error:** `Failed to upload image`

**Solutions:**
- Verify image URL is accessible
- Check image file size (max 50MB in backend)
- Ensure image format is supported (JPG, PNG, TIFF)
- Check CORS headers for image URL

#### 7. Bounding Boxes Not Displaying
**Issue:** Canvas overlay not showing boxes

**Solutions:**
- Verify 8-coordinate format is correct
- Check canvas context save/restore
- Verify fillStyle is set before fill()
- Check coordinate normalization (0-1 range)

#### 8. Theme Not Persisting
**Issue:** Dark mode resets on refresh

**Solutions:**
- Check `Themeprovider` implementation
- Verify localStorage permission
- Check theme context initialization

---

## 📚 Additional Resources

### Directory References
- **Backend Code:** `./ISRO_backend/`
- **Frontend Code:** `./ISRO_frontend/src/`
- **Backend API:** `http://localhost:3000/api`
- **Frontend Dev:** `http://localhost:5173`

### Key Files to Understand
1. **Backend:** `app.js` → `rotues/` → `Controller/`
2. **Frontend:** `src/App.jsx` → `src/Pages/Chat.jsx` → `src/Components/`
3. **State:** `src/Context/session/` and `src/Context/theme/`
4. **API:** `src/Components/apicaller.js`

### Development Workflow

```bash
# Terminal 1: Backend
cd ISRO_backend
npm run dev
# Backend running on http://localhost:3000

# Terminal 2: Frontend
cd ISRO_frontend
npm run dev
# Frontend running on http://localhost:5173

# Terminal 3: Testing (Optional)
# Use Postman or curl to test APIs
```

### Testing API Endpoints

```bash
# Test Interactive Analysis
curl -X POST http://localhost:3000/api/interactive_analysis \
  -H "Content-Type: application/json" \
  -d '{
    "input_image": {
      "image_id": "test",
      "image_url": "https://bit.ly/4oYfvr0",
      "metadata": {"width": 512, "height": 512, "spatial_resolution_m": 1.57}
    },
    "queries": {
      "caption_query": {"instruction": "Describe the image"}
    }
  }'

# Test Evaluation Mode
curl -X POST http://localhost:3000/api/evaluation \
  -H "Content-Type: application/json" \
  -d '{
    "input": {
      "input_image": {...},
      "queries": {...}
    }
  }'
```

## 👥 Contributors

**Built by:** Team_24
**For:** Inter IIT Tech Meet 14.0 x ISRO

---

## 🔗 Quick Links

- **Frontend README:** `./ISRO_frontend/README.md`
- **Backend README:** `./ISRO_backend/README.md`

---

**Last Updated:** December 2025  
**Version:** 1.0.0  
**Status:** Active Development  
**Maintained by:** Team_24