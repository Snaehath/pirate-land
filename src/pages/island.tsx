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

const IslandPage: React.FC = () => {
  // hooks
  const { islandId } = useParams();
  const { socket } = useSocketContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { authChecking, token, island, userId, setIsland } = useAppContext();
  const islandInfo = useRef<Island>(undefined);

  // states
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // local variables
  const isIslandCreator = islandInfo.current?.creator === userId;

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
        islandInfo.current = data;
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
      if (!islandInfo.current || event.userId === islandInfo.current?.creator)
        return;

      // update island info when invitee joined
      islandInfo.current.invitee = event.userId;

      toast({
        title: "A player joined the game",
      });
    };

    const handlePlayerLeft = (event: {userId: string}) => {
      if (!islandInfo.current) return;

      // when invitee left
      if (event.userId === islandInfo.current.invitee) {
        // and game is not in created state
        // means invitee lost
        if (islandInfo.current.status === "CREATED") {
          toast({
            title: "Matey Has Fled! Waiting for another challenger to join the battle...",
            variant: "destructive",
          });
          // eslint-disable-next-line unicorn/no-null
          islandInfo.current.invitee = null;
        } else {
          toast({
            title: "Victory Without a Fight! The opponent abandoned ship—you win this round!",
          });
          socket.emit("leaveRoom", islandInfo.current.id);
          setIsland!("");
          navigate("/harbor");
        }
      }

      // when creator left
      if (event.userId === islandInfo.current.creator) {
        toast({
          title: "Victory Without a Fight! The opponent abandoned ship—you win this round!",
        });
        socket.emit("leaveRoom", islandInfo.current.id);
        setIsland!("");
        navigate("/harbor");
      }
    };

    socket.off("playerJoined", handlePlayerJoined);
    socket.off("playerLeft", handlePlayerLeft);

    socket.on("playerJoined", handlePlayerJoined);
    socket.on("playerLeft", handlePlayerLeft);

    return () => {
      socket.off("playerJoined", handlePlayerJoined);
      socket.off("playerLeft", handlePlayerLeft);
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

  if (islandInfo.current?.status === "ENDED") {
    return <Navigate to="/" />;
  }

  return (
    <Card className="self-center">
      <CardHeader>
        <CardTitle className="text-center font-pirate-kids capitalize tracking-widest">
          {islandId?.split("-").join(" ")}
        </CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {isLoading && <Loader className="animate-spin self-center" />}
          {islandInfo.current?.status === "CREATED" && (
            <div className="flex items-center gap-3">
              <UserInfo
                isCreator={islandInfo.current.creator === userId}
                userId={userId}
              />
              {/* actions */}
              <div className="flex flex-col gap-3 items-center justify-center">
                {isIslandCreator ? (
                  <Button className="font-pirate-kids">
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
                isCreator={islandInfo.current.creator !== userId}
                userId={
                  isIslandCreator ? islandInfo.current.invitee : islandInfo.current.creator
                }
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-3">
        <StopGame {...{ isIslandCreator, islandInfo: islandInfo.current }} />
        {isIslandCreator && islandInfo.current?.invitee === null && (
          <>
            <InviteFriend islandId={islandId ?? ""} />
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default IslandPage;
