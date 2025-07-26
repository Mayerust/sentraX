# sentraX – AI-Powered Network Pentesting Workflow

## Overview
sentraX automates the six phases of network penetration testing using GPT-4 and classic pentest tools (Shodan, Nmap, Metasploit). A modular FastAPI backend orchestrates phases; a React/Tailwind frontend offers real-time control, AI insights, and professional reporting.

## Repository Structure
├── public/  
├── src/ (React + TypeScript UI)  
├── backend/  
│   ├── app.py  
│   ├── requirements.txt  
│   ├── .env.example  
│   ├── pentest/  
│   │   ├── recon.py  
│   │   ├── scan.py  
│   │   ├── exploit.py  
│   │   ├── persist.py  
│   │   ├── cleanup.py  
│   │   └── report.py  
│   └── utils/  
│       ├── gpt_client.py  
│       └── logger.py  
├── package.json  
├── vite.config.ts  
└── tailwind.config.ts

## Prerequisites
- Node.js 18+  
- Python 3.10+  
- OpenAI API key, Shodan API key, Metasploit RPC password  

## Setup

### Backend
cd backend
cp .env.example .env

Populate .env with your keys
pip install -r requirements.txt
uvicorn app:app --reload --host 0.0.0.0 --port 8000
### Frontend
cd ..
npm install
npm run dev
UI at http://localhost:5173; API proxied to http://localhost:8000/api.

## Usage
1. Enter target IPs in Dashboard.  
2. Select or customize AI-driven workflow in AI Workflow tab.  
3. Run pentest; monitor real-time logs.  
4. Review AI Analysis & Risk Engine outputs.  
5. Download professional report in Report tab.

## Features
- Six-phase automation: Recon, Scan, Exploit, Persist, Cleanup, Report  
- GPT-4 analytics & remediation suggestions  
- Priority modes: Stealth, Aggressive, Comprehensive  
- Modular architecture for tool extension  
- Professional report export  

## Future Roadmap
- Multi-target parallel scanning  
- Team collaboration & user management  
- Cloud deployment options
