import { Languages } from "lucide-react";

// custom
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LANGUAGES } from "@/data/app";
import { useAppContext } from "@/contexts/app";
import { Language, LanguageCode } from "@/lib/types";

const LanguageSelector: React.FC = () => {
  // hooks
  const { languageCode, setLanguageCode } = useAppContext();

  const handleLanguageChange = (v: string) => {
    setLanguageCode!(v as LanguageCode);
  };

  // local variables
  const language = LANGUAGES.find(
    (lang) => lang.code === languageCode
  ) as Language;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon">
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={language.code}
          onValueChange={handleLanguageChange}
        >
          {LANGUAGES.map((lang) => (
            <DropdownMenuRadioItem
              key={lang.code}
              value={lang.code}
            >
              {lang.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
