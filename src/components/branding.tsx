import { useTranslation } from "react-i18next";

// custom
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import celestiaLogo from "../assets/images/celestia-logo.png";
import celestiaLogo1 from "../assets/images/celestia-logo-1.png";
import paraLogo from "../assets/images/para-logo.png";
import paraLogo1 from "../assets/images/para-logo-1.png";
import { CELESTIA_BRAND_LINK, PARA_BRAND_LINK } from "@/data/app";
import useIsMobile from "@/hooks/use-mobile";

const Branding: React.FC = () => {
  // hooks
  const { t } = useTranslation("login");
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardContent className="p-3 gap-3 flex sm:flex-col items-center justify-center">
        <p className="font-pirate-kids text-xl">{t("branding-title")}</p>
        <div className="flex gap-3 items-center">
          <Button
            size={isMobile ? "icon" : "default"}
            asChild
          >
            <a
              href={CELESTIA_BRAND_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5"
            >
              <img
                src={isMobile ? celestiaLogo1 : celestiaLogo}
                className="sm:w-20"
                alt="Celestia"
              />
            </a>
          </Button>
          <Button
            size={isMobile ? "icon" : "default"}
            asChild
          >
            <a
              href={PARA_BRAND_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5"
            >
              <img
                src={isMobile ? paraLogo1 : paraLogo}
                className="sm:w-20"
                alt="Get Para"
              />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Branding;
