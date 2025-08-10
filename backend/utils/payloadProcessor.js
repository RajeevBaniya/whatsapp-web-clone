import fs from 'fs';
import path from 'path';
import Message from '../models/Message.js';

function extractMessageData(payload) {
  try {
    const entry = payload.metaData?.entry?.[0];
    if (!entry?.changes?.[0]?.value) return null;

    const value = entry.changes[0].value;
    const contacts = value.contacts?.[0];
    const messages = value.messages?.[0];
    const statuses = value.statuses?.[0];

    // Handle message files
    if (messages) {
      return {
        wa_id: contacts?.wa_id,
        meta_msg_id: messages.id,
        type: 'message',
        content: messages.text?.body,
        timestamp: new Date(parseInt(messages.timestamp) * 1000),
        sender: messages.from === contacts?.wa_id ? 'contact' : 'user',
        name: contacts?.profile?.name
      };
    }

    // Handle status files
    if (statuses) {
      return {
        meta_msg_id: statuses.meta_msg_id,
        type: 'status',
        status: statuses.status,
        timestamp: new Date(parseInt(statuses.timestamp) * 1000)
      };
    }

    return null;
  } catch (error) {
    console.error('Error extracting message data:', error);
    return null;
  }
}

async function processPayload(payload) {
  try {
    const messageData = extractMessageData(payload);
    if (!messageData) return { success: false, error: 'Invalid payload structure' };

    if (messageData.type === 'message') {
      await Message.findOneAndUpdate(
        { meta_msg_id: messageData.meta_msg_id },
        messageData,
        { upsert: true, new: true }
      );
    } else if (messageData.type === 'status') {
      await Message.findOneAndUpdate(
        { meta_msg_id: messageData.meta_msg_id },
        { 
          status: messageData.status,
          timestamp: messageData.timestamp
        },
        { new: true }
      );
    }

    return { success: true };
  } catch (error) {
    console.error('Error processing payload:', error);
    return { success: false, error: error.message };
  }
}

async function processAllPayloads(payloadsDir) {
  try {
    const files = fs.readdirSync(payloadsDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    let processed = 0;
    let errors = 0;

    for (const file of jsonFiles) {
      try {
        const filePath = path.join(payloadsDir, file);
        const payload = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        const result = await processPayload(payload);
        if (result.success) {
          processed++;
        } else {
          errors++;
          console.error(`Error processing ${file}:`, result.error);
        }
      } catch (error) {
        errors++;
        console.error(`Error reading ${file}:`, error.message);
      }
    }

    return { processed, errors };
  } catch (error) {
    console.error('Error processing all payloads:', error);
    return { processed: 0, errors: 1 };
  }
}

export { processPayload, processAllPayloads };
