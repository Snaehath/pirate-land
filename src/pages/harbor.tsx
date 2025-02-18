import { Scroll, Swords, TreePalm, VenetianMask } from "lucide-react";
import { Navigate, useNavigate } from "react-router";

// custom
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppContext } from "@/contexts/app";

const HarborPage: React.FC = () => {
  // hooks
  const { token, userId } = useAppContext();
  const navigate = useNavigate();

  const handleCaptainInfo = () => {
    navigate(`/captain/${userId}`);
  };

  return token.length > 0 ? (
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
        <Button onClick={handleCaptainInfo}>
          <VenetianMask />
          Captain Info
        </Button>
      </CardContent>
    </Card>
  ) : (
    <Navigate to="/" />
  );
};

export default HarborPage;
