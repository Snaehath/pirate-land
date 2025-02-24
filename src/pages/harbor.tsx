import { Scroll, Swords, TreePalm, VenetianMask } from "lucide-react";
import { Navigate, useNavigate } from "react-router";
import axios from "axios";

// custom
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppContext } from "@/contexts/app";
import SuspenseLoader from "@/components/suspense-loader";
import { useToast } from "@/hooks/use-toast";

const HarborPage: React.FC = () => {
  // hooks
  const { token, userId, authChecking, setLoadingText, setIsland, island } =
    useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCaptainInfo = () => {
    navigate(`/captain/${userId}`);
  };

  const handleHallOfPirates = () => {
    navigate("/hall-of-pirates");
  };

  const handleCreateIsland = async () => {
    try {
      setLoadingText!("Setting Sail to a New Island... 🌴🏴‍☠️");
      const { data: roomName } = await axios.post<string>(
        "/islands/new",
        undefined,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoadingText!(undefined);
      toast({
        title: "🏝️ Land Ho! Your Island Has Been Created Successfully! ⛵🎉",
      });
      setIsland!(roomName);
      navigate(`/island/${roomName}`);
    } catch {
      setLoadingText!(undefined);
      toast({
        title: "Shipwrecked! Unable to Create Island. ⚓🚧",
        variant: "destructive",
      });
    } finally {
      setLoadingText!(undefined);
    }
  };

  if (authChecking) {
    return <SuspenseLoader />;
  }

  if (!(token?.length > 0)) {
    return <Navigate to="/" />;
  }

  if (island.length > 0) {
    return <Navigate to={`/island/${island}`} />;
  }

  return (
    <Card className="self-center">
      <CardContent className="p-6 gap-3 flex flex-col items-center justify-center">
        <p className="font-pirate-kids text-5xl sm:text-7xl">Harbor</p>
        <Button
          onClick={handleCreateIsland}
          className="font-pirate-kids"
        >
          <TreePalm />
          Build Your Island
        </Button>
        <Button className="font-pirate-kids">
          <Swords />
          Raid Island
        </Button>
        <Button
          onClick={handleHallOfPirates}
          className="font-pirate-kids"
        >
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
  );
};

export default HarborPage;
