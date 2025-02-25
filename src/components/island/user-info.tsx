import { useEffect, useState } from "react";
import axios from "axios";
import { Crown, Loader } from "lucide-react";

// custom
import { User } from "@/lib/types";
import { useAppContext } from "@/contexts/app";
import { Skeleton } from "../ui/skeleton";
import { AVATARS } from "@/data/components";
import Typography from "../typography";

const UserInfo: React.FC<UserInfoProperties> = ({ userId, isCreator }) => {
  // hooks
  const { token } = useAppContext();

  // states
  const [player, setPlayer] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // local variables
  const userAvatar = AVATARS[player?.avatar ?? 0];

  // fetch user info
  useEffect(() => {
    const fetchPlayer = async () => {
      if (token?.length === 0 || userId === null) return;
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/users/${userId}`, {
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
  }, [token, userId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-3">
        <Skeleton className="size-56" />
        <Skeleton className="h-8 w-44" />
      </div>
    );
  }

  // when user has not joined
  if (userId === null) {
    return <div className="flex flex-col items-center gap-3">
      <div className="size-56 flex items-center justify-center animate-pulse border-dashed border-2 rounded">
        <Loader className="animate-spin text-white" />
      </div>
      <Typography className="animate-pulse font-pirate-kids">Waiting for a Captain to Join...</Typography>
    </div>;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <img
        className="size-56 animate-fade-in"
        src={userAvatar.img}
        alt={userAvatar.alt}
      />
      <div className="flex items-center gap-1">
        {isCreator && <Crown className="fill-[#FFD700]" />}
        <Typography className="font-pirate-kids">{player?.name}</Typography>
      </div>
    </div>
  );
};

export default UserInfo;

interface UserInfoProperties {
  userId: string | null;
  isCreator: boolean;
}
