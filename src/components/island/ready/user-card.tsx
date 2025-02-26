import axios from "axios";
import { useEffect, useState } from "react";

// custom
import Typography from "@/components/typography";
import { useAppContext } from "@/contexts/app";
import { Island, User } from "@/lib/types";
import { AVATARS } from "@/data/components";
import StopGame from "../stop-game";
import { Skeleton } from "@/components/ui/skeleton";
import ChatContainer from "./chat-container";

const UserCard: React.FC<UserCardProperties> = ({
  islandInfo,
  userId,
  isOpponent,
}) => {
  // hooks
  const { token } = useAppContext();

  // states
  const [player, setPlayer] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // local variables
  const userAvatar = AVATARS[player?.avatar ?? 0];

  // fetch user info
  useEffect(() => {
    const fetchPlayer = async () => {
      if (token?.length === 0 || !userId) return;
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlayer(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlayer();
  }, [token, userId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-3">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="size-52" />
        <Skeleton className="h-9 w-44" />
        <Skeleton className="h-8 w-10" />
        {!isOpponent && <Skeleton className="h-12 w-36" />}
      </div>
    );
  }

  return (
    player !== undefined && (
      <div className="flex flex-col items-center gap-3">
        <Typography
          variant="h2"
          className="font-pirate-kids tracking-widest"
        >
          {player.name}
        </Typography>
        <img
          src={userAvatar.img}
          alt={userAvatar.alt}
          className="w-52"
        />
        <Typography
          variant="h3"
          className="font-pirate-kids tracking-widest"
        >
          Placements Left
        </Typography>
        <Typography
          variant="h3"
          className="font-pirate-kids tracking-widest"
        >
          5
        </Typography>
        {isOpponent ? (
          <ChatContainer />
        ) : (
          <StopGame
            islandInfo={islandInfo}
            isIslandCreator={islandInfo.creator === userId}
            fromReady
          />
        )}
      </div>
    )
  );
};

export default UserCard;

interface UserCardProperties {
  islandInfo: Island;
  userId: string;
  isOpponent?: boolean;
}
