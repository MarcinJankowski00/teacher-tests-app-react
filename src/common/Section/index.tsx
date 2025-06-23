import { Segment, Header, Title, Content } from "./styled";

type SectionProps = {
  title: string;
  extraElementContent?: React.ReactNode;
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ title, extraElementContent, children }) => (
  <Segment>
    <Header>
      <Title>{title}</Title>
      {extraElementContent}
    </Header>
    <Content>{children}</Content>
  </Segment>
);

export default Section;