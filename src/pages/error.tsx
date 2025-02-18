import { useNavigate } from "react-router";
import { Anchor, Ship } from "lucide-react";

// custom
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppContext } from "@/contexts/app";
import SuspenseLoader from "@/components/suspense-loader";

const ErrorPage: React.FC = () => {
  // hooks
  const navigate = useNavigate();
  const { authChecking, token } = useAppContext();

  const handleHarbor = () => {
    navigate(token?.length > 0 ? "/harbor" : "/");
  };

  if (authChecking) {
    return <SuspenseLoader />;
  }

  return (
    <Card className="self-center">
      <CardHeader>
        <CardTitle>🏴‍☠️ Arrr! Ye Be Lost at Sea!</CardTitle>
        <CardDescription>
          It seems ye've sailed into uncharted waters! The page ye be seekin' be
          missing, or maybe it walked the plank.
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-center">
        <Button
          variant="neutral"
          onClick={handleHarbor}
        >
          {token?.length > 0 ? <Anchor /> : <Ship />}
          {token?.length > 0
            ? "Back to Safe Waters! "
            : "Log In & Board the Ship!"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ErrorPage;
