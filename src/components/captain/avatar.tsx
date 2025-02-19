import { ArrowLeft, ArrowRight } from "lucide-react";

// custom
import { AVATARS } from "@/data/components";
import { Button } from "../ui/button";

const CaptainAvatar: React.FC<CaptainAvatarProperties> = ({
  value,
  setValue,
}) => {
  // local variables
  const avatar = AVATARS[value];

  const handlePrevious = () => {
    setValue((previous) =>
      previous === 0 ? AVATARS.length - 1 : previous - 1
    );
  };

  const handleNext = () => {
    setValue((previous) => (previous + 1) % AVATARS.length);
  };

  return (
    <div className="flex flex-col size-48 sm:size-56 relative">
      <div className="absolute w-full justify-between flex z-10 items-center top-[42%]">
        <Button
          size="icon"
          onClick={handlePrevious}
        >
          <ArrowLeft />
        </Button>
        <Button
          size="icon"
          onClick={handleNext}
        >
          <ArrowRight />
        </Button>
      </div>
      <img
        key={value}
        className="size-48 sm:size-56 animate-fade-in"
        src={avatar.img}
        alt={avatar.alt}
      />
    </div>
  );
};

export default CaptainAvatar;

interface CaptainAvatarProperties {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}
