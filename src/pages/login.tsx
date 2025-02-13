import LanguageSelector from "@/components/language-selector";
import Branding from "@/components/login/branding";
import ParaButton from "@/components/login/para-button";
import { Card, CardContent } from "@/components/ui/card";
import VolumeController from "@/components/volume-controller";
import { useIsMobile } from "@/hooks/use-mobile";

const LoginPage: React.FC = () => {
  // hooks
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col p-3 justify-between bg-cover w-screen h-screen bg-[url(./assets/images/map-bg.png)] bg-no-repeat">
      {/* top -> settings (only visible in mobile) */}
      {isMobile ? (
        <Card className="self-end">
          <CardContent className="p-3 gap-3 flex items-center">
            <VolumeController />
            <LanguageSelector />
          </CardContent>
        </Card>
      ) : (
        <div />
      )}
      {/* center -> welcome card */}
      <Card className="self-center">
        <CardContent className="p-6 gap-3 flex flex-col items-center justify-center">
          <p className="font-pirate-kids text-5xl sm:text-7xl">Pirate Land</p>
          <ParaButton />
        </CardContent>
      </Card>
      {/* bottom -> Branding & Settings */}
      <div className="w-full flex items-center justify-center sm:justify-between">
        <Branding />
        <Card className="hidden sm:inline">
          <CardContent className="p-3 gap-3 flex items-center">
            <VolumeController />
            <LanguageSelector />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
