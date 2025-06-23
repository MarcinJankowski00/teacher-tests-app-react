import { Main } from "./styled";

type ContainerProps = {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => (
    <Main>
        {children}
    </Main>
);

export default Container;