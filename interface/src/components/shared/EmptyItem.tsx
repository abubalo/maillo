// import cuteAlien from "../../assets/cute-alien.png";
// import cuteHoneybee from "../../assets/cute-honeybee.png";
import cuteSleepingCat from "../../assets/cute-sleeping-cat.png";

type Props = {
  url?: string;
  message?: string;
};

const EmptyItem: React.FC<Props> = ({
  url = cuteSleepingCat,
  message = "No Items",
}) => {
  
  return (
    <section className="flex items-center justify-center w-full h-svh">
      <div className="flex flex-col items-center justify-center ">
        <img src={url} alt="" className="w-64 h-auto mx-auto borde" />
        <h2 className="text-2xl">{message}</h2>
      </div>
    </section>
  );
};

export default EmptyItem;
