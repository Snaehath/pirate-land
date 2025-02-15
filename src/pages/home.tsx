import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/footer";
import Header from "@/components/header";

const HomePage: React.FC = () => (
  <div className="flex flex-col p-3 justify-between bg-cover w-screen h-screen bg-[url(./assets/images/map-bg.png)] bg-no-repeat">
    <Header />
    <Card className="self-center">
      <CardContent className="p-6 gap-3 flex flex-col items-center justify-center">
        <p className="font-pirate-kids text-5xl sm:text-7xl">Menu</p>
        <Button>Create Island</Button>
        <Button>Join Island</Button>
        <Button>Leaderboard</Button>
        <Button>Profile</Button>
      </CardContent>
    </Card>
    <Footer />
  </div>
);

export default HomePage;
