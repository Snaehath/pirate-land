import { Ban, Flag, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

// custom
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Island } from "@/lib/types";
import { useAppContext } from "@/contexts/app";
import { useSocketContext } from "@/contexts/socket";

const StopGame: React.FC<StopGameProperties> = ({
  islandInfo,
  isIslandCreator,
  fromReady,
  fromStarted,
}) => {
  // hooks
  const navigate = useNavigate();
  const { socket } = useSocketContext();
  const { token, setLoadingText, setIsland } = useAppContext();

  // states
  const [open, setOpen] = useState<boolean>(false);

  const handleEndVoyage = async () => {
    if (token.length === 0 || islandInfo === undefined || socket === undefined)
      return;

    try {
      setLoadingText!(
        "Preparing the Escape Boat... 🚣‍♂️ Hold tight while we navigate your way out! 🏴‍☠️"
      );

      await axios.put(`/islands/end-voyage/${islandInfo.id}`, undefined, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLoadingText!(undefined);
      setIsland!("");
      socket.emit("leaveRoom", islandInfo.id);
      navigate("/harbor");
    } catch {
      setLoadingText!(undefined);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialogTrigger asChild>
        <Button
          className="font-pirate-kids"
          variant="neutral"
        >
          {fromReady ? <LogOut /> : <Ban />}
          {fromReady ? "Leave Island" : "End Voyage"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {islandInfo !== undefined && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-pirate-kids">
                Drop Anchor?
              </AlertDialogTitle>
              <AlertDialogDescription className="font-pirate-kids">
                {fromReady || fromStarted ? "⚠️ Deserting the Ship! Leaving now will count as a lost battle—are you sure you want to abandon the fight? 🏴‍☠️⚔️" : (isIslandCreator && islandInfo.invitee !== null
                  ? "⚠️ Coward's Retreat! Stopping the game after a player joins will count as a loss—looks like you feared the challenge! 🏴‍☠️😨"
                  : "Are you sure you want to stop the game? Your progress might be lost!")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="font-pirate-kids">
                <Flag />
                Keep Sailing!
              </AlertDialogCancel>
              <Button
                onClick={handleEndVoyage}
                className="font-pirate-kids"
              >
                <Ban />
                {fromReady ? "Leave Game!" : "Aye, Stop Game!"}
              </Button>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StopGame;

interface StopGameProperties {
  islandInfo: Island | undefined;
  isIslandCreator: boolean;
  fromReady?: boolean;
  fromStarted?: boolean;
}
