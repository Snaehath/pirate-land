import { useEffect, useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import axios from "axios";
import { Navigate } from "react-router";

// custom
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeaderBoard } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HALL_OF_PIRATES_PAGE_SIZE } from "@/data/app";
import { useAppContext } from "@/contexts/app";
import { Skeleton } from "@/components/ui/skeleton";
import PlayerCard from "@/components/hall-of-pirates/player-card";
import SuspenseLoader from "@/components/suspense-loader";

const HallOfPiratesPage: React.FC = () => {
  // hooks
  const { token, authChecking, island } = useAppContext();

  // states
  const [startIndex, setStartIndex] = useState<number>(0);
  const [leaderboard, setLeaderboard] = useState<LeaderBoard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // local variables
  const visibleData = leaderboard.slice(
    startIndex,
    startIndex + HALL_OF_PIRATES_PAGE_SIZE
  );

  const handlePrevious = () => {
    setStartIndex((previousState) => previousState - HALL_OF_PIRATES_PAGE_SIZE);
  };

  const handleNext = () => {
    setStartIndex((previousState) => previousState + HALL_OF_PIRATES_PAGE_SIZE);
  };

  // fetching all the players
  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (token?.length === 0) return;
      try {
        setIsLoading(true);
        const { data } = await axios.get<
          { wins: number; player_id: string; total_played: number }[]
        >("/leaderboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLeaderboard(
          data.map((player) => ({
            playerId: player.player_id,
            wins: player.wins,
            totalPlayed: player.total_played,
          }))
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaderboard();
  }, [token]);

  if (authChecking) {
    return <SuspenseLoader />;
  }

  if (!(token?.length > 0)) {
    return <Navigate to="/" />;
  }

  if (island.length > 0) {
    return <Navigate to={`/island/${island}`} />;
  }

  return (
    <Card className="self-center font-pirate-kids">
      <CardHeader>
        <CardTitle className="text-center font-pirate-kids">
          Hall Of Pirates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead className="flex items-center justify-center">
                PlayerID
              </TableHead>
              <TableHead>Won</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              [..."123"].map((v) => (
                <TableRow key={v}>
                  {[..."1234"].map((v1) => (
                    <TableCell key={`${v}-${v1}`}>
                      <Skeleton className="h-7" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {!isLoading &&
              visibleData.map((player, index) => (
                <TableRow key={player.playerId}>
                  <TableCell>
                    #
                    {index + startIndex + 1}
                  </TableCell>
                  <TableCell>
                    <PlayerCard playerId={player.playerId} />
                  </TableCell>
                  <TableCell>{player.wins || "- -"}</TableCell>
                  <TableCell>{player.totalPlayed || "- -"}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-center gap-3">
        {!isLoading && <>
          <Button
            size={"sm"}
            onClick={handlePrevious}
            disabled={startIndex === 0}
          >
            <ArrowBigLeft />
            Prev
          </Button>
          <Button
            size={"sm"}
            onClick={handleNext}
            disabled={startIndex + HALL_OF_PIRATES_PAGE_SIZE >= history.length}
          >
            Next
            <ArrowBigRight />
          </Button>
        </>}
      </CardFooter>
    </Card>
  );
};

export default HallOfPiratesPage;
