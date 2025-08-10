import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  wa_id: {
    type: String,
    required: true,
    index: true
  },
  meta_msg_id: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['message', 'status'],
    default: 'message'
  },
  content: String,
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent'
  },
  sender: {
    type: String,
    enum: ['user', 'contact'],
    required: true
  },
  name: String,
  conversation_id: String,
  attachments: [{
    type: {
      type: String,
      enum: ['image', 'document', 'video', 'audio']
    },
    url: String,
    filename: String,
    public_id: String,
    size: Number
  }]
}, {
  timestamps: true
});

export default mongoose.model('Message', messageSchema);
