import { Check, Copy, UserRoundPlus } from "lucide-react";
import { useState } from "react";

// custom
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import ToolTip from "../tooltip";

const InviteFriend: React.FC<InviteFriendProperties> = ({islandId}) => {
  // states
  const [copied, setCopied] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  // local variables
  const CopyIcon = copied ? Check : Copy;

  const handleCopy = async () => {
    if (copied) return;
    try {
      await navigator.clipboard.writeText(islandId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      setTimeout(() => setOpen(false), 1800);
    } catch { /* empty */ }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialogTrigger asChild>
        <Button className="font-pirate-kids">
          <UserRoundPlus />
          Invite Matey
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-pirate-kids">
            Summon Your Crew!
          </AlertDialogTitle>
          <AlertDialogDescription className="font-pirate-kids">
            The seas are more fun with mates! Invite your friends to join your adventure.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center gap-3">
          <Input
            defaultValue={islandId}
            readOnly
            className="font-pirate-kids text-center"
          />
          <ToolTip content="Copy Island Id">
            <Button
              size="icon"
              onClick={handleCopy}
            >
              <CopyIcon className="animate-fade-in" />
            </Button>
          </ToolTip>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InviteFriend;

interface InviteFriendProperties {
  islandId: string;
}
