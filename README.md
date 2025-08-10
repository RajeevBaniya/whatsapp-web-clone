# Assignment Task - WhatsApp Web – like chat interface 

A chat interface that mimics WhatsApp Web functionality, built to display conversations from webhook data and allow users to send messages.

## About

This project creates a WhatsApp Web clone that processes webhook payloads and displays them in a familiar chat interface. Users can view conversations, send new messages, and interact with a responsive design that works on all devices.

## Tech Stack

**Frontend**: React with Vite, styled with Tailwind CSS  
**Backend**: Node.js with Express and MongoDB  
**File Storage**: Cloudinary for image uploads

## Project Structure

```
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API calls
│   │   ├── utils/            # Helper functions
│   │   └── assets/           # Images and icons
│   └── package.json
├── backend/                  # Node.js server
│   ├── routes/               # API endpoints
│   ├── models/               # Database models
│   ├── utils/                # Utility functions
│   └── package.json
└── whatsapp sample payloads/ # Sample data files
```

## Getting Started

### Requirements
- Node.js (version 16 or higher)
- MongoDB database
- npm package manager

### Backend Setup
First, set up the backend server:

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```env
MONGODB_URI=yourmongodburi
PORT=5000
CLOUDINARY_CLOUD_NAME=yourcloudinaryname
CLOUDINARY_API_KEY=yourcloudinaryapikey
CLOUDINARY_API_SECRET=yourcloudinarysecretkey
```

Start the backend:
```bash
npm run dev
```

### Frontend Setup
Next, set up the frontend:

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend folder:
```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:
```bash
npm run dev
```

## Features

- Responsive design that works on mobile, tablet, and desktop
- Send and delete messages with status tracking
- Upload and share images using Cloudinary
- Built-in emoji picker for message reactions

## API Endpoints

- `POST /api/webhook/process-payloads` - Process webhook data
- `GET /api/webhook/conversations` - Get all conversations
- `GET /api/webhook/messages?wa_id=<id>` - Get messages for a contact
- `POST /api/webhook/messages` - Send a new message
- `DELETE /api/webhook/messages/:id` - Delete a message
- `DELETE /api/webhook/conversations/:wa_id` - Delete entire conversation

