/* eslint-disable unicorn/filename-case */

import { Button } from "./components/ui/button";
import { cn } from "./lib/utils";

const App: React.FC = () => (
  <div
    className={cn(
      "bg-cover w-screen h-screen bg-[url(./assets/images/map-bg.png)]",
      "bg-no-repeat",
    )}
  >
    <h1 className="font-pirate-kids text-3xl">Pirate Land</h1>
    <Button>Vanakkam</Button>
    <Button>Vanakkam</Button>
  </div>
);

export default App;