import React, { useState } from 'react';
import { formatTime, truncateMessage, getInitials } from '../utils/helpers';
import { COLORS, ICON_PATHS, LAYOUT } from '../utils/constants';
import DeleteDropdown from './common/DeleteDropdown';
import { 
  AddIcon, 
  MoreIcon, 
  SearchIcon 
} from '../assets/icons.jsx';

const ChatList = ({ conversations, selectedContact, onContactSelect, onDeleteConversation }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const getFilteredConversations = () => {
    switch (activeFilter) {
      case 'unread':
        return conversations.filter(conv => 
          conv.lastMessage?.sender === 'contact' && selectedContact?._id !== conv._id
        );
      case 'favourites':
        return []; // No favourites data yet
      case 'groups':
        return []; // No groups data yet
      default:
        return conversations;
    }
  };

  const filteredConversations = getFilteredConversations();

  return (
    <div className={`w-full lg:w-[400px] bg-white border-r border-[${COLORS.border}] flex flex-col h-full`}>
      {/* WhatsApp Header */}
      <div className={`bg-[${COLORS.headerBg}] text-[${COLORS.textLight}] p-4 flex items-center justify-between border-b border-[${COLORS.border}]`}>
        <h1 className={`text-xl font-bold text-[${COLORS.textPrimary}]`}>WhatsApp</h1>
        <div className="flex items-center space-x-2">
          <button className={`p-2 hover:bg-[${COLORS.hoverBg}] rounded-full text-[${COLORS.textSecondary}]`}>
            <AddIcon className="w-5 h-5" />
          </button>
          <button className={`p-2 hover:bg-[${COLORS.hoverBg}] rounded-full text-[${COLORS.textSecondary}]`}>
            <MoreIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-3 bg-white">
        <div className={`bg-[${COLORS.searchBg}] rounded-lg px-4 py-2 flex items-center space-x-3`}>
          <SearchIcon className="w-4 h-4 text-gray-500" />
          <span className="text-gray-500 text-sm">Search or start new chat</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-3 pb-2 bg-white">
        <div className="flex space-x-4">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
              activeFilter === 'all' 
                ? 'text-[#00a884] border-[#00a884]' 
                : 'text-gray-600 border-transparent'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveFilter('unread')}
            className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
              activeFilter === 'unread' 
                ? 'text-[#00a884] border-[#00a884]' 
                : 'text-gray-600 border-transparent'
            }`}
          >
            Unread
          </button>
          <button 
            onClick={() => setActiveFilter('favourites')}
            className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
              activeFilter === 'favourites' 
                ? 'text-[#00a884] border-[#00a884]' 
                : 'text-gray-600 border-transparent'
            }`}
          >
            Favourites
          </button>
          <button 
            onClick={() => setActiveFilter('groups')}
            className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
              activeFilter === 'groups' 
                ? 'text-[#00a884] border-[#00a884]' 
                : 'text-gray-600 border-transparent'
            }`}
          >
            Groups
          </button>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p>
              {activeFilter === 'unread' && 'No unread conversations'}
              {activeFilter === 'favourites' && 'No favourite conversations'}
              {activeFilter === 'groups' && 'No group conversations'}
              {activeFilter === 'all' && conversations.length === 0 && 'No conversations found'}
            </p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <div
              key={conversation._id}
              className={`group flex items-center p-3 hover:bg-[#f5f6f6] cursor-pointer transition-colors duration-150 ${
                selectedContact?._id === conversation._id ? 'bg-[#e9edee]' : ''
              }`}
            >
              <div 
                onClick={() => onContactSelect(conversation)}
                className="flex items-center flex-1 min-w-0"
              >
                {/* Avatar */}
                <div className="w-12 h-12 bg-[#ddd] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-gray-600 font-medium text-sm">
                    {getInitials(conversation.contactName)}
                  </span>
                </div>

                {/* Contact Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-normal text-[#111b21] text-[17px] truncate">
                      {conversation.contactName || `User ${conversation._id.substring(0, 8)}`}
                    </h3>
                    <span className="text-xs text-[#667781] ml-2 flex-shrink-0">
                      {formatTime(conversation.lastMessage?.timestamp)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-[#667781] truncate">
                      {conversation.lastMessage?.sender === 'user' && (
                        <span className="text-[#667781]">You: </span>
                      )}
                      {truncateMessage(conversation.lastMessage?.content || 'No messages yet')}
                    </p>
                    
                    {/* Only show unread count if last message is from contact and unread */}
                    {conversation.lastMessage?.sender === 'contact' && selectedContact?._id !== conversation._id && (
                      <span className="bg-[#00a884] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2 flex-shrink-0">
                        1
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Delete Dropdown */}
              <DeleteDropdown 
                onDelete={() => onDeleteConversation(conversation._id)}
                type="chat"
                className="ml-2 flex-shrink-0"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;