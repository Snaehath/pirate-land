import { useNavigate } from "react-router";
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

const leaderBoard: LeaderBoard[] = [
  { playerID: "player1", won: 10, total: 15 },
  { playerID: "player2", won: 7, total: 15 },
  { playerID: "player3", won: 12, total: 15 },
  { playerID: "player4", won: 5, total: 15 },
  { playerID: "player5", won: 8, total: 15 },
];

const HallOfPiratesPage: React.FC = () => {
  let navigate = useNavigate();
  return (
    <Table className="font-pirate-kids">
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>PlayerID</TableHead>
          <TableHead>Won</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaderBoard.map((player, idx) => (
          <TableRow key={player.playerID}>
            <TableCell>#{idx + 1}</TableCell>
            <TableCell className="flex gap-3 items-center cursor-pointer">
              <img
                src="https://placehold.co/50x50/png"
                alt="player profile"
                onClick={() => {
                  navigate("/captain/DarkKnight");
                }}
              />
              {player.playerID}
            </TableCell>
            <TableCell>{player.won}</TableCell>
            <TableCell>{player.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default HallOfPiratesPage;
