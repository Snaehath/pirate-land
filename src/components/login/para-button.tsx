import { useTranslation } from "react-i18next";
import { useState } from "react";
import { OAuthMethod, ParaModal } from "@getpara/react-sdk";

// custom
import { Button } from "../ui/button";
import paraIcon from "../../assets/icons/para.svg";
import paraClient from "@/web3/para-client";
import { APP_NAME } from "@/data/app";

const ParaButton: React.FC = () => {
  // hooks
  const { t } = useTranslation("login");

  // states
  const [paraOpen, setParaOpen] = useState<boolean>(false);

  const handleParaOpen = () => {
    setParaOpen(true);
  };

  const handleParaClose = () => {
    setParaOpen(false);
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
        appName={APP_NAME}
        logo="https://pirateland.vercel.app/favicon.svg"
        oAuthMethods={[
          OAuthMethod.GOOGLE,
          OAuthMethod.APPLE,
          OAuthMethod.FACEBOOK,
        ]}
        disablePhoneLogin
        authLayout={["AUTH:FULL"]}
        externalWallets={[]}
        recoverySecretStepEnabled
        onRampTestMode={true}
      />
    </>
  );
};

export default ParaButton;