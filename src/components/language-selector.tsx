import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

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
import { Language } from "@/lib/types";

const LanguageSelector: React.FC = () => {
  // hooks
  const { i18n } = useTranslation();

  const handleLanguageChange = (langugeCode: string) => {
    i18n.changeLanguage(langugeCode);
  };

  // local variables
  const language = LANGUAGES.find(
    (lang) => lang.code === i18n.resolvedLanguage,
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
