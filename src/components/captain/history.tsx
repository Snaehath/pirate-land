import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

// custom
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { HALL_OF_PIRATES_PAGE_SIZE } from "@/data/app";
import { useAppContext } from "@/contexts/app";
import { History } from "@/lib/types";
import Typography from "../typography";
import { cn } from "@/lib/utils";
import ToolTip from "../tooltip";
import { formatDate, formatDistanceToNow } from "date-fns";
import PlayerName from "./player-name";

const HistoryTable: React.FC<HistoryTableProperties> = ({ playerId }) => {
  // hooks
  const { token } = useAppContext();

  // states
  const [startIndex, setStartIndex] = useState<number>(0);
  const [history, setHistory] = useState<History[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // local variables
  const visibleData = history.slice(
    startIndex,
    startIndex + HALL_OF_PIRATES_PAGE_SIZE
  );

  const handlePrevious = () => {
    setStartIndex((previousState) => previousState - HALL_OF_PIRATES_PAGE_SIZE);
  };

  const handleNext = () => {
    setStartIndex((previousState) => previousState + HALL_OF_PIRATES_PAGE_SIZE);
  };

  // fetching all history
  useEffect(() => {
    const fetchHistory = async () => {
      if (token?.length === 0 || playerId?.length === 0) return;
      try {
        setIsLoading(true);
        const { data } = await axios.get<{ history: History[] }>(
          `/history/${playerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHistory(data.history);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, [token, playerId]);

  return (
    <>
      <Table>
        <TableHeader className="font-pirate-kids">
          <TableRow>
            <TableHead>When</TableHead>
            <TableHead>Island</TableHead>
            <TableHead>Opponent</TableHead>
            <TableHead>Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-pirate-kids">
          {!isLoading &&
            visibleData.map((historyItem) => (
              <TableRow key={historyItem.id}>
                <TableCell>
                  <ToolTip
                    content={formatDistanceToNow(historyItem.id, {
                      addSuffix: true,
                    })}
                  >
                    <div>
                      <Typography className="tracking-widest">
                        {formatDate(historyItem.id, "MMMM d, yyyy, h:mm a")}
                      </Typography>
                    </div>
                  </ToolTip>
                </TableCell>
                <TableCell className="capitalize tracking-widest">
                  {historyItem.island_id.split("-").join(" ")}
                </TableCell>
                <TableCell>
                  <PlayerName playerId={historyItem.opponent} />
                </TableCell>
                <TableCell>
                  <Typography
                    className={cn(
                      "p-1 tracking-widest bg-white",
                      historyItem.status === "LOST" && "bg-black text-white"
                    )}
                  >
                    {historyItem.status}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex justify-center gap-3">
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
      </div>
    </>
  );
};

export default HistoryTable;

interface HistoryTableProperties {
  playerId: string;
}
