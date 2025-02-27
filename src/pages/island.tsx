import { Navigate, useNavigate, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { HandCoins, Loader, Swords } from "lucide-react";

// custom
import SuspenseLoader from "@/components/suspense-loader";
import { useAppContext } from "@/contexts/app";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InviteFriend from "@/components/island/invite-friend";
import StopGame from "@/components/island/stop-game";
import { Island, User } from "@/lib/types";
import UserInfo from "@/components/island/user-info";
import { Button } from "@/components/ui/button";
import ToolTip from "@/components/tooltip";
import Typography from "@/components/typography";
import { useSocketContext } from "@/contexts/socket";
import { useToast } from "@/hooks/use-toast";
import { celeberate, cn, playAudio } from "@/lib/utils";
import UserCard from "@/components/island/ready/user-card";
import ReadyGameGrid from "@/components/island/ready/game-grid";
import StartedGameGrid from "@/components/island/started-grid";

const IslandPage: React.FC = () => {
  // hooks
  const { islandId } = useParams();
  const { socket } = useSocketContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { authChecking, token, island, userId, setIsland, setLoadingText } =
    useAppContext();
  const islandInfoReference = useRef<Island>(undefined);

  // states
  const [islandInfo, setIslandInfo] = useState<Island>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [creatorInfo, setCreatorInfo] = useState<User>();
  const [inviteeInfo, setInviteeInfo] = useState<User>();
  const [userPositions, setUserPositions] = useState<number[]>([]);
  const [captures, setCaptures] = useState<number[]>([]);
  const [captured, setCaptured] = useState<number[]>([]);
  const [positionsFetching, setPositionsFetching] = useState<boolean>(false);

  // local variables
  const isIslandCreator = islandInfoReference.current?.creator === userId;

  const handleReadyGame = async () => {
    if (!islandInfoReference.current || token?.length === 0 || !socket) return;
    try {
      setLoadingText!(
        "Hoisting the Sails! ⛵ Preparing the game for battle... ⚔️🏴‍☠️"
      );
      await axios.put(`/islands/island-ready/${islandId}`, undefined, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoadingText!(undefined);
      islandInfoReference.current.status = "READY";
      setIslandInfo((previous) =>
        previous === undefined ? previous : { ...previous, status: "READY" }
      );
      socket.emit("readyGame", islandInfoReference.current.id);
    } finally {
      setLoadingText!(undefined);
    }
  };

  // fetch island info
  useEffect(() => {
    const fetchIslandInfo = async () => {
      if (
        token?.length === 0 ||
        islandId === undefined ||
        islandId.length === 0
      )
        return;
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/islands/${islandId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        islandInfoReference.current = data;
        setIslandInfo(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchIslandInfo();
  }, [token, islandId]);

  // listening to socket events
  useEffect(() => {
    if (!socket) return;

    const handlePlayerJoined = (event: { userId: string }) => {
      // nothing to do if creator joined
      if (
        !islandInfoReference.current ||
        event.userId === islandInfoReference.current?.creator
      )
        return;

      // update island info when invitee joined
      islandInfoReference.current.invitee = event.userId;
      setIslandInfo((previous) =>
        previous === undefined
          ? undefined
          : { ...previous, invitee: event.userId }
      );

      toast({
        title: "A player joined the game",
      });
    };

    const handlePlayerLeft = (event: { userId: string }) => {
      if (!islandInfoReference.current) return;

      // when invitee left
      if (event.userId === islandInfoReference.current.invitee) {
        // and game is not in created state
        // means invitee lost
        if (islandInfoReference.current.status === "CREATED") {
          toast({
            title:
              "Matey Has Fled! Waiting for another challenger to join the battle...",
            variant: "destructive",
          });
          // eslint-disable-next-line unicorn/no-null
          islandInfoReference.current.invitee = null;
          setIslandInfo((previous) =>
            // eslint-disable-next-line unicorn/no-null
            previous === undefined ? undefined : { ...previous, invitee: null }
          );
        } else {
          toast({
            title:
              "Victory Without a Fight! The opponent abandoned ship—you win this round!",
          });
          celeberate();
          playAudio("/audio/victory.mp3");
          socket.emit("leaveRoom", islandInfoReference.current.id);
          setIsland!("");
          navigate("/harbor");
        }
      }

      // when creator left
      if (event.userId === islandInfoReference.current.creator) {
        toast({
          title:
            "Victory Without a Fight! The opponent abandoned ship—you win this round!",
        });
        celeberate();
        playAudio("/audio/victory.mp3");
        socket.emit("leaveRoom", islandInfoReference.current.id);
        setIsland!("");
        navigate("/harbor");
      }
    };

    const handleGameReady = (event: { roomId: string }) => {
      // nothing to do when it is not the current island
      if (
        !islandInfoReference.current ||
        islandInfoReference.current.id !== event.roomId
      )
        return;
      islandInfoReference.current.status = "READY";
      setIslandInfo((previous) =>
        previous === undefined ? undefined : { ...previous, status: "READY" }
      );
      toast({
        title: "The creator has started the game. Get ready for battle!",
      });
    };

    const handleGameStarted = (event: { roomId: string }) => {
      // nothing to do when it is not the current island
      if (
        !islandInfoReference.current ||
        islandInfoReference.current.id !== event.roomId
      )
        return;
      islandInfoReference.current.status = "STARTED";
      setIslandInfo((previous) =>
        previous === undefined ? undefined : { ...previous, status: "STARTED" }
      );
      toast({
        title: "Let the Battle Begin!!",
      });
    };

    const handleGameEnded = (event: { roomId: string }) => {
      console.log({event});
      // nothing to do when it is not the current island
      if (
        !islandInfoReference.current ||
        islandInfoReference.current.id !== event.roomId
      )
        return;
      islandInfoReference.current.status = "ENDED";
      setIslandInfo((previous) =>
        previous === undefined ? undefined : { ...previous, status: "ENDED" }
      );
      toast({
        title: "The battle has come to an end",
      });
    };

    const handleCaptured = (event: { position: number; }) => {
      setCaptured(previous => [...previous, event.position]);
      playAudio("/audio/sword-hit.mp3");
    };

    const handleChanceUpdate = (event: {playerId: string}) => {
      if (
        !islandInfoReference.current
      )
        return;
      islandInfoReference.current.chance = event.playerId;
      setIslandInfo((previous) =>
        previous === undefined ? undefined : { ...previous, chance: event.playerId }
      );
      toast({
        title: "It's your chance mate",
      });
    };

    socket.off("playerJoined", handlePlayerJoined);
    socket.off("playerLeft", handlePlayerLeft);
    socket.off("readyGame", handleGameReady);
    socket.off("startedGame", handleGameStarted);
    socket.off("endedGame", handleGameEnded);
    socket.off("captured", handleCaptured);
    socket.off("chanceUpdate", handleChanceUpdate);

    socket.on("playerJoined", handlePlayerJoined);
    socket.on("playerLeft", handlePlayerLeft);
    socket.on("readyGame", handleGameReady);
    socket.on("startedGame", handleGameStarted);
    socket.on("endedGame", handleGameEnded);
    socket.on("captured", handleCaptured);
    socket.on("chanceUpdate", handleChanceUpdate);

    return () => {
      socket.off("playerJoined", handlePlayerJoined);
      socket.off("playerLeft", handlePlayerLeft);
      socket.off("readyGame", handleGameReady);
      socket.off("startedGame", handleGameStarted);
      socket.off("endedGame", handleGameEnded);
      socket.off("captured", handleCaptured);
      socket.off("chanceUpdate", handleChanceUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // fetch positions in ready/started mode
  useEffect(() => {
    const fetchPositions = async () => {
      if (
        ["READY", "STARTED"].includes(islandInfo?.status ?? "") == false ||
        token?.length === 0 ||
        islandId === undefined ||
        islandId.length === 0 ||
        islandInfo === undefined ||
        userId.length === 0
      )
        return;
      try {
        setPositionsFetching(true);
        const { data } = await axios.get<{
          positions: number[];
          captures: number[];
          captured: number[];
        }>(
          `/boards/positions/${islandInfo.id}/${islandInfo.creator === userId ? (islandInfo.invitee ?? "") : islandInfo.creator}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserPositions(data.positions);
        setCaptures(data.captures);
        setCaptured(data.captured);
      } finally {
        setPositionsFetching(false);
      }
    };
    fetchPositions();
  }, [islandId, islandInfo, token, userId]);

  if (authChecking) {
    return <SuspenseLoader />;
  }

  if (!(token?.length > 0)) {
    return <Navigate to="/" />;
  }

  if (island.length > 0 && island !== islandId) {
    return <Navigate to={`/island/${island}`} />;
  }

  return (
    <Card
      className={cn(
        "self-center",
        !isLoading &&
          islandInfo?.status !== "CREATED" &&
          "bg-transparent rounded-none shadow-none border-none p-0"
      )}
    >
      <CardHeader
        className={cn(
          islandInfo?.status !== "CREATED" &&
            "rounded-base shadow-shadow border-2 border-border bg-main"
        )}
      >
        <CardTitle className="text-center font-pirate-kids capitalize tracking-widest">
          {islandId?.split("-").join(" ")}
        </CardTitle>
        <CardDescription className="font-pirate-kids tracking-widest text-center animate-pulse">
          {islandInfo?.status === "READY" &&
            "🛡️ Strategic Prep Underway! The game will begin once all players have set their positions. ⚔️🏴‍☠️"}
          {islandInfo?.status === "STARTED" && (islandInfo.chance === userId
            ? "Your chance"
            : `${inviteeInfo?.name ?? "Opponet"}'s chance`)}
        </CardDescription>
      </CardHeader>
      <CardContent
        className={cn(islandInfo?.status !== "CREATED" && "p-0 pt-2")}
      >
        <div className="flex flex-col items-center">
          {isLoading && <Loader className="animate-spin self-center" />}
          {/* container for create state */}
          {islandInfo?.status === "CREATED" && (
            <div className="flex items-center gap-3">
              <UserInfo
                isCreator={islandInfo.creator === userId}
                userId={userId}
              />
              {/* actions */}
              <div className="flex flex-col gap-3 items-center justify-center">
                {isIslandCreator ? (
                  <Button
                    onClick={handleReadyGame}
                    className="font-pirate-kids"
                    disabled={islandInfo.invitee === null}
                  >
                    <Swords />
                    Start Battle
                  </Button>
                ) : (
                  <Typography className="font-pirate-kids animate-pulse w-48 text-center">
                    Anchors Down! ⚓ Waiting for the Game to Begin... ⏳
                  </Typography>
                )}
                <ToolTip content="Coming Soon">
                  <div>
                    <Button
                      variant="neutral"
                      className="font-pirate-kids"
                      disabled
                    >
                      <HandCoins />
                      Wager USDC
                    </Button>
                  </div>
                </ToolTip>
              </div>
              <UserInfo
                isCreator={islandInfo.creator !== userId}
                userId={
                  isIslandCreator ? islandInfo.invitee : islandInfo.creator
                }
              />
            </div>
          )}
          {/* container for ready state */}
          {islandInfo?.status === "READY" && (
            <div className="flex items-center gap-3">
              {/* user card */}
              <UserCard
                positions={userPositions}
                setPlayer={
                  islandInfo.creator === userId
                    ? setCreatorInfo
                    : setInviteeInfo
                }
                player={
                  islandInfo.creator === userId ? creatorInfo : inviteeInfo
                }
                {...{ islandInfo, userId }}
              />
              {/* game grid */}
              <div className="bg-main p-1 rounded-base shadow-shadow">
                <ReadyGameGrid
                  positions={userPositions}
                  setPositions={setUserPositions}
                  positionsFetching={positionsFetching}
                  islandId={islandInfo.id}
                  user={
                    islandInfo.creator === userId ? creatorInfo : inviteeInfo
                  }
                />
              </div>
              {/* opponent card */}
              <UserCard
                positions={userPositions}
                setPlayer={
                  islandInfo.creator === userId
                    ? setInviteeInfo
                    : setCreatorInfo
                }
                player={
                  islandInfo.creator === userId ? inviteeInfo : creatorInfo
                }
                userId={
                  islandInfo.creator === userId
                    ? (islandInfo.invitee ?? "")
                    : islandInfo.creator
                }
                isOpponent
                islandInfo={islandInfo}
              />
            </div>
          )}
          {/* container for started state */}
          {islandInfo?.status === "STARTED" && (
            <div className="flex items-center gap-3">
              {/* user card */}
              <UserCard
                fromStarted
                positions={userPositions}
                setPlayer={
                  islandInfo.creator === userId
                    ? setCreatorInfo
                    : setInviteeInfo
                }
                player={
                  islandInfo.creator === userId ? creatorInfo : inviteeInfo
                }
                {...{ islandInfo, userId, captures, captured }}
              />
              {/* game grid */}
              <div className="bg-main p-1 rounded-base shadow-shadow">
                <StartedGameGrid
                  isChance={islandInfo.chance === userId}
                  positions={userPositions}
                  captures={captures}
                  setCaptures={setCaptures}
                  captured={captured}
                  setPositions={setUserPositions}
                  positionsFetching={positionsFetching}
                  islandId={islandInfo.id}
                  user={
                    islandInfo.creator === userId ? creatorInfo : inviteeInfo
                  }
                  opponent={
                    islandInfo.creator === userId ? inviteeInfo : creatorInfo
                  }
                  isCreator={islandInfo.creator === userId}
                  islandInfoReference={islandInfoReference}
                  setIslandInfo={setIslandInfo}
                />
              </div>
              {/* opponent card */}
              <UserCard
                fromStarted
                positions={userPositions}
                setPlayer={
                  islandInfo.creator === userId
                    ? setInviteeInfo
                    : setCreatorInfo
                }
                player={
                  islandInfo.creator === userId ? inviteeInfo : creatorInfo
                }
                userId={
                  islandInfo.creator === userId
                    ? (islandInfo.invitee ?? "")
                    : islandInfo.creator
                }
                isOpponent
                {...{ islandInfo, captures, captured }}
              />
            </div>
          )}
          {/* container for ended state */}
          {islandInfo?.status === "ENDED" && (
            <div>scorecard here</div>)}
        </div>
      </CardContent>
      <CardFooter
        className={cn(
          "flex items-center justify-between gap-3",
          islandInfo?.status !== "CREATED" && "hidden"
        )}
      >
        <StopGame {...{ isIslandCreator, islandInfo }} />
        {isIslandCreator && islandInfo?.invitee === null && (
          <>
            <InviteFriend islandId={islandId ?? ""} />
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default IslandPage;
