import { useLocation } from "react-router";

// custom
import useIsMobile from "@/hooks/use-mobile";
import LanguageSelector from "./language-selector";
import { Card, CardContent } from "./ui/card";
import VolumeController from "./volume-controller";
import LogOutButton from "./log-out";

const Header: React.FC = () => {
  // hooks
  const isMobile = useIsMobile();
  const location = useLocation();

  return (
    <div className="w-full flex items-center justify-between sm:justify-between">
      {location.pathname === "/" ? <div /> : (
        <Card className="sm:self-start">
          <CardContent className="py-1 items-center justify-center">
            <p className="font-pirate-kids text-2xl sm:text-5xl">Pirate Land</p>
          </CardContent>
        </Card>
      )}
      {isMobile ? (
        <Card>
          <CardContent className="p-3 gap-3 flex items-center">
            <VolumeController />
            <LanguageSelector />
            <LogOutButton />
          </CardContent>
        </Card>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Header;
