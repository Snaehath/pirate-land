import { ChangeEvent, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import axios from "axios";
import { Loader } from "lucide-react";

// custom
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AVATARS } from "@/data/components";
import { User } from "@/lib/types";
import { Input } from "@/components/ui/input";
import Typography from "@/components/typography";
import { useAppContext } from "@/contexts/app";
import SuspenseLoader from "@/components/suspense-loader";
import { Skeleton } from "@/components/ui/skeleton";
import CaptainAvatar from "@/components/captain/avatar";

const CaptainPage: React.FC = () => {
  // hooks
  const { id } = useParams();
  const { token, authChecking, userId } = useAppContext();

  // states
  const [avatar, setAvatar] = useState<number>(0);
  const [name, setName] = useState<string>("");

  const [fetching, setFetching] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>();
  const [userNotFound, setUserNotFound] = useState<boolean>(false);

  const [updating, setUpdating] = useState<boolean>(false);

  // local variables
  const avatarObject = AVATARS[avatar];
  const isOwner = id === userId;
  const isUpdated = isOwner && (avatar !== userData?.avatar || name !== userData.name);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isOwner) return;
    setName(event.target.value);
  };

  const discardChanges = () => {
    if (fetching || !isOwner || !userData) return;
    setName(userData.name);
    setAvatar(userData.avatar);
  };

  const updateChanges = async () => {
    if (!isOwner) return;

    try {
      setUpdating(true);
      await axios.put(
        `/users/${id}`,
        { name, avatar },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUpdating(false);
      setUserData({ name, avatar, id });
    } catch {
      setUpdating(false);
    }
  };

  // fetch user data
  useEffect(() => {
    if (!id || !token) return;
    const fetchUser = async () => {
      try {
        setFetching(true);
        const { data } = await axios.get<User>(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(data);
        setName(data.name);
        setAvatar(data.avatar);
        setFetching(false);
        setUserNotFound(false);
      } catch {
        setUserNotFound(true);
        setFetching(false);
      }
    };
    fetchUser();
  }, [id, token]);

  if (authChecking) {
    return <SuspenseLoader />;
  }

  if (!(token?.length > 0)) {
    return <Navigate to="/" />;
  }

  if (userNotFound) {
    return (
      <Card className="self-center">
        <CardHeader>
          <CardTitle>⚓ This Captain Be a Myth!</CardTitle>
          <CardDescription>
            Arrr! We searched the seven seas, but no captain by that id be
            found! Check yer map and try again!
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="self-center">
      <CardHeader>
        <CardTitle className="text-3xl sm:text-5xl text-center font-pirate-kids">
          Captain Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {/* name */}
          <div className="flex flex-col items-center gap-1">
            <Typography className="font-pirate-kids">Name</Typography>
            {fetching ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <Input
                value={name}
                className="text-center"
                onChange={handleNameChange}
                readOnly={!isOwner}
              />
            )}
          </div>
          {/* avatar */}
          <div className="flex flex-col self-center items-center gap-1">
            <Typography className="font-pirate-kids">Avatar</Typography>
            {fetching ? (
              <Skeleton className="size-56" />
            ) : (isOwner ? (
              <CaptainAvatar
                value={avatar}
                setValue={setAvatar}
              />
            ) : (
              <img
                className="size-56"
                src={avatarObject.img}
                alt={avatarObject.alt}
              />
            ))}
          </div>
        </div>
      </CardContent>
      {!fetching && isUpdated && (
        <CardFooter className="flex items-center gap-3 justify-end">
          <Button
            disabled={updating}
            onClick={discardChanges}
            className="font-pirate-kids"
          >
            Abandon Changes
          </Button>
          <Button
            disabled={updating}
            variant="neutral"
            onClick={updateChanges}
            className="font-pirate-kids"
          >
            {updating && <Loader className="animate-spin" />}
            Hoist
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default CaptainPage;
