import { Tabs, Tab } from "@heroui/react";
import { DiamondIcon, SettingsIcon, KeyRoundIcon, EyeIcon, Trash2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDiamondRingSelection } from "@/hooks/useDiamondRingSelection";

export default function SelectionNavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Hook for managing selection
  const {
    diamond,
    setting,
    removeDiamondSelection,
    removeSettingSelection,
  } = useDiamondRingSelection();

  // ✅ Detect active route
  const activeTab =
    location.pathname.includes("/settings")
      ? "setting"
      : location.pathname.includes("/ring")
      ? "ring"
      : "diamond";

  // ✅ Navigate between tabs
  const handleTabChange = (key: string) => {
    if (key === "diamond") navigate("/diamonds");
    if (key === "setting") navigate("/settings");
    if (key === "ring") navigate("/ring");
  };

  // ✅ Handle view
  const handleView = (key: "diamond" | "setting") => {
    if (key === "diamond" && diamond) navigate(`/diamonds/${diamond?.id}`);
    if (key === "setting" && setting) navigate(`/settings/${setting?.id}`);
  };

  // ✅ Handle remove
  const handleRemove = (key: "diamond" | "setting") => {
    if (key === "diamond") removeDiamondSelection();
    else removeSettingSelection();
  };

  return (
    <div className="flex justify-center w-full bg-white py-4 border-b sticky top-0 z-20">
      <div className="w-full sm:w-1/2">
        <Tabs
          selectedKey={activeTab}
          onSelectionChange={(key) => handleTabChange(String(key))}
          size="lg"
          aria-label="Selection Navigation"
          color="primary"
          variant="bordered"
          fullWidth
        >
          {/* 💎 Diamond Tab */}
          <Tab
            key="diamond"
            title={
              <div className="flex items-center justify-center gap-2">
                <DiamondIcon size={18} />
                <span>Diamond</span>
                {diamond && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove("diamond");
                      }}
                      className="text-red-500 hover:text-red-700"
                      title="Remove Diamond"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            }
          />

          {/* ⚙️ Setting Tab */}
          <Tab
            key="setting"
            title={
              <div className="flex items-center justify-center gap-2">
                <SettingsIcon size={18} />
                <span>Setting</span>
                {setting && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove("setting");
                      }}
                      className="text-red-500 hover:text-red-700"
                      title="Remove Setting"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            }
          />

          {/* 💍 Ring Tab */}
          <Tab
            key="ring"
            title={
              <div className="flex items-center justify-center gap-2">
                <KeyRoundIcon size={18} />
                <span>Ring</span>
              </div>
            }
          />
        </Tabs>
      </div>
    </div>
  );
}
