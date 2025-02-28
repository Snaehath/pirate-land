import { Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Crown, Sword } from "lucide-react";

// custom
import { Button } from "../ui/button";
import { User } from "@/lib/types";
import { AVATARS_ICONS } from "@/data/components";
import { useAppContext } from "@/contexts/app";
import { Skeleton } from "../ui/skeleton";
import ToolTip from "../tooltip";

const PlayerCard: React.FC<PlayerCardProperties> = ({
  playerId,
  fromScorecard,
}) => {
  // hooks
  const { token, userId } = useAppContext();

  // states
  const [player, setPlayer] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // fetch user info
  useEffect(() => {
    const fetchPlayer = async () => {
      if (token?.length === 0) return;
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/users/${playerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlayer(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlayer();
  }, [token, playerId]);

  if (isLoading) {
    return (
      <Button
        variant="noShadow"
        className="border-none transition-transform transform hover:scale-110 underline underline-offset-4"
      >
        <Skeleton className="size-7 sm:size-14" />
        <Skeleton className="h-3 w-8 sm:h-6 sm:w-36" />
      </Button>
    );
  }

  return (
    player !== undefined && (
      <Link to={`/captain/${player.id}`}>
        <Button
          variant="noShadow"
          className="border-none transition-transform transform hover:scale-110 underline underline-offset-4"
        >
          <img
            src={AVATARS_ICONS[player.avatar].img}
            alt={AVATARS_ICONS[player.avatar].alt}
            className="w-20"
          />
          {player.name}
          {userId === playerId && (
            <ToolTip content="You">
              <div>{fromScorecard ? <Sword /> : <Crown />}</div>
            </ToolTip>
          )}
        </Button>
      </Link>
    )
  );
};

export default PlayerCard;

interface PlayerCardProperties {
  playerId: string;
  fromScorecard?: boolean;
}
