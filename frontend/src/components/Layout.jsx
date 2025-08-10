import { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import MobileBottomNav from './common/MobileBottomNav';
import { COLORS } from '../utils/constants';

const Layout = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className={`h-screen bg-white lg:bg-[${COLORS.background}] flex flex-col lg:flex-row`}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex mb-20 lg:mb-0 min-h-0">
        {children}
      </div>
      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Layout;