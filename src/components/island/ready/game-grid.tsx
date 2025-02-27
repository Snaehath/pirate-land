import { Dispatch, SetStateAction, useState } from "react";
import { Loader } from "lucide-react";
import axios from "axios";

// custom
import { AVATARS_ICONS, GRID } from "@/data/components";
import { cn, playAudio } from "@/lib/utils";
import { User } from "@/lib/types";
import ToolTip from "@/components/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/app";
import { useSocketContext } from "@/contexts/socket";
import { Skeleton } from "@/components/ui/skeleton";

const ReadyGameGrid: React.FC<ReadyGameGridProperties> = ({
  user,
  positions,
  setPositions,
  islandId,
  positionsFetching,
}) => {
  // hooks
  const { toast } = useToast();
  const { token } = useAppContext();
  const { socket } = useSocketContext();

  // states
  const [currentUpdating, setCurrentUpdating] = useState<number[]>([]);

  // local variables
  const avatar = AVATARS_ICONS[user?.avatar ?? 0];

  const handleClick = async (position: number) => {
    if (token?.length === 0 || !socket) return;

    // if position is updating stop
    if (currentUpdating.includes(position)) return;

    // if no more to place
    if (positions.includes(position) === false && positions.length >= 5) {
      playAudio("/audio/error.mp3");
      toast({
        title: "No more pirates left to place",
        description: "Remove a pirate by selecting them",
        variant: "destructive",
      });
      return;
    }

    // user trying to place an extra
    if (
      !positions.includes(position) &&
      !currentUpdating.includes(position) &&
      currentUpdating.length + positions.length >= 5
    ) {
      playAudio("/audio/error.mp3");
      toast({
        title: "Why hurry? Let the Island chill",
        variant: "destructive",
      });
      return;
    }

    playAudio("/audio/tree-hit.mp3");

    try {
      setCurrentUpdating((previous) => [...previous, position]);

      await axios.put(`/boards/ready/${islandId}/${position}`, undefined, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPositions((previous) =>
        previous.includes(position)
          ? previous.filter((v) => v !== position)
          : [...previous, position]
      );

      socket.emit("placement", islandId);
    } finally {
      setCurrentUpdating((previous) => previous.filter((v) => v !== position));
    }
  };

  return (
    <div
      className={cn(
        "shadow shadow-white border-2 p-0.5 border-dashed rounded-base bg-[url(./assets/images/bg.gif)] bg-no-repeat bg-cover grid grid-cols-10 grid-rows-7",
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
          <ToolTip
            key={v}
            content={
              positions.includes(index) ? "Remove pirate" : "Place pirate"
            }
          >
            <div
              onClick={() => handleClick(index)}
              className={cn(
                "rounded-base shadow shadow-white hover:shadow-shadow cursor-pointer size-14",
                currentUpdating.includes(index) &&
                  "flex [&_img]:opacity-50 items-center justify-center cursor-not-allowed shadow-inner hover:shadow-none",
                positions.includes(index) && "bg-black/50"
              )}
            >
              {positions.includes(index) && (
                <img
                  src={avatar.img}
                  alt={avatar.alt}
                />
              )}
              {currentUpdating.includes(index) && (
                <Loader className="absolute animate-spin" />
              )}
            </div>
          </ToolTip>
        )
      )}
    </div>
  );
};

export default ReadyGameGrid;

interface ReadyGameGridProperties {
  user: User | undefined;
  positions: number[];
  setPositions: Dispatch<SetStateAction<number[]>>;
  islandId: string;
  positionsFetching: boolean;
}
