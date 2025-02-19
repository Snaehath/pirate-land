import { LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

// custom
import ToolTip from "./tooltip";
import { Button } from "./ui/button";
import paraClient from "@/web3/para-client";
import { useAppContext } from "@/contexts/app";
import { useToast } from "@/hooks/use-toast";

const LogOutButton: React.FC = () => {
  // hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { setLoadingText, token, setToken, setUserId } = useAppContext();
  const { toast } = useToast();

  const handleLogout = async () => {

    try {
      setLoadingText!("Sailing Away... 'Til We Meet Again! 🚢☠️");
      
      await paraClient.logout();
      await axios.delete("/auth/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setToken!("");
      setUserId!("");

      setLoadingText!(undefined);

      navigate("/");
      toast({
        title: "The seas await yer return!",
      });
    } catch  {
      setLoadingText!(undefined);
      toast({
        title: "⚠️ Arrr! The Anchor Be Stuck! 🏴‍☠️",
        description: "Trouble leavin' the ship, Captain! Try again or check yer connection!",
        variant: "destructive",
      });
    };
  };

  return location?.pathname === "/" ? undefined : (
    <ToolTip
      content="Set Sail Away"
      hideOnMobile
    >
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
