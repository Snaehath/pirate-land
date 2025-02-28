import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

// custom
import Typography from "@/components/typography";
import { useAppContext } from "@/contexts/app";
import { Island, User } from "@/lib/types";
import { AVATARS as AVATARS_RED, AVATARS_BLUE } from "@/data/components";
import StopGame from "../stop-game";
import { Skeleton } from "@/components/ui/skeleton";
import ChatContainer from "./chat-container";
import { useSocketContext } from "@/contexts/socket";

const UserCard: React.FC<UserCardProperties> = ({
  islandInfo,
  userId,
  isOpponent,
  player,
  setPlayer,
  positions = [],
  fromStarted,
  captured = [],
  captures = [],
}) => {
  // hooks
  const { token, setLoadingText, userId: currentUserId } = useAppContext();
  const { socket } = useSocketContext();

  // states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [opponentPositionsCount, setOpponentPositionsCount] = useState<number>(0);

  // local variables
  const AVATARS = currentUserId === player?.id ? AVATARS_RED : AVATARS_BLUE;
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
        if (isOpponent) {
          const {data} = await axios.get<{count: number}>(`/boards/positions-count/${islandInfo.id}/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setOpponentPositionsCount(data.count);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlayer();
  }, [token, userId, setPlayer, isOpponent, islandInfo.id]);

  // socket events
  useEffect(() => {
    if (
      !isOpponent ||
      !socket ||
      token?.length === 0 ||
      islandInfo.id.length === 0
    )
      return;

    const handlePlacementUpdate = async () => {
      try {
        const {data} = await axios.get<{count: number}>(`/boards/positions-count/${islandInfo.id}/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOpponentPositionsCount(data.count);
      } finally {
        /* empty */
      }
    };

    socket.off("placement", handlePlacementUpdate);
    socket.on("placement", handlePlacementUpdate);

    return () => {
      socket.off("placement", handlePlacementUpdate);
    };
  }, [isOpponent, islandInfo.id, islandInfo.id.length, socket, token, token?.length, userId]);

  // when both players placed all their positions
  // game can start
  useEffect(() => {
    if (!socket || islandInfo.status === "STARTED") return;
    const startGame = async () => {
      if (opponentPositionsCount === 5 && positions.length == 5) {
        try {
          setLoadingText!(
            "Hoisting the Sails! ⛵ Preparing the game for battle... ⚔️🏴‍☠️"
          );
          await axios.put(`/islands/island-started/${islandInfo.id}`, undefined, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setLoadingText!(undefined);
          socket.emit("startedGame", islandInfo.id);
        } finally {
          setLoadingText!(undefined);
        }
      }
    };
    startGame();
  }, [islandInfo.id, islandInfo.status, opponentPositionsCount, positions.length, setLoadingText, socket, token]);

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
      <div className="flex flex-col rounded-base shadow-shadow border-2 border-border bg-main p-1 pb-2">
        <Typography
          variant="h3"
          className="font-pirate-kids tracking-widest self-center"
        >
          {player.name}
        </Typography>
        <img
          src={userAvatar.img}
          alt={userAvatar.alt}
          className="w-52 self-center"
        />
        {/* placements */}
        {!fromStarted && <>
          <Typography className="font-pirate-kids tracking-widest self-center">
            Placements Left
          </Typography>
          <Typography className="font-pirate-kids tracking-widest self-center">
            {isOpponent ? (5 - opponentPositionsCount) : 5 - positions.length}
          </Typography>
        </>}
        {/* stats */}
        {fromStarted && !isOpponent && <>
          <Typography className="font-pirate-kids tracking-widest self-center">
            Captures
          </Typography>
          <Typography className="font-pirate-kids tracking-widest self-center">
            {captures.length}
            {" "}
            / 5
          </Typography>
          <Typography className="font-pirate-kids tracking-widest self-center">
            Captured
          </Typography>
          <Typography className="font-pirate-kids tracking-widest self-center">
            {captured.length}
            {" "}
            / 5
          </Typography>
        </>}
        {isOpponent ? (
          <ChatContainer islandInfo={islandInfo} />
        ) : (
          <div className="self-center">
            <StopGame
              islandInfo={islandInfo}
              isIslandCreator={islandInfo.creator === userId}
              fromReady={!fromStarted}
              fromStarted={fromStarted}
            />
          </div>
        )}
      </div>
    )
  );
};

export default UserCard;

interface UserCardProperties {
  islandInfo: Island;
  userId: string;
  player: User | undefined;
  setPlayer: Dispatch<SetStateAction<User | undefined>>;
  isOpponent?: boolean;
  positions: number[];
  fromStarted?: boolean;
  captures?: number[];
  captured?: number[];
}
