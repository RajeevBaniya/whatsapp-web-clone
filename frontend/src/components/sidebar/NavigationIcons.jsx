import SvgIconButton from "../common/SvgIconButton";
import { TABS } from '../../utils/constants';
import { 
  StatusIcon
} from '../../assets/icons.jsx';
import { GrGroup } from "react-icons/gr";
import { SiGooglemessages } from "react-icons/si";
import { LuMessageCircleCode } from "react-icons/lu";

const NavigationIcons = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-col space-y-6">
      <SvgIconButton
        title="Chats"
        isActive={activeTab === TABS.CHATS}
        onClick={() => setActiveTab(TABS.CHATS)}
      >
        <SiGooglemessages className="w-6 h-6" />
      </SvgIconButton>
      
      <SvgIconButton
        title="Status"
        isActive={activeTab === TABS.STATUS}
        onClick={() => setActiveTab(TABS.STATUS)}
      >
        <StatusIcon className="w-6 h-6" />
      </SvgIconButton>

      <SvgIconButton
        title="Communities"
        isActive={activeTab === TABS.COMMUNITIES}
        onClick={() => setActiveTab(TABS.COMMUNITIES)}
      >
        <GrGroup className="w-6 h-6" />
      </SvgIconButton>

      {/* Desktop-only icon */}
      <div className="hidden lg:block">
        <SvgIconButton
          title="Message Circle Code"
          isActive={false}
          onClick={() => {}}
        >
          <LuMessageCircleCode className="w-6 h-6" />
        </SvgIconButton>
      </div>
    </div>
  );
};

export default NavigationIcons;
