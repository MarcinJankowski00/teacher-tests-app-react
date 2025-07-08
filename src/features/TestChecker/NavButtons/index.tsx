import { Wrapper, Button } from "./styled";
import { useTranslation } from "react-i18next";


type Props = {
  onBackToStudents: () => void;
  onBackToConfig: () => void;
  step: string;
};

export const NavButtons: React.FC<Props> = ({
  onBackToStudents,
  onBackToConfig,
  step,
}) => {
  const { t } = useTranslation();
    return (
        <Wrapper>
            <Button onClick={onBackToStudents} visible={step==="students" ? "false" : "true" }>{t("backToStudents")}</Button>
            <Button onClick={onBackToConfig} visible="true">
                {t("changeConfig")}
            </Button>
        </Wrapper>
    );
};

export default NavButtons;