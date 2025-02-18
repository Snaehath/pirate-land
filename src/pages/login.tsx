import { Navigate } from "react-router";

// custom
import ParaButton from "@/components/login/para-button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppContext } from "@/contexts/app";

const LoginPage: React.FC = () => {
  // hooks
  const { token } = useAppContext();

  return token.length > 0 ? (
    <Navigate to="/harbor" />
  ) : (
    <Card className="self-center">
      <CardContent className="p-6 pb-3 gap-3 flex flex-col items-center justify-center">
        <p className="font-pirate-kids text-5xl sm:text-7xl">Pirate Land</p>
        <ParaButton />
      </CardContent>
    </Card>
  );
};

export default LoginPage;
