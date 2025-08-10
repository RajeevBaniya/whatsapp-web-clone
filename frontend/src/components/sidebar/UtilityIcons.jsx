import { MdStoreMallDirectory } from "react-icons/md";
import IconButton from "../common/IconButton";
import { TABS } from '../../utils/constants';

const UtilityIcons = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-col space-y-4 mt-8">
      <IconButton
        icon={MdStoreMallDirectory}
        title="Tools"
        isActive={activeTab === TABS.TOOLS}
        onClick={() => setActiveTab(TABS.TOOLS)}
      />
    </div>
  );
};

export default UtilityIcons;
