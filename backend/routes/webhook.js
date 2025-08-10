import express from 'express';
import { processAllPayloads } from '../utils/payloadProcessor.js';
import Message from '../models/Message.js';
import upload from '../middleware/upload.js';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post('/process-payloads', async (req, res) => {
  try {
    const payloadsDir = path.join(__dirname, '../../whatsapp sample payloads');
    const result = await processAllPayloads(payloadsDir);
    
    res.json({
      success: true,
      message: `Processed ${result.processed} files successfully, ${result.errors} errors`,
      result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.get('/messages', async (req, res) => {
  try {
    const { wa_id } = req.query;
    
    if (!wa_id) {
      return res.status(400).json({
        success: false,
        error: 'wa_id parameter is required'
      });
    }
    
    const messages = await Message.find({ wa_id }).sort({ timestamp: 1 });
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.post('/messages', async (req, res) => {
  try {
    const { wa_id, content, name, attachments } = req.body;
    
    if (!wa_id || (!content && (!attachments || attachments.length === 0))) {
      return res.status(400).json({
        success: false,
        error: 'wa_id and either content or attachments are required'
      });
    }

    const newMessage = new Message({
      wa_id,
      meta_msg_id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'message',
      content: content || '',
      timestamp: new Date(),
      sender: 'user',
      name: name || 'You',
      attachments: attachments || []
    });

    await newMessage.save();
    res.json({ success: true, message: newMessage });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.get('/conversations', async (req, res) => {
  try {
    const conversations = await Message.aggregate([
      {
        $group: {
          _id: '$wa_id',
          lastMessage: { $last: '$$ROOT' },
          messageCount: { $sum: 1 },
          contactName: { $first: '$name' }
        }
      },
      {
        $sort: { 'lastMessage.timestamp': -1 }
      }
    ]);

    res.json({ success: true, conversations });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update message status
router.put('/messages/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }

    res.json({ success: true, message: updatedMessage });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Delete individual message
router.delete('/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }

    res.json({ 
      success: true, 
      message: 'Message deleted successfully',
      deletedMessage 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Delete entire conversation
router.delete('/conversations/:wa_id', async (req, res) => {
  try {
    const { wa_id } = req.params;

    const result = await Message.deleteMany({ wa_id });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Conversation not found'
      });
    }

    res.json({ 
      success: true, 
      message: `Deleted ${result.deletedCount} messages from conversation`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// File upload route
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    // Determine file type
    const fileType = getFileType(req.file.mimetype);

    res.json({
      success: true,
      file: {
        type: fileType,
        url: req.file.path,
        filename: req.file.originalname,
        public_id: req.file.filename,
        size: req.file.size
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});



// Helper function to determine file type
const getFileType = (mimetype) => {
  if (mimetype.startsWith('image/')) return 'image';
  return 'image'; // Default to image for any other type
};

export default router;
