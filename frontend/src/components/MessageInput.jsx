import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { chatAPI } from '../services/api';
import { 
  AttachmentIcon, 
  SpinnerIcon, 
  SendIcon 
} from '../assets/icons.jsx';
import { MdEmojiEmotions } from "react-icons/md";

const MessageInput = ({ onSendMessage, selectedContact }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const emojiPickerRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if ((!message.trim() && !isUploading) || !selectedContact) return;

    onSendMessage({
      wa_id: selectedContact._id,
      content: message.trim(),
      name: 'You'
    });

    setMessage('');
    setShowEmojiPicker(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setMessage(prevMessage => prevMessage + emojiObject.emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedContact) return;

    setIsUploading(true);
    
    try {
      const response = await chatAPI.uploadFile(file);
      
      if (response.success) {
        onSendMessage({
          wa_id: selectedContact._id,
          content: message.trim(),
          name: 'You',
          attachments: [response.file]
        });
        
        setMessage('');
        setShowEmojiPicker(false);
      }
    } catch (error) {
      console.error('File upload error:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end space-x-1 sm:space-x-2 relative pb-2 px-2 sm:px-4">
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      <button
        type="button"
        onClick={toggleEmojiPicker}
        className="p-1.5 sm:p-2 text-[#8696a0] hover:text-[#54656f] transition-colors flex-shrink-0"
      >
        <MdEmojiEmotions className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        type="button"
        onClick={triggerFileUpload}
        disabled={isUploading}
        className={`p-1.5 sm:p-2 transition-colors flex-shrink-0 ${
          isUploading
            ? 'text-[#8696a0] opacity-50 cursor-not-allowed'
            : 'text-[#8696a0] hover:text-[#54656f]'
        }`}
        title="Attach image"
      >
        {isUploading ? (
          <SpinnerIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          <AttachmentIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
      </button>

      {showEmojiPicker && (
        <div 
          ref={emojiPickerRef}
          className="absolute bottom-full left-0 mb-2 z-50"
        >
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            width={window.innerWidth < 768 ? 280 : 320}
            height={window.innerWidth < 768 ? 350 : 400}
            searchDisabled={false}
            skinTonesDisabled={true}
          />
        </div>
      )}

      <div className="flex-1 bg-white rounded-3xl px-3 sm:px-4 py-2 lg:py-2 flex items-center space-x-2 min-w-0">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isUploading ? "Uploading..." : "Type a message"}
          className="flex-1 bg-transparent resize-none outline-none text-[#111b21] placeholder-[#8696a0] text-sm sm:text-[15px] leading-5 max-h-20 min-w-0"
          rows="1"
          disabled={!selectedContact || isUploading}
        />
      </div>

      {(message.trim() || isUploading) ? (
        <button
          type="submit"
          disabled={isUploading}
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
            isUploading
              ? 'bg-[#8696a0] text-white opacity-50 cursor-not-allowed'
              : 'bg-[#00a884] text-white hover:bg-[#008069]'
          }`}
        >
          {isUploading ? (
            <SpinnerIcon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
          ) : (
            <SendIcon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
          )}
        </button>
      ) : (
        <button
          type="submit"
          disabled
          className="w-8 h-8 sm:w-10 sm:h-10 text-[#8696a0] hover:text-[#54656f] transition-colors flex items-center justify-center opacity-50 cursor-not-allowed flex-shrink-0"
        >
          <SendIcon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
        </button>
      )}
    </form>
  );
};

export default MessageInput;