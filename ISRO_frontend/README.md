# GeoNLI Frontend

**Advanced Satellite Image Analysis UI - React/Vite Application**

React-based frontend application providing interactive satellite image analysis with real-time chat interface and evaluation capabilities.

![React](https://img.shields.io/badge/React-18.0-blue) ![Vite](https://img.shields.io/badge/Vite-Latest-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4) ![Status](https://img.shields.io/badge/Status-Active-success)

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Installation & Setup](#installation--setup)
4. [Environment Configuration](#environment-configuration)
5. [Development](#development)
6. [Building](#building)
7. [Pages Documentation](#pages-documentation)
8. [Components Documentation](#components-documentation)
9. [State Management](#state-management)
10. [API Integration](#api-integration)
11. [Styling & Theme](#styling--theme)
12. [Troubleshooting](#troubleshooting)
13. [Deployment](#deployment)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your backend URL

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
ISRO_frontend/
│
├── 📄 Configuration Files
│   ├── vite.config.js              # Vite build configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   ├── postcss.config.js            # PostCSS plugins configuration
│   ├── jsconfig.json                # JavaScript module paths
│   ├── eslint.config.js             # ESLint rules
│   ├── components.json              # Component registry
│   └── vercel.json                  # Vercel deployment config
│
├── 📄 Environment & Meta
│   ├── .env                         # Environment variables (local)
│   ├── .env.example                 # Environment template
│   ├── .gitignore                   # Git ignore rules
│   ├── package.json                 # Dependencies & scripts
│   ├── index.html                   # HTML entry point
│   └── README.md                    # This file
│
├── 📁 src/                          # Source code directory
│   ├── 📄 App.jsx
│   │   └─ Root component
│   │   └─ Context providers wrapper
│   │   └─ Main routing setup
│   │
│   ├── 📄 main.jsx
│   │   └─ React app entry point
│   │   └─ ReactDOM render
│   │   └─ Provider initialization
│   │
│   ├── 📄 index.css
│   │   └─ Global styles
│   │   └─ Tailwind imports
│   │   └─ Custom CSS variables
│   │
│   ├── 📁 Pages/                    # Page components (routes)
│   │   ├── 📄 Home.jsx
│   │   │   ├─ Landing page
│   │   │   ├─ Hero section with animations
│   │   │   ├─ Features showcase
│   │   │   ├─ How it works section
│   │   │   ├─ CTA buttons
│   │   │   └─ Footer
│   │   │
│   │   ├── 📄 Dashboard.jsx
│   │   │   ├─ Mode selection page
│   │   │   ├─ Interactive mode card
│   │   │   ├─ Evaluation mode card
│   │   │   ├─ Recent sessions display
│   │   │   └─ Navigation handlers
│   │   │
│   │   ├── 📄 Chat.jsx
│   │   │   ├─ Main working interface
│   │   │   ├─ Mode toggle (Interactive/Evaluation)
│   │   │   ├─ Responsive panel layout
│   │   │   ├─ Integration hub:
│   │   │   │  ├─ Chatleft (sessions)
│   │   │   │  ├─ Chatmiddle (image viewer)
│   │   │   │  └─ Chatright (chat interface)
│   │   │   ├─ Bounding box state management
│   │   │   ├─ Window resize listener
│   │   │   ├─ Responsive breakpoints
│   │   │   └─ Mobile/Tablet/Desktop layouts
│   │   │
│   │   ├── 📄 Chateval2.jsx
│   │   │   ├─ Evaluation mode (JSON editor)
│   │   │   ├─ Input JSON textarea
│   │   │   ├─ Output JSON display
│   │   │   ├─ Image with canvas overlay
│   │   │   ├─ Bounding box visualization
│   │   │   ├─ Execution statistics
│   │   │   ├─ Export functionality
│   │   │   ├─ Copy to clipboard
│   │   │   └─ Load JSON from file
│   │   │
│   │   └── 📄 ChatEvalMode.jsx
│   │       ├─ Alternative evaluation interface
│   │       ├─ Backup eval mode component
│   │       └─ Similar to Chateval2 with variations
│   │
│   ├── 📁 Components/               # Reusable components
│   │   ├── 📄 Chatleft.jsx
│   │   │   ├─ Session management sidebar
│   │   │   ├─ Create new session modal
│   │   │   ├─ Session list with dates
│   │   │   ├─ Delete with confirmation dialog
│   │   │   ├─ Active session highlight
│   │   │   ├─ Collapsible sidebar (mobile)
│   │   │   └─ LocalStorage persistence
│   │   │
│   │   ├── 📄 Chatmiddle.jsx
│   │   │   ├─ Image viewer component
│   │   │   ├─ Image upload (drag & drop)
│   │   │   ├─ File input fallback
│   │   │   ├─ Preview modal
│   │   │   ├─ Canvas overlay system
│   │   │   ├─ Bounding box rendering
│   │   │   ├─ Image analysis header
│   │   │   ├─ Loading states
│   │   │   └─ Error handling
│   │   │
│   │   ├── 📄 Chatright.jsx
│   │   │   ├─ Chat interface component
│   │   │   ├─ Message input field
│   │   │   ├─ Query type selector
│   │   │   ├─ Send button
│   │   │   ├─ Message history display
│   │   │   ├─ AI response rendering
│   │   │   ├─ Loading indicators
│   │   │   ├─ Typing animations
│   │   │   └─ Error message display
│   │   │
│   │   ├── 📄 Navbar.jsx
│   │   │   ├─ Top navigation bar
│   │   │   ├─ Logo & branding
│   │   │   ├─ Navigation links
│   │   │   ├─ Theme toggle
│   │   │   ├─ Mode indicator
│   │   │   └─ Responsive mobile menu
│   │   │
│   │   ├── 📄 Footer.jsx
│   │   │   ├─ Bottom footer section
│   │   │   ├─ Project links
│   │   │   ├─ Credits & attribution
│   │   │   └─ Social links
│   │   │
│   │   ├── 📄 Error.jsx
│   │   │   ├─ Error boundary component
│   │   │   ├─ Error state display
│   │   │   └─ Error recovery options
│   │   │
│   │   ├── 📄 apicaller.js
│   │   │   ├─ API request handler
│   │   │   ├─ Request builder
│   │   │   ├─ Response parser
│   │   │   ├─ Query type handling
│   │   │   ├─ Bounding box extraction
│   │   │   ├─ Error handling
│   │   │   └─ Timeout management
│   │   │
│   │   ├── 📄 HeroHighlightDemo.jsx
│   │   │   └─ Hero section highlight animation
│   │   │
│   │   ├── 📄 LayoutTextFlipDemo.jsx
│   │   │   └─ Text flip animation effect
│   │   │
│   │   ├── 📄 Style_slider.jsx
│   │   │   └─ Image carousel/slider component
│   │   │
│   │   └── 📁 ui/                   # Reusable UI elements
│   │       ├── 📄 alert-dialog.jsx
│   │       │   └─ Alert/confirmation dialogs
│   │       │
│   │       ├── 📄 button.jsx
│   │       │   └─ Reusable button component
│   │       │
│   │       ├── 📄 chat-input.jsx
│   │       │   └─ Chat message input field
│   │       │
│   │       ├── 📄 query-type-selector.jsx
│   │       │   └─ Query type dropdown selector
│   │       │   └─ Caption/Grounding/Attribute options
│   │       │
│   │       ├── 📄 shiny-button.jsx
│   │       │   └─ Animated button with shine effect
│   │       │
│   │       ├── 📄 typing-animation.jsx
│   │       │   └─ Typing effect animation
│   │       │
│   │       ├── 📄 animated-list.jsx
│   │       │   └─ Animated list component
│   │       │
│   │       ├── 📄 hero-highlight.jsx
│   │       │   └─ Hero highlight effect
│   │       │
│   │       ├── 📄 layout-text-flip.jsx
│   │       │   └─ Layout text flip animation
│   │       │
│   │       ├── 📄 button-group.jsx
│   │       │   └─ Button group container
│   │       │
│   │       ├── 📄 TextType.jsx
│   │       │   └─ Text type component
│   │       │
│   │       ├── 📄 sonner.jsx
│   │       │   └─ Toast notification system
│   │       │
│   │       ├── 📄 StarField.jsx
│   │       │   └─ Animated star background
│   │       │
│   │       ├── 📄 globe-light.jsx
│   │       │   └─ Globe visualization (light theme)
│   │       │
│   │       └── 📄 globe.jsx
│   │           └─ Globe visualization (dark theme)
│   │
│   ├── 📁 Context/                  # Global state management
│   │   ├── 📁 session/
│   │   │   ├── 📄 sessioncontext.jsx
│   │   │   │   ├─ React Context creation
│   │   │   │   ├─ Exports:
│   │   │   │   │  ├─ sessioncontext object
│   │   │   │   │  └─ Used by sessionprovide
│   │   │   │   └─ Provides session data structure
│   │   │   │
│   │   │   └── 📄 sessionprovide.jsx
│   │   │       ├─ Context provider component
│   │   │       ├─ Session state initialization
│   │   │       ├─ LocalStorage sync
│   │   │       ├─ Session CRUD operations
│   │   │       ├─ Active session management
│   │   │       └─ Wraps entire app
│   │   │
│   │   └── 📁 theme/
│   │       ├── 📄 Themecontext.jsx
│   │       │   ├─ React Context creation
│   │       │   ├─ Exports:
│   │       │   │  ├─ themecontext object
│   │       │   │  ├─ darkMode state
│   │       │   │  └─ toggleTheme function
│   │       │   └─ Used by Themeprovider
│   │       │
│   │       └── 📄 Themeprovider.jsx
│   │           ├─ Context provider component
│   │           ├─ Dark mode state
│   │           ├─ LocalStorage persistence
│   │           ├─ Theme toggle logic
│   │           ├─ Applies theme classes
│   │           └─ Wraps entire app
│   │
│   ├── 📁 lib/                      # Utility functions
│   │   └── 📄 utils.js
│   │       ├─ Helper functions
│   │       ├─ Formatting utilities
│   │       ├─ Validation functions
│   │       └─ Common logic
│   │
│   └── 📁 assets/                   # Static assets
│       └─ Images, SVGs, media files
│
└── 📁 public/                       # Public assets
    └─ Favicon, robots.txt, etc.

```

---

## 💾 Installation & Setup

### Prerequisites
- **Node.js** v16 or higher
- **npm** v8+ or **yarn** v1.22+
- **Backend API** running (see backend README)

### Step 1: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 2: Configure Environment

Create `.env` file in root:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Backend API endpoint
VITE_BACKEND_ENDPOINT=http://localhost:3000

# Optional: Additional configuration
VITE_APP_TITLE=GeoNLI
VITE_LOG_LEVEL=debug
```

### Step 3: Verify Installation

```bash
# Check versions
node --version      # Should be v16+
npm --version       # Should be v8+

# Check dependencies
npm list react
npm list vite
```

---

## 🌍 Environment Configuration

### `.env` Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_BACKEND_ENDPOINT` | Backend API URL | ✅ Yes | `http://localhost:3000` |
| `VITE_APP_TITLE` | Application title | ❌ No | `GeoNLI` |
| `VITE_LOG_LEVEL` | Console log level | ❌ No | `info` |

### Example Configurations

**Local Development:**
```env
VITE_BACKEND_ENDPOINT=http://localhost:3000
```

**Staging:**
```env
VITE_BACKEND_ENDPOINT=https://staging-api.example.com
```

**Production:**
```env
VITE_BACKEND_ENDPOINT=https://api.example.com
```

---

## 🛠️ Development

### Start Development Server

```bash
npm run dev
```

Output:
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Access at: `http://localhost:5173/`

### Development Features

- ✅ Hot Module Replacement (HMR)
- ✅ Fast refresh on file changes
- ✅ Source maps for debugging
- ✅ Console errors overlay
- ✅ Tailwind hot reload

### File Watching

Vite automatically watches:
- `.jsx` files
- `.css` files
- `.json` files
- Configuration changes

### Debugging

**Browser DevTools:**
```javascript
// Open browser console (F12)
// Source maps enabled for debugging
// React DevTools extension recommended
```

**Backend Connection:**
```javascript
// Check network tab in DevTools
// Verify API calls in Network tab
// Check Console for errors
```

---

## 🏗️ Building

### Production Build

```bash
npm run build
```

Output:
```
dist/
├── index.html
├── assets/
│   ├── index-XXXXX.js
│   ├── index-XXXXX.css
│   └── [other assets]
└── [static files]
```

### Build Optimization

- ✅ Code minification
- ✅ CSS optimization
- ✅ JavaScript bundling
- ✅ Asset compression
- ✅ Tree shaking

### Preview Production Build

```bash
npm run preview
```

Serves at: `http://localhost:4173/`

### Build Analysis

```bash
# Check bundle size
npm run build -- --debug

# Analyze bundle (optional)
# Install: npm install rollup-plugin-visualizer --save-dev
```

---

## 📄 Pages Documentation

### Home.jsx

**Purpose:** Landing page and project showcase

**Route:** `/`

**Components Used:**
- Navbar
- Hero sections
- Feature cards
- Animations (HeroHighlight, LayoutTextFlip)
- CTA buttons
- Footer

**Functionality:**
```javascript
├─ Display project overview
├─ Showcase key features
├─ Explain workflow
├─ Navigation to Chat/Dashboard
└─ Responsive design
```

**Key Features:**
- Hero highlight animation
- Feature showcase grid
- Interactive CTA buttons
- Smooth scrolling
- Dark/light theme support

---

### Dashboard.jsx

**Purpose:** Mode selection and overview

**Route:** `/dashboard`

**Components Used:**
- Navbar
- Mode selector cards
- Session preview
- Statistics display

**Functionality:**
```javascript
├─ Display available modes
├─ Mode descriptions
├─ Start buttons
├─ Recent sessions
└─ Navigation handlers
```

**Mode Options:**
1. **Interactive Mode** - Real-time chat interface
2. **Evaluation Mode** - JSON-based testing

---

### Chat.jsx

**Purpose:** Main working interface

**Route:** `/chat`

**State Management:**
```javascript
{
  mode: 'interactive' | 'evaluation',
  boundingBoxes: [],
  sidebarOpen: boolean,
  windowWidth: number,
  // Computed:
  isMobile: boolean,      // < 768px
  isTablet: boolean,      // 768-1024px
  isDesktop: boolean      // > 1024px
}
```

**Layouts:**

**Mobile Layout:**
```
┌─────────────────┐
│   Header        │
├─────────────────┤
│ [Sessions/Image]│ ← Tab selector
│  (Stacked)      │
├─────────────────┤
│  Chat Input     │
└─────────────────┘
```

**Tablet Layout:**
```
┌──────────────────────────────────┐
│   Header                         │
├───────────────────┬──────────────┤
│   Sessions  │     │ Image Viewer │
│   (15%)     │────││ (50%)        │
│             │────││              │
├─────────────┼──────┤─────────────┤
│  Chat Input │      │  Stats      │
│  (35%)      │      │             │
└─────────────┴──────┴─────────────┘
```

**Desktop Layout:**
```
┌───────────────────────────────────────────┐
│   Header                                  │
├────────────┬──────────────┬───────────────┤
│ Sessions   │              │               │
│   (20%)    │ Image Viewer │ Chat Input    │
│            │   (40%)      │   (40%)       │
│            │              │               │
└────────────┴──────────────┴───────────────┘
```

**Key Features:**
- Responsive panel layout
- Mode switching (Interactive ↔ Evaluation)
- Real-time image analysis
- Bounding box visualization
- Session management
- Mobile tab navigation

---

### Chateval2.jsx

**Purpose:** Evaluation mode JSON interface

**Route:** `/chat` (when mode='evaluation')

**Features:**
- JSON input editor
- JSON output display
- Image viewer with annotations
- Execution statistics
- Export functionality
- File upload (JSON)

**Input Format:**
```json
{
  "input": {
    "input_image": {
      "image_id": "id",
      "image_url": "https://...",
      "metadata": {"width": 512, "height": 512}
    },
    "queries": {
      "caption_query": {"instruction": "..."},
      "grounding_query": {"instruction": "..."},
      "attribute_query": {}
    }
  }
}
```

**Output Format:**
```json
{
  "success": true,
  "data": {
    "queries": {
      "caption_query": {"response": "..."},
      "grounding_query": {"response": [...]},
      "attribute_query": {"response": "..."}
    }
  },
  "timestamp": "ISO string"
}
```

---

## 🧩 Components Documentation

### Chatleft.jsx (Session Sidebar)

**Purpose:** Session management

**Props:**
```javascript
{
  sidebarOpen: boolean,
  setSidebarOpen: (bool) => void
}
```

**Features:**
- Create new session modal
- Session list display
- Session deletion (with confirmation)
- Collapsible sidebar (mobile)
- Active session highlight
- LocalStorage persistence

**Data Structure:**
```javascript
{
  sessionId: UUID,
  name: string,
  createdAt: timestamp,
  publicImageURL: string | null,
  draftText: string,
  aiLoading: boolean,
  messages: Array,
  unreadCount: number,
  updatedAt: timestamp
}
```

---

### Chatmiddle.jsx (Image Viewer)

**Purpose:** Display satellite image with annotations

**Props:**
```javascript
{
  boundingBoxes: Array<{
    obbox: [x1, y1, x2, y2, x3, y3, x4, y4],
    label?: string
  }>,
  onImageChange: () => void
}
```

**Features:**
- Image upload (drag & drop)
- File input fallback
- Preview modal
- Canvas overlay
- Bounding box rendering
- Responsive sizing
- Dark/light theme

**Image Upload Flow:**
```
User Input
    ↓
Drag & Drop / File Click
    ↓
Preview Modal
    ↓
Confirm & Upload
    ↓
Backend Processing
    ↓
Update Image URL
    ↓
Render with Canvas
```

**Canvas Drawing:**
```javascript
// For each bounding box:
1. Get normalized coordinates [0-1]
2. Multiply by canvas width/height
3. Draw semi-transparent fill
4. Draw colored border
5. Draw corner circles
6. Add label text
```

---

### Chatright.jsx (Chat Interface)

**Purpose:** Query input and AI responses

**Props:**
```javascript
{
  setBoundingBoxes: (boxes) => void
}
```

**Features:**
- Message input field
- Query type selector
- Send button
- Message history
- AI response streaming
- Loading indicators
- Typing animation
- Error handling

**Query Types:**

1. **Caption Query**
   - Generates image description
   - Returns: Text response

2. **Grounding Query**
   - Object detection/localization
   - Returns: Bounding boxes + descriptions

3. **Attribute Query**
   - Extract specific attributes
   - Returns: Binary/Numeric/Semantic responses

**Message Flow:**
```
User Input
    ↓
Validate Input
    ↓
Build Payload
    ↓
Call API (apicaller.js)
    ↓
Show Loading
    ↓
Receive Response
    ↓
Parse Response
    ↓
Add to Chat History
    ↓
Display Message
    ↓
Extract Bounding Boxes
    ↓
Update Canvas
```

---

### apicaller.js (API Handler)

**Purpose:** Handle API communication with backend

**Main Function:**
```javascript
async handlemodelresponse(
  queryType,      // 'caption' | 'grounding' | 'attribute'
  prompt,         // User query text
  sessionId,      // Session identifier
  imageUrl        // Image URL
)
```

**Query Type Handling:**

**Caption Query:**
```javascript
// Request
{
  caption_query: { instruction: "Describe this image" }
}

// Response
{ response: "Image description text" }
```

**Grounding Query:**
```javascript
// Request
{
  grounding_query: { instruction: "Find the building" }
}

// Response
{
  response: [
    { obbox: [0.1, 0.2, 0.4, 0.15, 0.5, 0.5, 0.2, 0.55] },
    { obbox: [...] }
  ]
}
```

**Attribute Query:**
```javascript
// Request
{
  attribute_query: {
    binary: { instruction: "Is there vegetation?" },
    numeric: { instruction: "How many buildings?" },
    semantic: { instruction: "What type of landscape?" }
  }
}

// Response
{
  binary: { response: "Yes" },
  numeric: { response: "5" },
  semantic: { response: "Urban landscape" }
}
```

**Error Handling:**
```javascript
// Timeout (30 seconds)
catch (error) {
  if (error.code === 'ECONNABORTED') {
    return { success: false, error: "Request timeout" }
  }
}

// Connection error
if (error.message.includes('ECONNREFUSED')) {
  return { success: false, error: "Backend not available" }
}

// Invalid response
if (!response.data) {
  return { success: false, error: "Invalid response" }
}
```

---

## 🎯 State Management

### Session Context

**File:** `src/Context/session/sessioncontext.jsx`

**Provides:**
```javascript
{
  sessions: Array<Session>,
  activeSessionId: Session | null,
  setSessions: (sessions) => void,
  setActiveSessionId: (session) => void
}
```

**Usage:**
```javascript
import { sessioncontext } from './Context/session/sessioncontext'

const { sessions, activeSessionId, setSessions } = useContext(sessioncontext)
```

**Session Object:**
```javascript
{
  sessionId: "uuid-string",
  name: "Session name",
  createdAt: 1702000000000,
  publicImageURL: "https://..." | null,
  draftText: "User draft",
  aiLoading: false,
  messages: [
    {
      role: "user" | "assistant",
      content: "Message text",
      queryType: "caption" | "grounding" | "attribute",
      timestamp: 1702000000000,
      boxes: [] // For grounding responses
    }
  ],
  unreadCount: 0,
  updatedAt: 1702000000000
}
```

**LocalStorage Key:** `GeoNLI_Sessions`

---

### Theme Context

**File:** `src/Context/theme/Themecontext.jsx`

**Provides:**
```javascript
{
  darkMode: boolean,
  toggleTheme: () => void
}
```

**Usage:**
```javascript
import { useTheme } from './Context/theme/Themecontext'

const { darkMode, toggleTheme } = useTheme()
```

**Dark Mode Styles:**
```javascript
// Dark mode (darkMode === true)
className={darkMode ? 'bg-gray-900' : 'bg-white'}

// Theme toggle
onClick={() => toggleTheme()}
```

**LocalStorage Key:** `GeoNLI_Theme`

---

## 🔌 API Integration

### Backend Endpoint Configuration

**File:** `.env`

```env
VITE_BACKEND_ENDPOINT=http://localhost:3000
```

### API Endpoints

#### 1. Interactive Analysis

```
POST {VITE_BACKEND_ENDPOINT}/api/interactive_analysis

Headers:
Content-Type: application/json

Request Body:
{
  "input_image": {
    "image_id": "session-id",
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

Response (200):
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

Error Response (400-500):
{
  "success": false,
  "error": "Error message"
}
```

#### 2. Evaluation Mode

```
POST {VITE_BACKEND_ENDPOINT}/api/evaluation

Headers:
Content-Type: application/json

Request Body:
{
  "input": {
    "input_image": {...},
    "queries": {...}
  }
}

Response (200):
{
  "success": true,
  "data": { /* Full model response */ },
  "timestamp": "ISO timestamp"
}

Error Response (400-500):
{
  "success": false,
  "error": "Error message"
}
```

### Request/Response Examples

**Example 1: Caption Query**
```javascript
// Request
const payload = {
  input_image: {
    image_id: "session-123",
    image_url: "https://example.com/image.jpg",
    metadata: { width: 512, height: 512, spatial_resolution_m: 1.57 }
  },
  queries: {
    caption_query: { instruction: "Describe what you see in this satellite image" }
  }
}

// Response
{
  success: true,
  model_response: {
    queries: {
      caption_query: {
        response: "This satellite image shows an urban area with buildings, roads, and green spaces..."
      }
    }
  }
}
```

**Example 2: Grounding Query**
```javascript
// Request
const payload = {
  input_image: {...},
  queries: {
    grounding_query: { instruction: "Locate all buildings in the image" }
  }
}

// Response
{
  success: true,
  model_response: {
    queries: {
      grounding_query: {
        response: [
          {
            obbox: [0.1, 0.1, 0.35, 0.05, 0.4, 0.3, 0.15, 0.35],
            label: "Building 1"
          },
          {
            obbox: [0.5, 0.4, 0.75, 0.35, 0.8, 0.6, 0.55, 0.65],
            label: "Building 2"
          }
        ]
      }
    }
  }
}
```

---

## 🎨 Styling & Theme

### Tailwind CSS Configuration

**File:** `tailwind.config.js`

**Color Scheme:**
- **Primary:** Orange (#f97316)
- **Secondary:** Blue (#3b82f6)
- **Dark Mode:** Gray-900 background
- **Light Mode:** Gray-50 background

### Theme Variables

**Dark Mode Colors:**
```javascript
darkMode ? {
  bg: 'bg-gray-900',
  surface: 'bg-gray-800',
  text: 'text-white',
  border: 'border-gray-700',
  hover: 'hover:bg-gray-700'
} : {
  bg: 'bg-white',
  surface: 'bg-gray-50',
  text: 'text-gray-900',
  border: 'border-gray-200',
  hover: 'hover:bg-gray-100'
}
```

### Responsive Breakpoints

```javascript
// Tailwind Breakpoints
sm: 640px   // Phones
md: 768px   // Tablets
lg: 1024px  // Desktops
xl: 1280px  // Large screens
2xl: 1536px // Extra large

// Custom Breakpoints in Chat.jsx
isMobile: windowWidth < 768
isTablet: windowWidth >= 768 && windowWidth < 1024
isDesktop: windowWidth >= 1024
```

### Global Styles

**File:** `src/index.css`

```css
/* Imports Tailwind CSS */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom CSS (if any) */
```

---

## 🐛 Troubleshooting

### Issue 1: Backend Not Connecting

**Error:** `Failed to fetch` or `CORS error`

**Solutions:**
1. Verify backend is running: `http://localhost:3000`
2. Check `.env` file: `VITE_BACKEND_ENDPOINT=http://localhost:3000`
3. Verify backend CORS configuration
4. Check browser console for specific error

**Debug Steps:**
```bash
# Check backend status
curl http://localhost:3000/

# Check frontend logs
# Open browser DevTools → Console
# Look for network errors
```

---

### Issue 2: Images Not Loading

**Error:** `Failed to load image` or blank canvas

**Solutions:**
1. Verify image URL is accessible
2. Check CORS headers on image server
3. Verify image format (JPG, PNG, TIFF)
4. Check image file size
5. Verify canvas coordinate system

**Test Image URL:**
```bash
curl -i https://your-image-url.com
# Should return 200 with proper CORS headers
```

---

### Issue 3: Session Not Persisting

**Error:** Session lost on page refresh

**Solutions:**
1. Check browser localStorage is enabled
2. Verify `sessionprovider` wraps App in `main.jsx`
3. Check console for storage errors
4. Clear browser cache and try again

**Debug Script:**
```javascript
// In browser console
console.log(localStorage.getItem('GeoNLI_Sessions'))
// Should show session data
```

---

### Issue 4: Theme Not Changing

**Error:** Dark/light mode not working

**Solutions:**
1. Check `Themeprovider` wraps App
2. Verify localStorage permissions
3. Check theme toggle button onClick handler
4. Clear browser cache

**Debug:**
```javascript
// In console
localStorage.getItem('GeoNLI_Theme')
// Should show 'dark' or 'light'
```

---

### Issue 5: Build Errors

**Error:** `npm run build` fails

**Solutions:**
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Check for syntax errors
npm run lint

# Try build again
npm run build
```

---

### Issue 6: Hot Module Replacement Not Working

**Error:** Changes not reflecting during development

**Solutions:**
1. Restart dev server: `Ctrl+C` then `npm run dev`
2. Hard refresh browser: `Ctrl+Shift+R` (Chrome)
3. Clear browser cache
4. Check file permissions

---

### Issue 7: Query Not Getting Response

**Error:** "Loading..." shows but no response

**Solutions:**
1. Check backend is running
2. Verify image URL is valid
3. Check ML model endpoint is accessible
4. Check network tab for failed requests
5. Check backend logs for errors

---

### Issue 8: Bounding Boxes Not Showing

**Error:** Canvas overlay empty or invisible

**Solutions:**
1. Verify grounding query returns boxes
2. Check coordinate format (8-coordinate)
3. Verify canvas context setup
4. Check z-index and positioning
5. Verify fillStyle and strokeStyle

**Debug Canvas:**
```javascript
// In console while viewing image
console.log(canvasRef.current)
// Should show canvas element

console.log(boundingBoxes)
// Should show array of boxes
```

---

## 📤 Deployment

### Deploy to Vercel

**Step 1: Connect Repository**
```bash
# Push code to GitHub
git push origin main
```

**Step 2: Connect to Vercel**
```bash
# Option 1: Via Vercel CLI
npm install -g vercel
vercel

# Option 2: Via Vercel Dashboard
# Visit https://vercel.com
# Connect GitHub account
# Select repository
# Click Deploy
```

**Step 3: Configure Environment**
```
Vercel Dashboard → Settings → Environment Variables

Add:
VITE_BACKEND_ENDPOINT=https://your-backend-url.com
```

**Step 4: Deploy**
```bash
# Via CLI
vercel --prod

# Via Dashboard
# Just push to main branch
# Vercel auto-deploys
```

### Production Build

**Before deploying:**
1. Run build: `npm run build`
2. Test build: `npm run preview`
3. Check for errors in console
4. Verify all features work

**Build Checklist:**
- ✅ No console errors
- ✅ All pages load
- ✅ API calls work
- ✅ Images load
- ✅ Dark/light mode works
- ✅ Responsive on mobile
- ✅ Performance acceptable

### Performance Optimization

```javascript
// Code splitting (automatic with Vite)
// Image optimization (use appropriate formats)
// Lazy loading components (use React.lazy)
// CSS minification (automatic)
// JavaScript minification (automatic)
```

---

## 📚 Additional Resources

### Documentation Links
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

### Project Files
- **Backend README:** `../ISRO_backend/README.md`
- **Main README:** `../README.md`
- **Package.json:** See installed dependencies

### Local Testing

```bash
# Terminal 1: Backend
cd ../ISRO_backend
npm run dev

# Terminal 2: Frontend
npm run dev

# Terminal 3: API Testing (optional)
curl http://localhost:3000/api/interactive_analysis \
  -H "Content-Type: application/json" \
  -d '{...}'
```

---

## 🔒 Security Notes

- ✅ Environment variables not exposed in build
- ✅ XSS protection via React
- ✅ CORS configured for allowed origins
- ✅ No sensitive data in localStorage
- ✅ All API calls use HTTPS in production

---

## 📋 Scripts Reference

```json
{
  "dev": "vite",                    // Start dev server
  "build": "vite build",            // Build for production
  "preview": "vite preview",        // Preview production build
  "lint": "eslint src"              // Run linter (if configured)
}
```


**Version:** 1.0.0  
**Last Updated:** December 2025  
**Maintained by:** Team_24
