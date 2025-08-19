import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import webhookRoutes from './routes/webhook.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Prevent mongoose from buffering operations when DB is not connected
mongoose.set('bufferCommands', false);

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connected');

    app.use('/api/webhook', webhookRoutes);

    app.get('/', (req, res) => {
      res.json({ 
        message: 'WhatsApp Web Clone Backend Running!',
        endpoints: {
          processPayloads: 'POST /api/webhook/process-payloads',
          getMessages: 'GET /api/webhook/messages',
          sendMessage: 'POST /api/webhook/messages',
          getConversations: 'GET /api/webhook/conversations'
        }
      });
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

start();
