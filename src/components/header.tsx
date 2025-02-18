import { useLocation, useNavigate } from "react-router";
import { ArrowBigLeft } from "lucide-react";

// custom
import useIsMobile from "@/hooks/use-mobile";
import LanguageSelector from "./language-selector";
import { Card, CardContent } from "./ui/card";
import VolumeController from "./volume-controller";
import LogOutButton from "./log-out";
import { Button } from "./ui/button";
import ToolTip from "./tooltip";
import { useAppContext } from "@/contexts/app";

const Header: React.FC = () => {
  // hooks
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAppContext();

  const handleGoBack = () => {
    navigate("/harbor");
  };

  return (
    <div className="w-full flex items-center justify-between sm:justify-between">
      {location.pathname === "/" ? (
        <div />
      ) : (
        <Card className="sm:self-start">
          <CardContent className="px-2 flex gap-3 py-1 items-start justify-center">
            {token?.length > 0 && location.pathname !== "/harbor" && (
              <ToolTip content="Back to Harbor">
                <Button
                  size="icon"
                  onClick={handleGoBack}
                >
                  <ArrowBigLeft />
                </Button>
              </ToolTip>
            )}
            <p className="font-pirate-kids text-2xl sm:text-5xl">Pirate Land</p>
          </CardContent>
        </Card>
      )}
      {isMobile ? (
        <Card>
          <CardContent className="p-3 gap-3 flex items-center">
            <VolumeController />
            <LanguageSelector />
            {token?.length > 0 && <LogOutButton />}
          </CardContent>
        </Card>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Header;
