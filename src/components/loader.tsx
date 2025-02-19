import { ShipWheel } from "lucide-react";

// custom
import { useAppContext } from "@/contexts/app";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import Typography from "./typography";

const Loader: React.FC = () => {
  // hooks
  const { loadingText } = useAppContext();

  return (
    <AlertDialog open={loadingText !== undefined}>
      <AlertDialogContent className="w-64 sm:w-96 p-3 sm:p-6 gap-3 flex flex-col items-center justify-center">
        <AlertDialogHeader className="hidden">
          <AlertDialogTitle />
          <AlertDialogDescription />
        </AlertDialogHeader>
        <ShipWheel className="size-20 animate-spin fill-white" />
        {loadingText && (
          <Typography className="text-center animate-pulse font-pirate-kids">{loadingText}</Typography>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Loader;
