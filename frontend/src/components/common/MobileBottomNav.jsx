import React from 'react';
import { COLORS, TABS } from '../../utils/constants';
import { StatusIcon } from '../../assets/icons.jsx';
import { GrGroup } from "react-icons/gr";
import { SiGooglemessages } from "react-icons/si";
import { MdStoreMallDirectory } from "react-icons/md";

const MobileBottomNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    {
      id: TABS.CHATS,
      title: 'Chats',
      icon: SiGooglemessages
    },
    {
      id: TABS.STATUS,
      title: 'Status',
      icon: StatusIcon
    },
    {
      id: TABS.COMMUNITIES,
      title: 'Communities',
      icon: GrGroup
    },
    {
      id: TABS.TOOLS,
      title: 'Tools',
      icon: MdStoreMallDirectory
    }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#e9edef] px-2 py-1 z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === item.id
                ? `text-[${COLORS.primary}]`
                : `text-[${COLORS.textSecondary}]`
            }`}
            title={item.title}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;
