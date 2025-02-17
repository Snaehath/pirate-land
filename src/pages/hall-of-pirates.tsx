import { Link } from "react-router";
// custom
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeaderBoard } from "@/lib/types";
import { LEADERBOARD_ICONS } from "@/data/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Anchor, ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useMemo } from "react";

const leaderBoard: LeaderBoard[] = [
  { playerID: "player1", won: 10, total: 15 },
  { playerID: "player2", won: 7, total: 15 },
  { playerID: "player3", won: 12, total: 15 },
];

const HallOfPiratesPage: React.FC = () => {
  const randomIcon = useMemo(
    () => LEADERBOARD_ICONS[Math.floor(Math.random() * 4)].img,
    []
  );

  return (
    <Card className="self-center">
      <CardHeader>
        <CardTitle className="text-center font-pirate-kids">
          Hall Of Pirates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="font-pirate-kids">
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
            {leaderBoard.map((player, idx) => (
              <TableRow key={player.playerID}>
                <TableCell>#{idx + 1}</TableCell>
                <TableCell className="flex items-center cursor-pointer">
                  <Link to={`/captain/${player.playerID}`}>
                    <Button
                      variant={"noShadow"}
                      className="border-none transition-transform transform hover:scale-110"
                    >
                      <img
                        src={randomIcon}
                        alt="player profile"
                        className="w-20"
                      />
                      {player.playerID}
                      <Anchor className=" animate-pulse" />
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>{player.won}</TableCell>
                <TableCell>{player.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>
                <Button>
                  <ArrowBigLeft />
                  Prev
                </Button>
              </TableCell>
              <TableCell colSpan={2} className="text-right">
                <Button>
                  Next
                  <ArrowBigRight />
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

export default HallOfPiratesPage;
