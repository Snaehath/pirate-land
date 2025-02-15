import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";

// custom
import LanguageSelector from "@/components/language-selector";
import Branding from "@/components/login/branding";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import VolumeController from "@/components/volume-controller";
import useIsMobile from "@/hooks/use-mobile";

const HomePage: React.FC = () => {
  // hooks
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col p-3 justify-between bg-cover w-screen h-screen bg-[url(./assets/images/map-bg.png)] bg-no-repeat">
      <div className="w-full flex items-center justify-center sm:justify-between gap-4">
        <Card className="sm:self-start">
          <CardContent className="py-1 items-center justify-center">
            <p className="font-pirate-kids text-2xl sm:text-5xl">Pirate Land</p>
          </CardContent>
        </Card>
        {isMobile ? (
          <Card>
            <CardContent className="p-3 gap-3 flex items-center">
              <VolumeController />
              <LanguageSelector />
              <Button
                size="icon"
                onClick={handleLogout}
              >
                <LogOut />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div />
        )}
      </div>
      {/* center -> menu card */}
      <Card className="self-center">
        <CardContent className="p-6 gap-3 flex flex-col items-center justify-center">
          <p className="font-pirate-kids text-5xl sm:text-7xl">Menu</p>
          <Button>Create Island</Button>
          <Button>Join Island</Button>
          <Button>Leaderboard</Button>
          <Button>Profile</Button>
        </CardContent>
      </Card>
      {/* bottom -> Branding & Settings */}
      <div className="w-full flex items-center justify-center sm:justify-between">
        <Branding />
        <Card className="hidden sm:inline">
          <CardContent className="p-3 gap-3 flex items-center">
            <VolumeController />
            <LanguageSelector />
            <Button
              size="icon"
              onClick={handleLogout}
            >
              <LogOut />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );};

export default HomePage;
