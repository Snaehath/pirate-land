import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

// custom
import { Button } from "../ui/button";
import paraIcon from "../../assets/icons/para.svg";

const ParaButton: React.FC = () => {
  // hooks
  const navigate = useNavigate();
  const { t } = useTranslation("login");

  const handleClick = () => {
    navigate("/harbor");
  };

  return (
    <Button
      variant="neutral"
      onClick={handleClick}
    >
      <img
        src={paraIcon}
        alt="Para"
        className="size-4 bg-transparent"
      />
      {t("connect-btn")}
    </Button>
  );};

export default ParaButton;
