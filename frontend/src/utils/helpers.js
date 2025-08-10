export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  
  return isToday 
    ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const isYesterday = new Date(now - 86400000).toDateString() === date.toDateString();
  
  if (isToday) return 'Today';
  if (isYesterday) return 'Yesterday';
  
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

export const truncateMessage = (message, maxLength = 40) => {
  if (!message || message.length <= maxLength) return message;
  return message.substring(0, maxLength) + '...';
};

export const getInitials = (name) => {
  if (!name) return 'U';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

export const groupMessagesByDate = (messages) => {
  const grouped = {};
  
  messages.forEach(message => {
    const dateKey = formatDate(message.timestamp);
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(message);
  });
  
  return grouped;
};
