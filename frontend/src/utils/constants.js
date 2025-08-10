export const COLORS = {
  // Primary Colors
  primary: '#00a884',
  primaryHover: '#00926f',
  
  // Background Colors
  background: '#fffaf5',
  sidebarBg: '#f7f7f8',
  headerBg: '#f0f2f5',
  searchBg: '#f0f2f5',
  white: '#ffffff',
  
  // Border Colors
  border: '#e9edef',
  
  // Interactive States
  activeBg: '#e9edef',
  hoverBg: '#e5e7e9',
  
  // Text Colors
  textPrimary: '#111b21',
  textSecondary: '#54656f',
  textMuted: '#667781',
  textLight: '#3b4a54',
  
  // Message Bubble Colors
  messageSent: '#d9fdd3',
  messageReceived: '#ffffff',
  
  // Status Colors
  error: '#dc3545',
  errorBg: '#f8d7da',
  success: '#28a745'
};

export const TABS = {
  CHATS: 'chats',
  STATUS: 'status',
  COMMUNITIES: 'communities',
  STARRED: 'starred',
  TOOLS: 'tools',
  SETTINGS: 'settings',
  PROFILE: 'profile'
};

export const API_ENDPOINTS = {
  MESSAGES: '/api/webhook/messages',
  CONVERSATIONS: '/api/webhook/conversations',
  PROCESS_PAYLOADS: '/api/webhook/process-payloads',
  DELETE_MESSAGE: '/api/webhook/messages',
  DELETE_CONVERSATION: '/api/webhook/conversations'
};

export const ICON_PATHS = {
  status: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L19 5V9C19 10.1 18.1 11 17 11H15L13.5 7.5C13.1 6.6 12.2 6 11.2 6H4.8C3.8 6 2.9 6.6 2.5 7.5L1 11H3C4.1 11 5 10.1 5 9V5L3 7V9H1C.4 9 0 8.6 0 8V7C0 6.4.4 6 1 6H2L4 4H20L22 6H23C23.6 6 24 6.4 24 7V8C24 8.6 23.6 9 23 9H21Z",
  communities: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  starred: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  archived: "M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z",
  settings: "M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z",
  profile: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
  menu: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
};

export const LAYOUT = {
  SIDEBAR_WIDTH: 'w-16',
  CHAT_LIST_WIDTH: 'w-[400px]',
  LOADING_DELAY: 3000,
  MOBILE_BOTTOM_NAV_HEIGHT: 'h-16'
};

export const BREAKPOINTS = {
  MOBILE: 'md:hidden',
  TABLET: 'md:flex lg:hidden', 
  DESKTOP: 'lg:flex',
  MOBILE_ONLY: 'block md:hidden',
  TABLET_UP: 'hidden md:block',
  DESKTOP_ONLY: 'hidden lg:block'
};

export const MESSAGE_STATUS = {
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read'
};
