import parse from "html-react-parser";

const Description = ({ description }: { description: string }) => (
  <div className="mt-8">{parse(description)}</div>
);

export default Description;
