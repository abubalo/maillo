import EmptyItem from "../shared/EmptyItem";

type Props = {
  message?: string;
};

const NotFound: React.FC<Props> = ({ message = "Page not found" }) => {
  return (
    <div>
      <EmptyItem message={message} />
    </div>
  );
};

export default NotFound;
