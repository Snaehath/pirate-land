import { Volume1, Volume2, VolumeX } from "lucide-react";

// custom
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Slider } from "./ui/slider";
import { useAppContext } from "@/contexts/app";
import ToolTip from "./tooltip";

const VolumeController: React.FC = () => {
  // hooks
  const { volume, handleVolumeChange } = useAppContext();

  // local variables
  const VolumeIcon = () =>
    volume === 0 ? <VolumeX /> : (volume <= 50 ? <Volume1 /> : <Volume2 />);

  const handleVolumeIconClick = () => {
    if (volume > 0) {
      handleVolumeChange!([0]);
    } else {
      handleVolumeChange!([30]);
    }
  };

  return (
    <Popover>
      <ToolTip
        content="Music"
        hideOnMobile
      >
        <PopoverTrigger asChild>
          <Button size="icon">
            <VolumeIcon />
          </Button>
        </PopoverTrigger>
      </ToolTip>
      <PopoverContent>
        <div className="flex items-center gap-4 px-1">
          <Button
            variant="reverse"
            size="icon"
            onClick={handleVolumeIconClick}
          >
            <VolumeIcon />
          </Button>
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange!}
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
