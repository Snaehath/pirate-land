import { ChangeEvent, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import axios from "axios";
import { ArrowBigLeft, ArrowBigRight, Loader } from "lucide-react";

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
import { HistoryBoard, User } from "@/lib/types";
import { Input } from "@/components/ui/input";
import Typography from "@/components/typography";
import { useAppContext } from "@/contexts/app";
import SuspenseLoader from "@/components/suspense-loader";
import { Skeleton } from "@/components/ui/skeleton";
import CaptainAvatar from "@/components/captain/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HALL_OF_PIRATES_PAGE_SIZE } from "@/data/app";

const CaptainPage: React.FC = () => {
  // hooks
  const { id } = useParams();
  const { token, authChecking, userId, island } = useAppContext();

  // states
  const [avatar, setAvatar] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [startIndex, setStartIndex] = useState<number>(0);
  const [history, setHistory] = useState<HistoryBoard[]>([]);

  const [fetching, setFetching] = useState<boolean>(false);
  const [userData, setUserData] = useState<User>();
  const [userNotFound, setUserNotFound] = useState<boolean>(false);

  const [updating, setUpdating] = useState<boolean>(false);

  // local variables
  const avatarObject = AVATARS[avatar];
  const isOwner = id === userId;
  const isUpdated =
    isOwner && (avatar !== userData?.avatar || name !== userData.name);

  const visibleData = history.slice(
    startIndex,
    startIndex + HALL_OF_PIRATES_PAGE_SIZE
  );

  const handlePrevious = () => {
    setStartIndex((previousState) => previousState - HALL_OF_PIRATES_PAGE_SIZE);
  };

  const handleNext = () => {
    setStartIndex((previousState) => previousState + HALL_OF_PIRATES_PAGE_SIZE);
  };

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

  if (island.length > 0) {
    return <Navigate to={`/island/${island}`} />;
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
    <div className="flex self-center">
      <Card>
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
              ) : isOwner ? (
                <CaptainAvatar value={avatar} setValue={setAvatar} />
              ) : (
                <img
                  className="size-56"
                  src={avatarObject.img}
                  alt={avatarObject.alt}
                />
              )}
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
      <Table className="w-full">
        <TableHeader className=" font-pirate-kids">
          <TableRow>
            <TableHead>Island ID</TableHead>
            <TableHead>Opponent</TableHead>
            <TableHead>Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-pirate-kids ">
          <TableRow>
            <TableCell>Fiery Mammoth 79</TableCell>
            <TableCell>wademoon</TableCell>
            <TableCell>Won</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fiery Mammoth 79</TableCell>
            <TableCell>wademoon</TableCell>
            <TableCell>Loss</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fiery Mammoth 79</TableCell>
            <TableCell>wademoon</TableCell>
            <TableCell>Loss</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-center py-4">
              <div className="flex justify-center gap-3">
                <Button
                  size={"sm"}
                  onClick={handlePrevious}
                  disabled={startIndex === 0}
                >
                  <ArrowBigLeft />
                  Prev
                </Button>
                <Button
                  size={"sm"}
                  onClick={handleNext}
                  disabled={
                    startIndex + HALL_OF_PIRATES_PAGE_SIZE >= history.length
                  }
                >
                  Next
                  <ArrowBigRight />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default CaptainPage;
