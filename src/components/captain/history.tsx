import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useState } from "react";

// custom
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { HALL_OF_PIRATES_PAGE_SIZE } from "@/data/app";

const HistoryTable: React.FC<HistoryTableProperties> = () => {
  // states
  const [startIndex, setStartIndex] = useState<number>(0);
   
  const handlePrevious = () => {
    setStartIndex((previousState) => previousState - HALL_OF_PIRATES_PAGE_SIZE);
  };
    
  const handleNext = () => {
    setStartIndex((previousState) => previousState + HALL_OF_PIRATES_PAGE_SIZE);
  };
  
  return (
    <Table className="w-full">
      <TableHeader className=" font-pirate-kids">
        <TableRow>
          <TableHead>Island ID</TableHead>
          <TableHead>Opponent</TableHead>
          <TableHead>Result</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="font-pirate-kids ">
        <TableRow>
          <TableCell>Fiery Mammoth 79</TableCell>
          <TableCell>wademoon</TableCell>
          <TableCell>Won</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Fiery Mammoth 79</TableCell>
          <TableCell>wademoon</TableCell>
          <TableCell>Loss</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Fiery Mammoth 79</TableCell>
          <TableCell>wademoon</TableCell>
          <TableCell>Loss</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell
            colSpan={3}
            className="text-center py-4"
          >
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
                disabled={
                  startIndex + HALL_OF_PIRATES_PAGE_SIZE >= history.length
                }
              >
                Next
                <ArrowBigRight />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default HistoryTable;

interface HistoryTableProperties {
  playerId: string;
}
