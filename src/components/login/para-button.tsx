import { Button } from "../ui/button";
import paraIcon from "../../assets/icons/para.svg";

const ParaButton: React.FC = () => (
  <Button variant="neutral">
    <img
      src={paraIcon}
      alt="Para"
      className="size-4 bg-transparent"
    />
    Continue with Para
  </Button>
);

export default ParaButton;
