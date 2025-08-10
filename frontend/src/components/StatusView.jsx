import React from 'react';
import { COLORS } from '../utils/constants';
import { 
  BackIcon, 
  StatusAddIcon, 
  PlusIcon, 
  MoreIcon,
  LockIcon 
} from '../assets/icons.jsx';
import { StatusIcon } from '../assets/icons.jsx';

const StatusView = ({ onBackToChats, isMobile = false }) => {
  const statusUpdates = [];

  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      {/* Status List - Left Side */}
      <div className="w-full lg:w-[400px] bg-white border-r border-[#e9edef] flex flex-col">
        {/* Header */}
        <div className="bg-[#f0f2f5] px-4 py-3 border-b border-[#e9edef] flex items-center space-x-3">
          {/* Back button for mobile */}
          {isMobile && onBackToChats && (
            <button 
              onClick={onBackToChats}
              className="p-2 text-[#54656f] hover:bg-[#e5e7e9] rounded-full lg:hidden"
              title="Back to chats"
            >
              <BackIcon className="w-5 h-5" />
            </button>
          )}
          
          <h1 className="text-xl font-bold text-[#111b21]">Status</h1>
          
          <div className="flex-1"></div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-[#e5e7e9] rounded-full text-[#54656f]">
              <StatusAddIcon className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-[#e5e7e9] rounded-full text-[#54656f]">
              <MoreIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* My Status */}
        <div className="p-4">
          <div className="flex items-center space-x-3 p-3 hover:bg-[#f5f6f6] rounded-lg cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 bg-[#ddd] rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium text-sm">You</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#25d366] rounded-full flex items-center justify-center border-2 border-white">
                <PlusIcon className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-[#111b21]">My status</h3>
              <p className="text-sm text-[#667781]">Click to add status update</p>
            </div>
          </div>
        </div>



        {/* Status List */}
        <div className="flex-1 overflow-y-auto">
          {statusUpdates.map((status) => (
            <div key={status.id} className="flex items-center space-x-3 p-4 hover:bg-[#f5f6f6] cursor-pointer">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                status.hasViewed ? 'border-[#ddd]' : 'border-[#25d366]'
              }`}>
                <div className="w-10 h-10 bg-[#ddd] rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium text-xs">{status.avatar}</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-normal text-[#111b21]">{status.name}</h3>
                <p className="text-sm text-[#667781]">{status.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Content - Right Side (Desktop Only) */}
      <div className="hidden lg:flex flex-1 flex-col bg-[#F7F7F7]">
        {/* Main content - centered */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-[400px]">
            {/* Status Icon */}
            <div className="w-32 h-32 mx-auto mb-8 text-[#54656f] opacity-30">
              <StatusIcon className="w-full h-full" />
            </div>

            {/* Title */}
            <h1 className="text-[32px] leading-[40px] font-light text-[#41525d] mb-4">Share status updates</h1>
            
            {/* Description */}
            <p className="text-[#667781] text-[14px] leading-[20px] px-8">
              Share photos, videos and text that disappear after 24 hours.
            </p>
          </div>
        </div>

        {/* End-to-end encrypted text - at bottom */}
        <div className="flex items-center justify-center text-[#667781] text-sm pb-8">
          <LockIcon className="w-4 h-4 mr-2" />
          Your status updates are end-to-end encrypted
        </div>
      </div>
    </div>
  );
};

export default StatusView;
