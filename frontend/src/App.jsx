import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import StatusView from './components/StatusView';
import CommunitiesView from './components/CommunitiesView';
import ToolsView from './components/ToolsView';
import MobileBottomNav from './components/common/MobileBottomNav';
import { chatAPI } from './services/api';
import { LAYOUT, COLORS, TABS } from './utils/constants';
import { LockIcon } from './assets/icons.jsx';
import { FaWhatsapp } from "react-icons/fa";

const App = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS.CHATS);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      loadConversations();
    }, LAYOUT.LOADING_DELAY);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (selectedContact) {
      loadMessages(selectedContact._id);
    }
  }, [selectedContact]);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const response = await chatAPI.getConversations();
      
      if (response.success && response.conversations) {
        setConversations(response.conversations);
        setError(null);
      } else {
        setError('Failed to load conversations');
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
      setError('Failed to connect to server. Make sure your backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (wa_id) => {
    try {
      const response = await chatAPI.getMessages(wa_id);
      
      if (response.success && response.messages) {
        const sortedMessages = response.messages.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
        setMessages(sortedMessages);
        setError(null);
      } else {
        setError('Failed to load messages');
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      setError('Failed to load messages');
    }
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setIsMobileView(true);
  };

  const handleBackToChats = () => {
    setIsMobileView(false);
    setSelectedContact(null);
    setActiveTab(TABS.CHATS);
  };

  const handleSendMessage = async (messageData) => {
    try {
      const tempMessage = {
        _id: `temp_${Date.now()}`,
        ...messageData,
        timestamp: new Date().toISOString(),
        sender: 'user',
        status: 'sent'
      };

      setMessages(prevMessages => [...prevMessages, tempMessage]);

      const response = await chatAPI.sendMessage(messageData);

      if (response.success) {
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg._id === tempMessage._id ? response.message : msg
          )
        );

        const messageId = response.message._id;
        
        setTimeout(async () => {
          setMessages(prevMessages => 
            prevMessages.map(msg => 
              msg._id === messageId ? { ...msg, status: 'delivered' } : msg
            )
          );
          try {
            await chatAPI.updateMessageStatus(messageId, 'delivered');
          } catch (error) {
            console.error('Failed to update status to delivered:', error);
          }
        }, 2000);

        setTimeout(async () => {
          setMessages(prevMessages => 
            prevMessages.map(msg => 
              msg._id === messageId ? { ...msg, status: 'read' } : msg
            )
          );
          try {
            await chatAPI.updateMessageStatus(messageId, 'read');
          } catch (error) {
            console.error('Failed to update status to read:', error);
          }
        }, 5000);
        setError(null);
      } else {
        // Remove temp message on error
        setMessages(prevMessages => 
          prevMessages.filter(msg => msg._id !== tempMessage._id)
        );
        setError('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Remove temp message on error
      setMessages(prevMessages => 
        prevMessages.filter(msg => msg._id.startsWith('temp_'))
      );
      setError('Failed to send message');
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await chatAPI.deleteMessage(messageId);
      
      if (response.success) {
        // Remove message from UI
        setMessages(prevMessages => 
          prevMessages.filter(msg => msg._id !== messageId)
        );
      } else {
        setError('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      setError('Failed to delete message');
    }
  };

  const handleDeleteConversation = async (waId) => {
    try {
      const response = await chatAPI.deleteConversation(waId);
      
      if (response.success) {
        // Remove conversation from list
        setConversations(prevConversations => 
          prevConversations.filter(conv => conv._id !== waId)
        );
        
        // Clear messages if this conversation was selected
        if (selectedContact && selectedContact._id === waId) {
          setSelectedContact(null);
          setMessages([]);
        }
      } else {
        setError('Failed to delete conversation');
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
      setError('Failed to delete conversation');
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-[#f0f2f5] flex items-center justify-center">
        <div className="text-center">
          {/* WhatsApp Logo */}
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-8">
            <FaWhatsapp className="w-12 h-12 text-gray-500" />
          </div>

          {/* WhatsApp Title */}
          <h1 className="text-3xl font-light text-[#41525d] mb-8">WhatsApp</h1>

          {/* Progress Bar */}
          <div className="w-60 h-1 bg-gray-300 rounded-full mx-auto mb-16 overflow-hidden">
            <div 
              className="h-full bg-[#00a884] rounded-full"
              style={{
                animation: 'progressBar 3s ease-out forwards'
              }}
            ></div>
          </div>

          {/* End-to-end encrypted text */}
          <div className="flex items-center justify-center text-[#667781] text-sm">
            <LockIcon className="w-4 h-4 mr-2" />
            End-to-end encrypted
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p className="font-medium">Connection Error</p>
              <p className="text-sm">{error}</p>
            </div>
            <button 
              onClick={loadConversations}
              className="bg-[#00a884] text-white px-6 py-2 rounded-lg hover:bg-[#00926f] transition-colors"
            >
              Retry
            </button>
            <div className="mt-4 text-sm text-gray-600">
              <p>Make sure your backend server is running on port 5000</p>
              <p className="font-mono text-xs mt-1">npm start (in backend folder)</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const renderMobileContent = () => {
    if (activeTab === TABS.STATUS) {
      return (
        <StatusView 
          onBackToChats={handleBackToChats}
          isMobile={true}
        />
      );
    }
    
    if (activeTab === TABS.COMMUNITIES) {
      return (
        <CommunitiesView 
          onBackToChats={handleBackToChats}
          isMobile={true}
        />
      );
    }
    
    if (activeTab === TABS.TOOLS) {
      return (
        <ToolsView 
          onBackToChats={handleBackToChats}
          isMobile={true}
        />
      );
    }
    
    // Default to chats
    if (!isMobileView || !selectedContact) {
      return (
        <ChatList 
          conversations={conversations}
          selectedContact={selectedContact}
          onContactSelect={handleContactSelect}
          onDeleteConversation={handleDeleteConversation}
        />
      );
    }
    
    return (
      <ChatWindow 
        selectedContact={selectedContact}
        messages={messages}
        onSendMessage={handleSendMessage}
        onDeleteMessage={handleDeleteMessage}
        onBackToChats={handleBackToChats}
        isMobile={true}
      />
    );
  };

  const renderDesktopContent = () => {
    if (activeTab === TABS.STATUS) {
      return <StatusView isMobile={false} />;
    }
    
    if (activeTab === TABS.COMMUNITIES) {
      return <CommunitiesView isMobile={false} />;
    }
    
    if (activeTab === TABS.TOOLS) {
      return <ToolsView isMobile={false} />;
    }
    
    // Default to chats
    return (
      <>
        <ChatList 
          conversations={conversations}
          selectedContact={selectedContact}
          onContactSelect={handleContactSelect}
          onDeleteConversation={handleDeleteConversation}
        />
        <ChatWindow 
          selectedContact={selectedContact}
          messages={messages}
          onSendMessage={handleSendMessage}
          onDeleteMessage={handleDeleteMessage}
          isMobile={false}
        />
      </>
    );
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {/* Mobile/Tablet: Show different views based on tab */}
      <div className="lg:hidden w-full">
        {renderMobileContent()}
      </div>

      {/* Desktop: Show different views based on tab */}
      <div className="hidden lg:flex w-full">
        {renderDesktopContent()}
      </div>
    </Layout>
  );
};

export default App;