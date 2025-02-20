import { Link } from "react-router";
import { useMemo, useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

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
import { LEADERBOARD_ICONS } from "@/data/components";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HALL_OF_PIRATES_PAGE_SIZE } from "@/data/app";

const leaderBoard: LeaderBoard[] = [
  { playerID: "player1", won: 10, total: 15 },
  { playerID: "player2", won: 7, total: 15 },
  { playerID: "player3", won: 12, total: 15 },
  { playerID: "player4", won: 11, total: 15 },
  { playerID: "player5", won: 6, total: 15 },
  { playerID: "player6", won: 14, total: 15 },
  { playerID: "player7", won: 14, total: 15 },
];

const HallOfPiratesPage: React.FC = () => {
  // states
  const [startIndex, setStartIndex] = useState<number>(0);

  // local variables
  const visibleData = leaderBoard.slice(
    startIndex,
    startIndex + HALL_OF_PIRATES_PAGE_SIZE
  );
  const randomIcon = useMemo(
    () => LEADERBOARD_ICONS[Math.floor(Math.random() * 4)].img,
    []
  );

  const handlePrevious = () => {
    setStartIndex((previousState) => previousState - HALL_OF_PIRATES_PAGE_SIZE);
  };

  const handleNext = () => {
    setStartIndex((previousState) => previousState + HALL_OF_PIRATES_PAGE_SIZE);
  };

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
            {visibleData.map((player, index) => (
              <TableRow key={player.playerID}>
                <TableCell>#{index + startIndex + 1}</TableCell>
                <TableCell className="flex items-center cursor-pointer">
                  <Link to={`/captain/${player.playerID}`}>
                    <Button
                      variant={"noShadow"}
                      className="border-none transition-transform transform hover:scale-110 underline underline-offset-4"
                    >
                      <img
                        src={randomIcon}
                        alt="player profile"
                        className="w-20"
                      />
                      {player.playerID}
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>{player.won}</TableCell>
                <TableCell>{player.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-center gap-3">
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
          disabled={
            startIndex + HALL_OF_PIRATES_PAGE_SIZE >= leaderBoard.length
          }
        >
          Next
          <ArrowBigRight />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HallOfPiratesPage;
