import { useEffect, useState } from "react";
import axios from "axios";
import { Anchor } from "lucide-react";
import { useNavigate } from "react-router";

// custom
import { Scorecard } from "@/lib/types";
import { useAppContext } from "@/contexts/app";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import PlayerCard from "../hall-of-pirates/player-card";
import Typography from "../typography";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const IslandScoreCard: React.FC<IslandScoreCardProperties> = ({ islandId }) => {
  // hooks
  const { token, setIsland } = useAppContext();
  const navigate = useNavigate();

  // states
  const [scorecard, setScoreCard] = useState<Scorecard>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // fetching the scorecard initally
  useEffect(() => {
    const fetchScoreCard = async () => {
      if (token?.length === 0) return;
      try {
        setIsLoading(true);
        const { data } = await axios.put(
          `/islands/scorecard/${islandId}`,
          undefined,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setScoreCard(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchScoreCard();
  }, [islandId, token]);

  const emptyTheIsland = () => {
    setIsland!("");
  };

  const handleBackToHarbor = () => {
    emptyTheIsland();
    navigate("/harbor");
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center font-pirate-kids tracking-widest">
            Scorecard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Typography className="font-pirate-kids"># 1</Typography>
              <Button
                variant="noShadow"
                className="border-none transition-transform transform hover:scale-110 underline underline-offset-4"
              >
                <Skeleton className="size-7 sm:size-14" />
                <Skeleton className="h-3 w-8 sm:h-6 sm:w-36" />
              </Button>
              <Skeleton className="h-7 w-10" />
            </div>
            <div className="flex items-center gap-3">
              <Typography className="font-pirate-kids"># 2</Typography>
              <Button
                variant="noShadow"
                className="border-none transition-transform transform hover:scale-110 underline underline-offset-4"
              >
                <Skeleton className="size-7 sm:size-14" />
                <Skeleton className="h-3 w-8 sm:h-6 sm:w-36" />
              </Button>
              <Skeleton className="h-7 w-10" />
            </div>
            <Button
              variant="neutral"
              onClick={handleBackToHarbor}
            >
              <Anchor />
              Back to Harbor
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    scorecard !== undefined && (
      <Card>
        <CardHeader>
          <CardTitle className="text-center font-pirate-kids tracking-widest">
            Scorecard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div
              className="flex items-center gap-3"
              onClick={emptyTheIsland}
            >
              <Typography className="font-pirate-kids"># 1</Typography>
              <PlayerCard
                fromScorecard
                playerId={
                  +scorecard.creator_score >= +scorecard.invitee_score
                    ? scorecard.creator
                    : scorecard.invitee
                }
              />
              <Typography className="font-pirate-kids">{Math.max(+scorecard.creator_score, +scorecard.invitee_score)}</Typography>
            </div>
            <div
              className="flex items-center gap-3"
              onClick={emptyTheIsland}
            >
              <Typography className="font-pirate-kids"># 2</Typography>
              <PlayerCard
                fromScorecard
                playerId={
                  +scorecard.creator_score < +scorecard.invitee_score
                    ? scorecard.creator
                    : scorecard.invitee
                }
              />
              <Typography className="font-pirate-kids">{Math.min(+scorecard.creator_score, +scorecard.invitee_score)}</Typography>
            </div>
            <Button
              variant="neutral"
              onClick={handleBackToHarbor}
            >
              <Anchor />
              Back to Harbor
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  );
};

export default IslandScoreCard;

interface IslandScoreCardProperties {
  islandId: string;
}
