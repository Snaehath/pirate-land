import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import celestiaLogo from "../../assets/images/celestia-logo.png";
import paraLogo from "../../assets/images/para-logo.png";
import { CELESTIA_BRAND_LINK, PARA_BRAND_LINK } from "@/data/app";

const Branding: React.FC = () => (
  <Card>
    <CardContent className="p-3 gap-3 flex flex-col items-center justify-center">
      <p className="font-pirate-kids text-xl">Powered With</p>
      <div className="flex gap-3 items-center">
        <Button asChild>
          <a
            href={CELESTIA_BRAND_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={celestiaLogo}
              className="w-20"
              alt="Celestia"
            />
          </a>
        </Button>
        <Button asChild>
          <a
            href={PARA_BRAND_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={paraLogo}
              className="w-20"
              alt="Get Para"
            />
          </a>
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default Branding;
