import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ParaModal } from "@getpara/react-sdk";
import axios, { isAxiosError } from "axios";
import { useNavigate } from "react-router";

// custom
import { Button } from "../ui/button";
import paraIcon from "../../assets/icons/para.svg";
import paraClient from "@/web3/para-client";
import { PARA_MODAL_PROPS } from "@/data/app";
import { useToast } from "@/hooks/use-toast";

const ParaButton: React.FC = () => {
  // hooks
  const { t } = useTranslation("login");
  const { toast } = useToast();
  const navigate = useNavigate();

  // states
  const [paraOpen, setParaOpen] = useState<boolean>(false);

  const handleParaOpen = () => {
    setParaOpen(true);
  };

  const handleParaClose = async () => {
    setParaOpen(false);
    try {
      // check if session active which means
      // user logged in
      const sessionActive = await paraClient.isSessionActive();
      if (!sessionActive) return;

      // userId will be present when
      // session is active
      const userId = paraClient.getUserId();
      if (!userId || userId.length === 0) return;

      // try login
      const {data} = await axios.post("/auth/login", { userId });

      localStorage.setItem("pirate-land:userId", userId);
      localStorage.setItem("pirate-land:token", data.sessionToken);

      if (data.isExisting) {
        toast({
          title: "🦜 Ahoy! Welcome Aboard, Captain! ☠️⚓"
        });
      }
      navigate(data.isExisting ? "/harbor" : `/captain/${userId}`);
    } catch (error) {
      if (!isAxiosError(error)) return;

      const errorResponse = error.response?.data ?? "";

      // when already logged in
      if (errorResponse === "Already logged in") {
        toast({
          title: "🏴‍☠️ Ahoy, Matey! Ye Be Logged in Elsewhere!",
          description: "Ye've already set sail from another ship (tab or device)! Log out from there before embarkin' again.",
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
      >
        <img
          src={paraIcon}
          alt="Para"
          className="size-4 bg-transparent"
        />
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
