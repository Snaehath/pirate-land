import { LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

// custom
import ToolTip from "./tooltip";
import { Button } from "./ui/button";
import paraClient from "@/web3/para-client";
import { useAppContext } from "@/contexts/app";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const LogOutButton: React.FC = () => {
  // hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { setLoadingText, token, setToken, setUserId, setIsland } =
    useAppContext();
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
      setIsland!("");

      setLoadingText!(undefined);

      navigate("/");
      toast({
        title: "The seas await yer return!",
      });
    } catch {
      setLoadingText!(undefined);
      toast({
        title: "⚠️ Arrr! The Anchor Be Stuck! 🏴‍☠️",
        description:
          "Trouble leavin' the ship, Captain! Try again or check yer connection!",
        variant: "destructive",
      });
    }
  };

  return location?.pathname === "/" ? undefined : (
    <AlertDialog>
      <ToolTip
        content="Set Sail Away"
        hideOnMobile
      >
        <AlertDialogTrigger>
          <Button size="icon">
            <LogOut />
          </Button>
        </AlertDialogTrigger>
      </ToolTip>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-pirate-kids">Set Sail to Log Out?</AlertDialogTitle>
          <AlertDialogDescription className="font-pirate-kids">
            Are you sure you want to log out, Captain? Your adventure will be
            paused until you return!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="font-pirate-kids">Stay Aboard! 🏴‍☠️</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleLogout}
            className="font-pirate-kids"
          >
            Aye, Log Out! ⚓
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogOutButton;
