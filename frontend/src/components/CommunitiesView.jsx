import React from 'react';
import { COLORS } from '../utils/constants';
import { 
  BackIcon, 
  MoreIcon, 
  LockIcon 
} from '../assets/icons.jsx';
import { GrGroup } from "react-icons/gr";

const CommunitiesView = ({ onBackToChats, isMobile = false }) => {
  const communities = [];

  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      {/* Communities List - Left Side */}
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
          
          <h1 className="text-xl font-bold text-[#111b21]">Communities</h1>
          
          <div className="flex-1"></div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-[#e5e7e9] rounded-full text-[#54656f]">
              <MoreIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Communities List Content */}
        <div className="flex-1 overflow-y-auto">
          {communities.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p>No communities found</p>
            </div>
          ) : (
            communities.map((community) => (
              <div key={community.id} className="flex items-center space-x-3 p-4 hover:bg-[#f5f6f6] cursor-pointer">
                {/* Community logic here when data is available */}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Communities Content - Right Side (Desktop Only) */}
      <div className="hidden lg:flex flex-1 flex-col bg-[#F7F7F7]">
        {/* Main content - centered */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-[400px]">
            {/* Communities Icon */}
            <div className="w-32 h-32 mx-auto mb-8 text-[#54656f] opacity-30">
              <GrGroup className="w-full h-full" />
            </div>

            <h1 className="text-[32px] leading-[40px] font-light text-[#41525d] mb-4">Create communities</h1>
            
            <p className="text-[#667781] text-[14px] leading-[20px] px-8">
              Bring members together in topic-based groups and easily send them admin announcements.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center text-[#667781] text-sm pb-8">
          <LockIcon className="w-4 h-4 mr-2" />
          Your personal messages in communities are end-to-end encrypted
        </div>
      </div>
    </div>
  );
};

export default CommunitiesView;
