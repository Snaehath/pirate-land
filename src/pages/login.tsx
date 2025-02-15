import Footer from "@/components/footer";
import Header from "@/components/header";
import ParaButton from "@/components/login/para-button";
import { Card, CardContent } from "@/components/ui/card";

const LoginPage: React.FC = () => (
  <div className="flex flex-col p-3 justify-between bg-cover w-screen h-screen bg-[url(./assets/images/map-bg.png)] bg-no-repeat">
    <Header />
    {/* center -> welcome card */}
    <Card className="self-center">
      <CardContent className="p-6 gap-3 flex flex-col items-center justify-center">
        <p className="font-pirate-kids text-5xl sm:text-7xl">Pirate Land</p>
        <ParaButton />
      </CardContent>
    </Card>
    <Footer />
  </div>
);

export default LoginPage;
