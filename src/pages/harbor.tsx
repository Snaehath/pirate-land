import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HarborPage: React.FC = () => (
  <Card className="self-center">
    <CardContent className="p-6 gap-3 flex flex-col items-center justify-center">
      <p className="font-pirate-kids text-5xl sm:text-7xl">Harbor</p>
      <Button>Create Island</Button>
      <Button>Join Island</Button>
      <Button>Leaderboard</Button>
      <Button>Profile</Button>
    </CardContent>
  </Card>
);

export default HarborPage;
