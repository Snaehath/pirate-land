import { ShipWheel } from "lucide-react";

// custom
import { Card, CardContent } from "./ui/card";
import Typography from "./typography";

const SuspenseLoader: React.FC = () => (
  <Card className="self-center">
    <CardContent className="w-64 sm:w-96 p-3 sm:p-6 gap-3 flex flex-col items-center justify-center">
      <ShipWheel className="size-20 animate-spin fill-white" />
      <Typography className="text-center font-pirate-kids">
        Loading the High Seas...
      </Typography>
    </CardContent>
  </Card>
);

export default SuspenseLoader;
