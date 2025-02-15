import { LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

// custom
import useIsMobile from "@/hooks/use-mobile";
import LanguageSelector from "./language-selector";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import VolumeController from "./volume-controller";

const Header: React.FC = () => {
  // hooks
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/");
  };

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
            {location.pathname !== "/" && (
              <Button
                size="icon"
                onClick={handleLogout}
              >
                <LogOut />
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Header;
