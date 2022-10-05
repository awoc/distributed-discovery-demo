const Button = ({
  name,
  click,
  className
}: {
  name: string;
  click: () => void;
  className?: string;
}) => {
  return (
    <button
      className={`bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded ${
        className ? className : ''
      }`}
      onClick={click}>
      {name}
    </button>
  );
};

export default Button;
