import { Wrapper, Button } from "./styled";


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
    return (
        <Wrapper>
            <Button onClick={onBackToStudents} visible={step==="students" ? false : true }>Wróć do uczniów</Button>
            <Button onClick={onBackToConfig} visible={true}>
                Zmień konfigurację testu
            </Button>
        </Wrapper>
    );
};

export default NavButtons;