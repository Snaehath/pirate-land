import { Navigate, useParams } from "react-router";
import { useEffect, useState } from "react";
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

const IslandPage: React.FC = () => {
  // hooks
  const { islandId } = useParams();
  const { socket } = useSocketContext();
  const { authChecking, token, island, userId } = useAppContext();

  // states
  const [islandInfo, setIslandInfo] = useState<Island>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // local variables
  const isIslandCreator = islandInfo?.creator === userId;

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
        setIslandInfo(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchIslandInfo();
  }, [token, islandId]);

  // listening to socket events
  useEffect(() => {
    socket?.on("playerJoined", (event) => {
      console.log({event});
      setIslandInfo((previous) =>
        previous
          ? (event.userId === previous.creator
            ? previous
            : { ...previous, invitee: event.userId })
          : undefined
      );
    });
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
          {islandInfo?.status === "CREATED" && (
            <div className="flex items-center gap-3">
              <UserInfo
                isCreator={islandInfo?.creator === userId}
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
                isCreator={islandInfo?.creator !== userId}
                userId={
                  isIslandCreator ? islandInfo.invitee : islandInfo.creator
                }
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-3">
        <StopGame />
        {isIslandCreator && islandInfo.invitee === null && (
          <>
            <InviteFriend islandId={islandId ?? ""} />
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default IslandPage;
