import { Ban, Flag } from "lucide-react";

// custom
import { Button } from "../ui/button";
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
} from "../ui/alert-dialog";

const StopGame: React.FC = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="font-pirate-kids"
          variant="neutral"
        >
          <Ban />
          End Voyage
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-pirate-kids">
            Drop Anchor?
          </AlertDialogTitle>
          <AlertDialogDescription className="font-pirate-kids">
            Are you sure you want to stop the game? Your progress might be lost!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="font-pirate-kids">
            <Flag />
            Keep Sailing!
          </AlertDialogCancel>
          <AlertDialogAction className="font-pirate-kids">
            <Ban />
            Aye, Stop Game!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StopGame;
