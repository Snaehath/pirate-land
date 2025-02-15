import { LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

// custom
import LanguageSelector from "./language-selector";
import Branding from "./login/branding";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import VolumeController from "./volume-controller";

const Footer: React.FC = () => {
  // hooks
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="w-full flex items-center justify-center sm:justify-between">
      <Branding />
      <Card className="hidden sm:inline">
        <CardContent className="p-3 gap-3 flex items-center">
          <VolumeController />
          <LanguageSelector />
          {location?.pathname !== "/" && (
            <Button
              size="icon"
              onClick={handleLogout}
            >
              <LogOut />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Footer;
