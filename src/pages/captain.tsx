import { ChangeEvent, useEffect, useState } from "react";

// custom
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AVATARS } from "@/data/components";
import { Avatar } from "@/lib/types";
import { Input } from "@/components/ui/input";
import Typography from "@/components/typography";

const CaptaingPage: React.FC = () => {
  // states
  const [api, setApi] = useState<CarouselApi>();
  const [_avatar, setAvatar] = useState<Avatar>(AVATARS[0]);
  const [name, setName] = useState<string>("DarkKnight");

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  useEffect(() => {
    if (!api) return;
    setAvatar(AVATARS[api.selectedScrollSnap()]);
    api.on("select", () => {
      setAvatar(AVATARS[api.selectedScrollSnap()]);
    });
  }, [api]);

  return (
    <Card className="self-center">
      <CardHeader>
        <CardTitle className="text-3xl sm:text-5xl text-center font-pirate-kids">
          Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {/* name */}
          <div>
            <Typography className="font-pirate-kids">Name</Typography>
            <Input
              value={name}
              onChange={handleNameChange}
            />
          </div>
          {/* avatar */}
          <div className="flex flex-col">
            <Typography className="font-pirate-kids">Avatar</Typography>
            <Carousel
              setApi={setApi}
              opts={{ loop: true }}
              className="w-56"
            >
              <CarouselContent>
                {AVATARS.map((img) => (
                  <CarouselItem key={img.img}>
                    <img
                      className="w-56"
                      src={img.img}
                      alt={img.alt}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex gap-0.5 absolute -bottom-5 right-0">
                <CarouselPrevious className="static" />
                <CarouselNext className="static" />
              </div>
            </Carousel>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-3 justify-end">
        <Button>Abandon Changes</Button>
        <Button variant="neutral">
          Hoist
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CaptaingPage;
