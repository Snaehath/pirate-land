import { Scroll, Swords, TreePalm, VenetianMask } from "lucide-react";
import { Navigate, useNavigate } from "react-router";

// custom
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppContext } from "@/contexts/app";
import SuspenseLoader from "@/components/suspense-loader";

const HarborPage: React.FC = () => {
  // hooks
  const { token, userId, authChecking } = useAppContext();
  const navigate = useNavigate();

  const handleCaptainInfo = () => {
    navigate(`/captain/${userId}`);
  };

  if (authChecking) {
    return <SuspenseLoader />;
  }

  return token?.length > 0 ? (
    <Card className="self-center">
      <CardContent className="p-6 gap-3 flex flex-col items-center justify-center">
        <p className="font-pirate-kids text-5xl sm:text-7xl">Harbor</p>
        <Button className="font-pirate-kids">
          <TreePalm />
          Build Your Island
        </Button>
        <Button className="font-pirate-kids">
          <Swords />
          Raid Island
        </Button>
        <Button className="font-pirate-kids">
          <Scroll />
          Hall of Pirates
        </Button>
        <Button
          onClick={handleCaptainInfo}
          className="font-pirate-kids"
        >
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
