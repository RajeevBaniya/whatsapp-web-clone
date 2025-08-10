import { COLORS } from '../../utils/constants';

const IconButton = ({ 
  icon: Icon, 
  title, 
  isActive, 
  onClick, 
  className = "" 
}) => {
  const baseClasses = "w-10 h-10 rounded-lg flex items-center justify-center transition-colors";
  const stateClasses = isActive 
    ? "bg-[#e9edef] shadow-sm" 
    : "hover:bg-[#e9edef] hover:shadow-sm";
  const iconColor = isActive ? "text-[#00a884]" : "text-[#54656f]";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${stateClasses} ${className}`}
      title={title}
    >
      <Icon className={`w-6 h-6 ${iconColor}`} />
    </button>
  );
};

export default IconButton;
