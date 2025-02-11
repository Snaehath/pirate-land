import { Languages } from "lucide-react";
import { useState } from "react";

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
  // states
  const [language, setLanguage] = useState<Language>(LANGUAGES[0]);

  const handleLanguageChange = (v: string) => {
    const selectedLanguage = LANGUAGES.find((lang) => lang.code === v);
    if (!selectedLanguage) return;
    setLanguage(selectedLanguage);
  };

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
          {
            LANGUAGES.map(lang => 
              <DropdownMenuRadioItem
                key={lang.code}
                value={lang.code}
              >
                {lang.name}
              </DropdownMenuRadioItem>
            )
          }
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
