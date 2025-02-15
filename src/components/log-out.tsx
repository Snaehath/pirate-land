import { LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

// custom
import ToolTip from "./tooltip";
import { Button } from "./ui/button";

const LogOutButton: React.FC = () => {
  // hooks
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/");
  };

  return location?.pathname === "/" ? undefined : (
    <ToolTip content="Set Sail Away">
      <Button
        size="icon"
        onClick={handleLogout}
      >
        <LogOut />
      </Button>
    </ToolTip>
  );
};

export default LogOutButton;
