type Props = {
  message?: string;
};

const NotFound: React.FC<Props> = ({ message = "Page not found" }) => {
  return <div>{message}</div>;
};

export default NotFound;
