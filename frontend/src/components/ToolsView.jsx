import React from 'react';
import { COLORS } from '../utils/constants';
import whatsappImage from '../assets/images/whatsapp_image.png';
import { 
  BackIcon, 
  MoreIcon, 
  StoreIcon, 
  GridIcon, 
  MegaphoneIcon, 
  LightningIcon, 
  LabelIcon, 
  HelpIcon,
  LockIcon 
} from '../assets/icons.jsx';

const ToolsView = ({ onBackToChats, isMobile = false }) => {
  const businessTools = [
    {
      id: 1,
      title: "Business profile",
      description: "Manage address, hours and website",
      icon: StoreIcon
    },
    {
      id: 2,
      title: "Catalog",
      description: "Show products and services",
      icon: GridIcon
    }
  ];

  const reachMoreCustomers = [
    {
      id: 3,
      title: "Advertise",
      description: "Create ads that lead to WhatsApp",
      icon: MegaphoneIcon
    }
  ];

  const messaging = [
    {
      id: 4,
      title: "Quick replies",
      description: "Reuse frequent messages",
      icon: LightningIcon
    },
    {
      id: 5,
      title: "Labels",
      description: "Organise chats and customers",
      icon: LabelIcon
    }
  ];

  const help = [
    {
      id: 6,
      title: "Business help center",
      description: "Get help, contact us",
      icon: HelpIcon
    }
  ];

  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      {/* Tools List - Left Side */}
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
          
          <h1 className="text-xl font-bold text-[#111b21]">Business tools</h1>
          
          <div className="flex-1"></div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-[#e5e7e9] rounded-full text-[#54656f]">
              <MoreIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tools Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {/* Business tools section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[#00a884] mb-3">Business tools</h3>
            <div className="space-y-1">
              {businessTools.map((tool) => (
                <div key={tool.id} className="flex items-center space-x-3 p-3 hover:bg-[#f5f6f6] rounded-lg cursor-pointer">
                  <div className="w-8 h-8 flex items-center justify-center text-[#54656f]">
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-normal text-[#111b21]">{tool.title}</h4>
                    <p className="text-sm text-[#667781]">{tool.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reach more customers section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[#00a884] mb-3">Reach more customers</h3>
            <div className="space-y-1">
              {reachMoreCustomers.map((tool) => (
                <div key={tool.id} className="flex items-center space-x-3 p-3 hover:bg-[#f5f6f6] rounded-lg cursor-pointer">
                  <div className="w-8 h-8 flex items-center justify-center text-[#54656f]">
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-normal text-[#111b21]">{tool.title}</h4>
                    <p className="text-sm text-[#667781]">{tool.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Messaging section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[#00a884] mb-3">Messaging</h3>
            <div className="space-y-1">
              {messaging.map((tool) => (
                <div key={tool.id} className="flex items-center space-x-3 p-3 hover:bg-[#f5f6f6] rounded-lg cursor-pointer">
                  <div className="w-8 h-8 flex items-center justify-center text-[#54656f]">
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-normal text-[#111b21]">{tool.title}</h4>
                    <p className="text-sm text-[#667781]">{tool.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Help section */}
          <div className="mb-6">
            <div className="space-y-1">
              {help.map((tool) => (
                <div key={tool.id} className="flex items-center space-x-3 p-3 hover:bg-[#f5f6f6] rounded-lg cursor-pointer">
                  <div className="w-8 h-8 flex items-center justify-center text-[#54656f]">
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-normal text-[#111b21]">{tool.title}</h4>
                    <p className="text-sm text-[#667781]">{tool.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tools Content - Right Side (Desktop Only) */}
      <div className="hidden lg:flex flex-1 flex-col bg-[#F7F7F7]">
        {/* Main content - centered */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-[560px]">
            {/* WhatsApp Business Image */}
            <div className="w-[320px] h-[320px] mx-auto mb-8 flex items-center justify-center">
              <img 
                src={whatsappImage} 
                alt="WhatsApp Business" 
                className="w-full h-full object-contain"
              />
            </div>

            {/* Title */}
            <h1 className="text-[32px] leading-[40px] font-light text-[#41525d] -mt-4">WhatsApp Business on Web</h1>
            
            {/* Description */}
            <p className="text-[#667781] text-[14px] leading-[20px] px-8 mt-4">
              Grow, organise and manage your business account.
            </p>
          </div>
        </div>

        {/* End-to-end encrypted text - at bottom */}
        <div className="flex items-center justify-center text-[#667781] text-sm pb-8">
          <LockIcon className="w-4 h-4 mr-2" />
          Your personal messages are end-to-end encrypted
        </div>
      </div>
    </div>
  );
};

export default ToolsView;
