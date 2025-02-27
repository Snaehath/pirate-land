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
import { Island } from "@/lib/types";
import UserInfo from "@/components/island/user-info";
import { Button } from "@/components/ui/button";
import ToolTip from "@/components/tooltip";
import Typography from "@/components/typography";
import { useSocketContext } from "@/contexts/socket";
import { useToast } from "@/hooks/use-toast";
import { celeberate, cn, playAudio } from "@/lib/utils";
import UserCard from "@/components/island/ready/user-card";
import { GRID } from "@/data/components";

const IslandPage: React.FC = () => {
  // hooks
  const { islandId } = useParams();
  const { socket } = useSocketContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { authChecking, token, island, userId, setIsland, setLoadingText } = useAppContext();
  const islandInfoReference = useRef<Island>(undefined);

  // states
  const [islandInfo, setIslandInfo] = useState<Island>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // local variables
  const isIslandCreator = islandInfoReference.current?.creator === userId;

  const handleReadyGame = async () => {
    if (!islandInfoReference.current || token?.length === 0 || !socket) return;
    try {
      setLoadingText!("Hoisting the Sails! ⛵ Preparing the game for battle... ⚔️🏴‍☠️");
      await axios.put(`/islands/island-ready/${islandId}`, undefined, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoadingText!(undefined);
      islandInfoReference.current.status = "READY";
      setIslandInfo(previous => previous === undefined ? previous : {...previous, status: "READY"});
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

    const handlePlayerJoined = (event: {userId: string}) => {
      // nothing to do if creator joined
      if (!islandInfoReference.current || event.userId === islandInfoReference.current?.creator)
        return;

      // update island info when invitee joined
      islandInfoReference.current.invitee = event.userId;
      setIslandInfo(previous => previous === undefined ? undefined : {...previous, invitee: event.userId});

      toast({
        title: "A player joined the game",
      });
    };

    const handlePlayerLeft = (event: {userId: string}) => {
      if (!islandInfoReference.current) return;

      // when invitee left
      if (event.userId === islandInfoReference.current.invitee) {
        // and game is not in created state
        // means invitee lost
        if (islandInfoReference.current.status === "CREATED") {
          toast({
            title: "Matey Has Fled! Waiting for another challenger to join the battle...",
            variant: "destructive",
          });
          // eslint-disable-next-line unicorn/no-null
          islandInfoReference.current.invitee = null;
          // eslint-disable-next-line unicorn/no-null
          setIslandInfo(previous => previous === undefined ? undefined : {...previous, invitee: null});
        } else {
          toast({
            title: "Victory Without a Fight! The opponent abandoned ship—you win this round!",
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
          title: "Victory Without a Fight! The opponent abandoned ship—you win this round!",
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
      if (!islandInfoReference.current || islandInfoReference.current.id !== event.roomId) return;
      islandInfoReference.current.status = "READY";
      setIslandInfo(previous => previous === undefined ? undefined : {...previous, status: "READY"});
      toast({
        title: "The creator has started the game. Get ready for battle!",
      });
    };

    socket.off("playerJoined", handlePlayerJoined);
    socket.off("playerLeft", handlePlayerLeft);
    socket.off("readyGame", handleGameReady);

    socket.on("playerJoined", handlePlayerJoined);
    socket.on("playerLeft", handlePlayerLeft);
    socket.on("readyGame", handleGameReady);

    return () => {
      socket.off("playerJoined", handlePlayerJoined);
      socket.off("playerLeft", handlePlayerLeft);
      socket.off("readyGame", handleGameReady);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  if (authChecking) {
    return <SuspenseLoader />;
  }

  if (!(token?.length > 0)) {
    return <Navigate to="/" />;
  }

  if (island.length > 0 && island !== islandId) {
    return <Navigate to={`/island/${island}`} />;
  }

  if (islandInfo !== undefined && islandInfo.status === "ENDED") {
    return <Navigate to="/" />;
  }

  return (
    <Card className="self-center">
      <CardHeader>
        <CardTitle className="text-center font-pirate-kids capitalize tracking-widest">
          {islandId?.split("-").join(" ")}
        </CardTitle>
        <CardDescription className="text-center animate-pulse">
          {islandInfo?.status === "READY" && "🛡️ Strategic Prep Underway! The game will begin once all players have set their positions. ⚔️🏴‍☠️"}
        </CardDescription>
      </CardHeader>
      <CardContent>
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
              <UserCard {...{islandInfo, userId}} />
              {/* game grid */}
              <div className="shadow shadow-white border-4 p-1 border-dashed rounded-base bg-[url(./assets/images/bg.gif)] bg-no-repeat bg-cover grid grid-cols-10 grid-rows-7">
                {GRID.map((v) => <div
                  key={v}
                  className="rounded-base shadow shadow-white hover:shadow-shadow cursor-pointer size-14"
                ></div>)}
              </div>
              {/* opponent card */}
              <UserCard
                userId={islandInfo.creator === userId ? islandInfo.invitee ?? "" : islandInfo.creator}
                isOpponent
                islandInfo={islandInfo}
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className={cn("flex items-center justify-between gap-3", islandInfo?.status === "READY" && "hidden")}>
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
