import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { Loader } from "lucide-react";
import axios from "axios";

// custom
import { AVATARS_ICONS, GRID, AVATARS_ICONS_BLUE } from "@/data/components";
import { cn, playAudio } from "@/lib/utils";
import { Island, User } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/app";
import { useSocketContext } from "@/contexts/socket";

const StartedGameGrid: React.FC<StartedGameGridProperties> = ({
  user,
  positions,
  positionsFetching,
  captures,
  islandId,
  isChance,
  setCaptures,
  opponent,
  isCreator,
  setIslandInfo,
  islandInfoReference,
  captured,
}) => {
  // hooks
  const { toast } = useToast();
  const { token } = useAppContext();
  const { socket } = useSocketContext();

  // states
  const [currentUpdating, setCurrentUpdating] = useState<number>();

  // local variables
  const userAvatar = AVATARS_ICONS[user?.avatar ?? 0];
  const opponentAvatar = AVATARS_ICONS_BLUE[opponent?.avatar ?? 0];

  const handlePositionClick = async (position: number) => {
    if (token?.length === 0 || !socket || opponent === undefined || !islandInfoReference.current) return;

    // when not player's chance
    if (!isChance) {
      playAudio("/audio/error.mp3");
      toast({
        title: "Oops not your chance",
        variant: "destructive",
      });
      return;
    }

    // when something was already clicked
    if (currentUpdating !== undefined) {
      playAudio("/audio/error.mp3");
      toast({
        title: "Move already made",
        variant: "destructive",
      });
      return;
    }

    // selecting captured position
    if (captures.includes(position)) {
      playAudio("/audio/error.mp3");
      toast({
        title: "No one else is there",
        variant: "destructive",
      });
      return;
    }

    playAudio("/audio/tree-hit.mp3");

    try {
      setCurrentUpdating(position);
      const { data } = await axios.put<{ wasHit: boolean; gameEnded: boolean }>(
        `/boards/positions/${islandId}/${opponent.id}/${position}/${isCreator}`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.wasHit) {
        setCaptures((previous) => [...previous, position]);
        playAudio("/audio/captured.mp3");
        toast({
          title: "Hurray, you got one",
        });
        socket.emit("captured", { roomId: islandId, position });
      } else {
        toast({
          title: "That was a miss",
          variant: "destructive",
        });
      }
      if (data.gameEnded) {
        socket.emit("endedGame", {roomId: islandId});
        playAudio("/audio/victory.mp3");
        toast({
          title: "You won Pirate",
        });
        islandInfoReference.current.status = "ENDED";
        setIslandInfo((previous) =>
          previous === undefined ? undefined : { ...previous, status: "ENDED" }
        );
      } else {
        socket.emit("chanceUpdate", { roomId: islandId, playerId: opponent.id });
        islandInfoReference.current.chance = opponent.id;
        setIslandInfo((previous) =>
          previous === undefined ? undefined : { ...previous, chance: opponent.id }
        );
      }
    } finally {
      setCurrentUpdating!(undefined);
    }
  };

  return (
    <div
      className={cn(
        "rounded-base bg-[url(./assets/images/bg.gif)] bg-no-repeat bg-cover grid grid-cols-10 grid-rows-7",
        positionsFetching && "p-0"
      )}
    >
      {GRID.map((v, index) =>
        positionsFetching ? (
          <Skeleton
            key={v}
            className="size-14 rounded-none"
          />
        ) : (
          <div
            key={v}
            onClick={() => handlePositionClick(index)}
            className={cn(
              "rounded-base shadow shadow-white hover:shadow-shadow cursor-pointer size-14",
              currentUpdating === index &&
                "flex [&_img]:opacity-50 items-center justify-center cursor-not-allowed shadow-inner hover:shadow-none",
              positions.includes(index) && "bg-black/50",
              positions.includes(index) && captures.includes(index) && "grid grid-cols-2",
              captured.includes(index) && "bg-red-500",
              captures.includes(index) && "bg-green-500",
            )}
          >
            {positions.includes(index) && (
              <img
                src={userAvatar.img}
                alt={userAvatar.alt}
              />
            )}
            {captures.includes(index) && (
              <img
                src={opponentAvatar.img}
                alt={opponentAvatar.alt}
              />
            )}
            {currentUpdating === index && (
              <Loader className="absolute animate-spin" />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default StartedGameGrid;

interface StartedGameGridProperties {
  user: User | undefined;
  opponent: User | undefined;
  positions: number[];
  captures: number[];
  captured: number[];
  setPositions: Dispatch<SetStateAction<number[]>>;
  setCaptures: Dispatch<SetStateAction<number[]>>;
  islandId: string;
  positionsFetching: boolean;
  isChance: boolean;
  isCreator: boolean;
  islandInfoReference: RefObject<Island | undefined>;
  setIslandInfo: Dispatch<SetStateAction<Island | undefined>>;
}
