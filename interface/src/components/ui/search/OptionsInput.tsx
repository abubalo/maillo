type OptionsProps<T = any> = {
  name: string;
  value: T;
  onChange: (arg: T) => void;
};

const OptionsInput: React.FC<OptionsProps> = ({ name, value, onChange }) => {
  const joinLetters = (letters: string): string => {
    return letters.split(" ").join("-").toLowerCase().trim();
  };

  return (
    <div className="flex items-baseline justify-between w-full gap-10 ">
      <label htmlFor={joinLetters(name)} className="text-sm text-nowrap">
        {name}
      </label>
      <input
        type="text"
        name={joinLetters(name)}
        id={joinLetters(name)}
        className="w-full pt-1 text-sm border-b-2 border-gray-600 focus:outline-none placeholder:text-gray-400 dark:bg-transparent active dark:border-b-white dark:placeholder:text-gray-500 dark:text-gray-300 focus:border-b-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      />
    </div>
  );
};

export default OptionsInput;
