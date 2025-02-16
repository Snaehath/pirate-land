import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CaptaingPage: React.FC = () => (
  <Card className="self-center">
    <CardHeader>
      <CardTitle className="text-3xl sm:text-5xl text-center font-pirate-kids">Profile</CardTitle>
    </CardHeader>
    <CardContent></CardContent>
    <CardFooter className="flex items-center gap-3 justify-end">
      <Button>Discard Changes</Button>
      <Button variant="neutral">Update</Button>
    </CardFooter>
  </Card>
);

export default CaptaingPage;
