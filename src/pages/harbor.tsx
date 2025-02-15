import { Scroll, Swords, TreePalm, VenetianMask } from "lucide-react";

// custom
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HarborPage: React.FC = () => (
  <Card className="self-center">
    <CardContent className="p-6 gap-3 flex flex-col items-center justify-center">
      <p className="font-pirate-kids text-5xl sm:text-7xl">Harbor</p>
      <Button>
        <TreePalm />
        Build Your Island
      </Button>
      <Button>
        <Swords />
        Raid Island
      </Button>
      <Button>
        <Scroll />
        Hall of Pirates
      </Button>
      <Button>
        <VenetianMask />
        Captain Info
      </Button>
    </CardContent>
  </Card>
);

export default HarborPage;
