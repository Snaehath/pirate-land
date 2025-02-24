import { Navigate } from "react-router";

// custom
import ParaButton from "@/components/login/para-button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppContext } from "@/contexts/app";
import SuspenseLoader from "@/components/suspense-loader";

const LoginPage: React.FC = () => {
  // hooks
  const { token, authChecking, island } = useAppContext();

  if (authChecking) {
    return <SuspenseLoader />;
  }

  if (token?.length > 0) {
    return <Navigate to="/harbor" />;
  }

  if (island.length > 0) {
    return <Navigate to={`/island/${island}`} />;
  }

  return (
    <Card className="self-center">
      <CardContent className="p-6 pb-3 gap-3 flex flex-col items-center justify-center">
        <p className="font-pirate-kids text-5xl sm:text-7xl">Pirate Land</p>
        <ParaButton />
      </CardContent>
    </Card>
  );
};

export default LoginPage;
