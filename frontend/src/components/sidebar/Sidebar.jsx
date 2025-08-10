import NavigationIcons from "./NavigationIcons";
import UtilityIcons from "./UtilityIcons";
import BottomIcons from "./BottomIcons";
import { COLORS, LAYOUT } from '../../utils/constants';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className={`hidden lg:flex ${LAYOUT.SIDEBAR_WIDTH} bg-[#f7f7f8] border-r border-[#e9edef] flex-col items-center py-4`}>
      <NavigationIcons activeTab={activeTab} setActiveTab={setActiveTab} />
      <UtilityIcons activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1"></div>
      <BottomIcons activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Sidebar;
