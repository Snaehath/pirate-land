import { Navigate, useParams } from "react-router";

// custom
import SuspenseLoader from "@/components/suspense-loader";
import { useAppContext } from "@/contexts/app";

const IslandPage: React.FC = () => {
  // hooks
  const { islandId } = useParams();
  const {authChecking, token} = useAppContext();

  if (authChecking) {
    return <SuspenseLoader />;
  }

  if (!(token?.length > 0)) {
    return <Navigate to="/" />;
  }

  return <>{islandId}</>;
};

export default IslandPage;
