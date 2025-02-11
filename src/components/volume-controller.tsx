import { Volume1, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

// custom
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Slider } from "./ui/slider";

const VolumeController: React.FC = () => {
  // states
  const [volume, setVolume] = useState<number>(50);

  // local variables
  const VolumeIcon = () => volume === 0 
    ? <VolumeX /> 
    : (volume <= 50 
      ? <Volume1 /> 
      : <Volume2 />);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon">
          <VolumeIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex items-center gap-4 px-1">
          <VolumeIcon />
          <Slider
            value={[volume]}
            onValueChange={(value) => setVolume(value[0])}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground tabular-nums w-8">
            {volume}
            %
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default VolumeController;
