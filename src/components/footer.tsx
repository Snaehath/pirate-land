import { useLocation } from "react-router";

// custom
import LanguageSelector from "./language-selector";
import Branding from "./branding";
import { Card, CardContent } from "./ui/card";
import VolumeController from "./volume-controller";
import LogOutButton from "./log-out";
import { useAppContext } from "@/contexts/app";

const Footer: React.FC = () => {
  // hooks
  const {token} = useAppContext();
  const location = useLocation();

  // local variables
  const isIsland = location.pathname.includes("/island");

  if (isIsland) return <></>; 

  return (
    <div className="w-full flex items-center justify-center sm:justify-between">
      <Branding />
      <Card className="hidden sm:inline">
        <CardContent className="p-3 gap-3 flex items-center">
          <VolumeController />
          <LanguageSelector />
          {token?.length > 0 && <LogOutButton />}
        </CardContent>
      </Card>
    </div>
  );};

export default Footer;
