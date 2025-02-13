/* eslint-disable unicorn/filename-case */

//custom
import { Button } from "./components/ui/button";
import {
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogDescription,
} from "./components/ui/alert-dialog";

import { cn } from "./lib/utils";
import { ShipWheel } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-3">
      <ShipWheel className="w-20 h-20 animate-spin" />

      <p className="text-lg font-semibold font-pirate-kids">
        Loading the High Seas...
      </p>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div
      className={cn(
        "bg-cover w-screen h-screen bg-[url(./assets/images/map-bg.png)]",
        `bg-no-repeat flex items-center justify-center`
      )}
    >
      <div className="w-64 h-20 relative bg-orange-300 flex flex-col justify-center">
        <h1 className="font-pirate-kids text-3xl ml-14">Pirate Land</h1>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Play</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogDescription>
                <Loader />
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default App;
