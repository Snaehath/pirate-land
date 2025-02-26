import { Swords, X } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { useNavigate } from "react-router";

// custom
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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAppContext } from "@/contexts/app";
import { useToast } from "@/hooks/use-toast";

const RaidIsland: React.FC = () => {
  // hooks
  const navigate = useNavigate();
  const {toast} = useToast();

  const {setLoadingText, setIsland, token} = useAppContext();

  // states
  const [islandId, setIslandId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleIslandIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIslandId(event.target.value);
  };

  const handleBeginRaid = async () => {
    if (islandId.length === 0 || token?.length === 0) return;
    try {
        setLoadingText!("Scouting the Island... 🏴‍☠️🔍 Hold tight while we chart the waters!");
        await axios.put(`/islands/join-island/${islandId}`, undefined, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoadingText!(undefined);
        setIsland!(islandId);
        navigate(`/island/${islandId}`);
    } catch (error) {
        setLoadingText!(undefined);
        if (isAxiosError(error)) { 
          const errorMessage = error.response?.data as string ?? "";

          // when island is not found
          if (errorMessage.includes("not found")) {
            toast({
              title: "🏝️ Lost at Sea! The island you seek does not exist. Check the Island ID and try again!",
              variant: "destructive",
            });
            return;
          }

          // when island is already being raided
          if (errorMessage === "Island already being raided") {
            toast({
              title: "⚔️ Under Siege! This island is already being raided. Try again later or find another target!",
              variant: "destructive",
            });
            return;
          }

          // when island is full
          if (errorMessage === "Island is full") {
            toast({
              title: "🏴‍☠️ No Room in the Crew! This island has reached its maximum capacity. Look for another adventure!",
              variant: "destructive",
            });
            return;
          }
        }
    }
  };

  // resetting island id when closed
  useEffect(() => {
    if (!open) {
      setIslandId("");
    }
  }, [open]);

  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialogTrigger asChild>
        <Button className="font-pirate-kids">
          <Swords />
          Raid Island
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-pirate-kids">
            Prepare to Raid! 🏴‍☠️
          </AlertDialogTitle>
          <AlertDialogDescription className="font-pirate-kids">
            Enter the Island ID shared by your matey and launch your attack! May
            the best pirate rule the seas!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          placeholder="Enter Island Id"
          className="font-pirate-kids text-center"
          value={islandId}
          onChange={handleIslandIdChange}
        />
        <AlertDialogFooter>
          <AlertDialogCancel className="font-pirate-kids">
            <X />
            Cancel
          </AlertDialogCancel>
          <Button
            disabled={islandId.length === 0}
            className="font-pirate-kids"
            onClick={handleBeginRaid}
          >
            <Swords />
            Begin Raid
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RaidIsland;
