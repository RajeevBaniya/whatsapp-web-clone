# WhatsApp Web Clone

A WhatsApp Web-like chat interface that displays real-time conversations from webhook data, with support for sending new messages and hosting publicly.

## 🎯 Project Overview

This project implements a WhatsApp Web clone with the following core features:
- **Webhook Payload Processor**: Reads and processes JSON payloads simulating WhatsApp Business API webhooks
- **WhatsApp Web-like Interface**: Clean, responsive UI showing conversations grouped by user
- **Send Message Demo**: Add new messages (storage only, no external sending)
- **Real-time Display**: Message bubbles with timestamps, status indicators, and user information

## 🛠️ Tech Stack

**Frontend**: React, Vite, Tailwind CSS, Axios  
**Backend**: Node.js, Express, MongoDB, Mongoose  
**File Upload**: Cloudinary, Multer

## 📁 Project Structure

```
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── services/         # API services
│   │   ├── utils/            # Helpers & constants
│   │   └── assets/           # Images & icons
│   └── package.json
├── backend/                  # Node.js backend
│   ├── routes/               # API routes
│   ├── models/               # MongoDB schemas
│   ├── utils/                # Utility functions
│   └── package.json
└── whatsapp sample payloads/ # Sample webhook data
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGODB_URI=yourmongodburi
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000
```

Start development server:
```bash
npm run dev
```

## ✅ Task Completion

- **Task 1**: Webhook Payload Processor ✅
- **Task 2**: WhatsApp Web-like Interface ✅  
- **Task 3**: Send Message Demo ✅

## 🎨 Features

- **Responsive Design**: Mobile, tablet, desktop
- **Message Management**: Send, delete, status tracking
- **File Upload**: Image attachments via Cloudinary
- **Emoji Picker**: Integrated emoji selection
- **Multiple Views**: Chats, Status, Communities, Tools
- **Modern UI**: WhatsApp Business Web design

