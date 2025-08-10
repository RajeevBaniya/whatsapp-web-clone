import React, { useEffect, useRef, useState } from 'react';
import MessageInput from './MessageInput';
import { formatTime, formatDate, getInitials, groupMessagesByDate } from '../utils/helpers';
import welcomeImg from '../assets/images/whatsapp_image.png';
import DeleteDropdown from './common/DeleteDropdown';
import { 
  SentIcon, 
  DeliveredIcon, 
  ReadIcon, 
  DownloadIcon, 
  SpinnerIcon, 
  BackIcon, 
  SearchIcon, 
  MoreIcon,
  LockIcon 
} from '../assets/icons.jsx';

const ChatWindow = ({ selectedContact, messages, onSendMessage, onDeleteMessage, onBackToChats, isMobile = false }) => {
  const messagesEndRef = useRef(null);
  const [downloadingFiles, setDownloadingFiles] = useState(new Set());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <SentIcon />;
      case 'delivered':
        return <DeliveredIcon />;
      case 'read':
        return <ReadIcon />;
      default:
        return null;
    }
  };

  const downloadFile = (url, filename) => {
    const fileKey = `${url}-${filename}`;
    
    setDownloadingFiles(prev => new Set(prev).add(fileKey));
    
    const downloadUrl = url.replace('/upload/', '/upload/fl_attachment/');
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      setDownloadingFiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(fileKey);
        return newSet;
      });
    }, 1000);
  };

    const renderAttachment = (attachment) => {
    return (
      <div className="relative">
        <img 
          src={attachment.url} 
          alt="attachment" 
          className="max-w-[200px] rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => window.open(attachment.url, '_blank')}
          title="Click to view full size"
        />
                 {/* Download button for images */}
         <button 
           onClick={() => downloadFile(attachment.url, attachment.filename)}
           className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 text-white rounded hover:bg-opacity-70 transition-opacity"
           title="Download image"
           disabled={downloadingFiles.has(`${attachment.url}-${attachment.filename}`)}
         >
           {downloadingFiles.has(`${attachment.url}-${attachment.filename}`) ? (
             <SpinnerIcon className="w-4 h-4" />
           ) : (
             <DownloadIcon className="w-4 h-4" />
           )}
         </button>
      </div>
    );
  };

  if (!selectedContact) {
    if (isMobile) {
      return null;
    }
    
    return (
      <div className="relative flex-1 flex items-center justify-center bg-[#F7F7F7]">
        <div className="text-center max-w-[560px]">
          {/* WhatsApp Web Image */}
          <div className="w-[320px] h-[320px] mx-auto">
            <img 
              src={welcomeImg}
              alt="WhatsApp Web"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Title */}
          <h1 className="text-[32px] leading-[40px] font-light text-[#41525d] -mt-4">WhatsApp Business on Web</h1>
          
          {/* Description */}
          <p className="text-[#667781] text-[14px] leading-[20px] px-8 mt-4">
            Grow, organise and manage your business account
          </p>
                  </div>
         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center text-[#667781] text-[14px]">
           <LockIcon className="w-4 h-4 mr-2" />
           Your personal messages are end-to-end encrypted
         </div>
      </div>
    );
  }

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat Header */}
             <div className="bg-[#f0f2f5] px-4 py-2 lg:py-3 border-b border-[#e9edef] flex items-center justify-center space-x-3 flex-shrink-0">
          {isMobile && onBackToChats && (
           <button 
             onClick={onBackToChats}
             className="p-2 text-[#54656f] hover:bg-[#e5e7e9] rounded-full lg:hidden"
             title="Back to chats"
           >
             <BackIcon className="w-5 h-5" />
           </button>
         )}
        
        <div className="w-10 h-10 bg-[#ddd] rounded-full flex items-center justify-center">
          <span className="text-gray-600 font-medium text-sm">
            {getInitials(selectedContact.contactName)}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="font-normal text-[#111b21] text-[16px]">
            {selectedContact.contactName || `User ${selectedContact._id.substring(0, 8)}`}
          </h3>
          <p className="text-xs text-[#667781]">
            {selectedContact._id}
          </p>
        </div>
                 <div className="flex space-x-2">
           <button className="p-2 text-[#54656f] hover:bg-[#e5e7e9] rounded-full">
             <SearchIcon className="w-5 h-5" />
           </button>
           <button className="p-2 text-[#54656f] hover:bg-[#e5e7e9] rounded-full">
             <MoreIcon className="w-5 h-5" />
           </button>
         </div>
      </div>

      {/* Messages Area */}
      <div 
        className="flex-1 overflow-y-auto px-2 sm:px-4 lg:px-6 py-1 lg:py-4 min-h-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f0f2f5' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v-40c11.046 0 20 8.954 20 20z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundColor: '#efeae2'
        }}
      >
        {Object.keys(groupedMessages).length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No messages yet. Start a conversation!</p>
          </div>
        ) : (
          Object.entries(groupedMessages).map(([date, dayMessages]) => (
            <div key={date}>
              {/* Date Separator */}
              <div className="flex justify-center my-1 lg:my-4">
                <span className="bg-white px-3 py-1 rounded-lg text-xs text-gray-600 shadow-sm">
                  {date}
                </span>
              </div>

              {/* Messages for this date */}
              {dayMessages.map((message, index) => (
                <div
                  key={message._id || index}
                  className={`group flex mb-1 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="relative">
                    <div
                      className={`max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[480px] xl:max-w-[520px] px-3 py-2 rounded-lg shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-[#d9fdd3] text-[#111b21]'
                          : 'bg-white text-[#111b21]'
                      }`}
                      style={{
                        borderRadius: message.sender === 'user' 
                          ? '7.5px 7.5px 7.5px 7.5px' 
                          : '7.5px 7.5px 7.5px 7.5px'
                      }}
                    >
                      <p className="text-sm sm:text-[14.2px] leading-[19px] mb-1">{message.content}</p>
                      
                                             {message.attachments && message.attachments.length > 0 && (
                        <div className="mb-2 space-y-2">
                          {message.attachments.map((attachment, idx) => (
                            <div key={idx} className="attachment-container">
                              {renderAttachment(attachment)}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-end space-x-1">
                        <span className="text-[10px] sm:text-[11px] text-[#667781]">
                          {formatTime(message.timestamp)}
                        </span>
                        {message.sender === 'user' && (
                          <div className="ml-1">
                            {getStatusIcon(message.status)}
                          </div>
                        )}
                                                 
                         <DeleteDropdown  
                          onDelete={() => onDeleteMessage(message._id)}
                          type="message"
                          className=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

             <div className="bg-[#f0f2f5] px-4 py-3 border-t border-[#e9edef] flex-shrink-0">
        <MessageInput onSendMessage={onSendMessage} selectedContact={selectedContact} />
      </div>
    </div>
  );
};

export default ChatWindow;
