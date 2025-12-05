# GeoNLI Submission – Web Team

---

## 🧩 PART 1 → USER GUIDE (PDF)

### User Guide – GeoNLI Interactive Interface

#### 1. Overview
This tool provides an interactive web-based interface for querying an ISRO-provided multimodal model using either:
- Interactive Mode (user-friendly chat)
- JSON-Based Mode (upload complete query spec with image metadata)

#### 2. How to Run the Application
1. Extract the ZIP
2. Navigate to `/ISRO_frontend` and run:
   ```bash
   npm install
   npm run dev
   ```
3. Navigate to `/ISRO_backend` and run:
   ```bash
   npm install
   node server.js
   ```
4. ML backend setup will be done by the ML team.
5. Open browser at [http://localhost:5173](http://localhost:5173)

#### 3. How to Use
- Create a new session
- Switch between Interactive and Evaluation mode
- **Interactive Mode:**
  - Upload images from your local device
  - Choose query type and send
- **Evaluation Mode:**
  - Send JSON data (ensure all required fields)
- System auto-extracts:
  - Image URL
  - Height / Width
  - Spatial Resolution
- Enter query in chat
- **Flow:**
  - Frontend → Backend → Model → Response
- All chats auto-saved in local storage for fast communication

---

## 🧩 PART 2 → FRONTEND README

# GeoNLI – Frontend

## Tech Stack
- React + Vite
- TailwindCSS
- Framer Motion
- Context API (Theme + Session state)
- Cloudinary (Unsigned upload)
- Lucide Icons
- Vercel & Acternity UI for smooth UX

## Folder Structure
/src  
 ├── Components  
 ├── Context  
 ├── Pages  
 ├── utils  
 ├── App.jsx  
 └── main.jsx  

## Features
- Session-based chat UI
- Image upload + Cloudinary integration
- JSON input support
- Light/Dark theme system
- Local storage session persistence
- Dual mode for task-based workflow

## .env Example
```env
VITE_BACKEND_ENDPOINT="http://localhost:8000" # For local development
# VITE_BACKEND_ENDPOINT="https://interiit-isro.onrender.com" # For production
```

---

## 🧩 PART 3 → BACKEND README (NodeJS)

# GeoNLI – Node Backend

## Purpose
Acts as a middle-layer between frontend and Python ML model.

## Routes
- `POST http://localhost:8000/api/interactive_analysis`  
  - Accepts: user prompt + sessionID + imageURL
  - Forwards request to FastAPI ML backend
  - Returns model output to the frontend
- `POST http://localhost:8000/api/evaluation`  
  - Accepts: JSON input for evaluation mode
  - Forwards request to FastAPI ML backend
  - Returns model output to the frontend

## Run
```bash
npm install
node server.js
```

## .env Example
```env
PORT=8000
ML_MODEL_ENDPOINT="http://194.68.245.32:22100/geoNLI/eval"
```

---

## 🧩 PART 4 → PYTHON ML BACKEND README

# GeoNLI – Python ML Backend

## Purpose
Runs the ISRO-provided multimodal inference engine.

## Structure
/ml_backend
 ├── semantic/
 ├── inference_engine.py
 ├── main.py (FastAPI)
 └── requirements.txt

## Run
```bash
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## API
- `POST /infer`
  - Accepts full JSON query (image, metadata, queries)
  - Runs model
  - Returns predictions

*Note: All model logic and files will be provided by the ML_team.*

---

## 🧩 PART 5 → ENVIRONMENT SPECIFICATIONS

Environment
- OS: Windows 10 / Ubuntu 22.04

Frontend
- Node 20+
- npm 9+
- TailwindCSS v3
- Framer Motion v11

Backend (NodeJS)
- Express
- Axios
- CORS

ML Backend (Python)
- Python 3.10+
-By ml team 

---

## 🧩 PART 6 → DEPLOYMENT SCRIPT

Example `deploy.sh`:
```bash
#!/bin/bash

echo "Installing Frontend..."
cd ISRO_frontend
npm install

echo "Installing Backend..."
cd ../ISRO_backend
npm install

echo "Installing ML Backend..."
cd ../ml_backend
pip install -r requirements.txt

echo "Starting ML Backend..."
uvicorn main:app --host 0.0.0.0 --port 8000 &

echo "Starting Node Server..."
node server.js &

echo "Starting Frontend..."
cd ../ISRO_frontend
npm run dev
```

---

## 🧩 PART 7 → REPORT SECTIONS

### A. Methodology & Architecture
- 3-layer architecture:
  - Frontend (React)
  - NodeJS Proxy Backend
  - Python FastAPI ML Model

#### Architecture Flowchart
```mermaid
flowchart LR
    A[User] --> B[Frontend (React)]
    B --> C[NodeJS Backend]
    C --> D[Python ML Model]
    D --> C
    C --> B
    B --> A
```

### B. Innovation / USP
- JSON-based technical query mode
- Hybrid interactive + automated inference
- Local caching of sessions
- Fully modular model-handling architecture

### C. Model Selection
- Our ML team integrated the custom lightweight multimodal model trained on remote-sensing data.

### D. APIs Used
- Cloudinary (unsigned upload)
- Internal Node proxy
- FastAPI inference endpoint

### E. Testing & Performance
- We tested the interface with sample JSON provided by ISRO
- Verified multi-query routing (caption, grounding, attributes)

### F. Technical Details
- State machines
- Auto-scroll
- UI performance optimizations
- Error boundaries
- Fault-tolerant API calls

---

## 🧨 Submission Note

ML part was handled by the ML sub-team. Our responsibility was the full-stack interface, API routing, and deployment pipeline.

---

*If you want to generate PDFs, diagrams, or folder structure, just say: “Generate report + diagrams”*
