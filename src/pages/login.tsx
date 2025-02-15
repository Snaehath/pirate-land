import ParaButton from "@/components/login/para-button";
import { Card, CardContent } from "@/components/ui/card";

const LoginPage: React.FC = () => (
  <Card className="self-center">
    <CardContent className="p-6 gap-3 flex flex-col items-center justify-center">
      <p className="font-pirate-kids text-5xl sm:text-7xl">Pirate Land</p>
      <ParaButton />
    </CardContent>
  </Card>
);

export default LoginPage;
