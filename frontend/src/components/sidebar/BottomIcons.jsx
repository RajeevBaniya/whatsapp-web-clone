import SvgIconButton from "../common/SvgIconButton";
import { SettingsIcon, ProfileIcon } from '../../assets/icons.jsx';

const BottomIcons = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-col space-y-4 pb-4">
      <SvgIconButton
        title="Settings"
        isActive={activeTab === 'settings'}
        onClick={() => setActiveTab('settings')}
        size="w-5 h-5"
      >
        <SettingsIcon className="w-5 h-5" />
      </SvgIconButton>

      <SvgIconButton
        title="Profile"
        isActive={activeTab === 'profile'}
        onClick={() => setActiveTab('profile')}
        size="w-5 h-5"
      >
        <ProfileIcon className="w-5 h-5" />
      </SvgIconButton>
    </div>
  );
};

export default BottomIcons;
