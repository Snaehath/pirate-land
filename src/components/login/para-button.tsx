import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ParaModal } from "@getpara/react-sdk";
import axios, { isAxiosError } from "axios";
import { useNavigate } from "react-router";
import { Loader } from "lucide-react";

// custom
import { Button } from "../ui/button";
import paraIcon from "../../assets/icons/para.svg";
import paraClient from "@/web3/para-client";
import { PARA_MODAL_PROPS } from "@/data/app";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/app";

const ParaButton: React.FC = () => {
  // hooks
  const { t } = useTranslation("login");
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    setLoadingText,
    setToken,
    setUserId,
    loadingText,
    authChecking,
    setAuthChecking,
    setIsland,
  } = useAppContext();

  // states
  const [paraOpen, setParaOpen] = useState<boolean>(false);

  const handleParaOpen = () => {
    setParaOpen(true);
  };

  const handleParaClose = async () => {
    if (!paraOpen) return;
    setParaOpen(false);

    if (authChecking) return;
    setAuthChecking!(true);

    try {
      if (loadingText !== undefined) return;

      // check if session active which means
      // user logged in
      const sessionActive = await paraClient.isSessionActive();
      if (!sessionActive) {
        setAuthChecking!(false);
        return;
      }
      setAuthChecking!(false);

      setLoadingText!("Checking the Captain's Papers... Stand By! 🦜📜");

      // userId will be present when
      // session is active
      const userId = paraClient.getUserId();
      if (!userId || userId.length === 0) {
        setLoadingText!(undefined);
        return;
      }

      // try login
      const { data } = await axios.post<{
        isExisting: boolean;
        sessionToken: string;
        currentGame: string | null;
      }>("/auth/login", { userId });

      setLoadingText!(undefined);

      setUserId!(userId);
      setToken!(data.sessionToken);

      if (data.isExisting) {
        toast({
          title: "🦜 Ahoy! Welcome Aboard, Captain! ☠️⚓",
        });
        if (data.currentGame === null) {
          navigate("/harbor");
        } else {
          setIsland!(data.currentGame);
          navigate(`/island/${data.currentGame}`);
        }
      } else {
        navigate(`/captain/${userId}`);
      }
    } catch (error) {
      setAuthChecking!(false);
      setLoadingText!(undefined);
      if (!isAxiosError(error)) return;

      const errorResponse = error.response?.data ?? "";

      // when already logged in
      if (errorResponse === "Already logged in") {
        toast({
          title: "🏴‍☠️ Ahoy, Matey! Ye Be Logged in Elsewhere!",
          description:
            "Ye've already set sail from another ship (tab or device)! Log out from there before embarkin' again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <Button
        variant="neutral"
        onClick={handleParaOpen}
        className="font-pirate-kids"
      >
        {authChecking ? (
          <Loader className="animate-spin" />
        ) : (
          <img
            src={paraIcon}
            alt="Para"
            className="size-4 bg-transparent"
          />
        )}
        {t("connect-btn")}
      </Button>
      <ParaModal
        className="animate-fade-in"
        para={paraClient}
        isOpen={paraOpen}
        onClose={handleParaClose}
        {...PARA_MODAL_PROPS}
      />
    </>
  );
};

export default ParaButton;
