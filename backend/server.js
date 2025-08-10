import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import webhookRoutes from './routes/webhook.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

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
