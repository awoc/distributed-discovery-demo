const CheckBox = ({
  id,
  setChecked,
  value,
  checked,
  title = ''
}: {
  id: string;
  setChecked: (checked: boolean) => void;
  value: number;
  checked: boolean;
  title: string;
}) => {
  return (
    <div className="flex">
      <div className="flex items-center mt-2 ">
        <label
          htmlFor={id}
          style={{ width: '270px' }}
          className="ml-0 text-base text-black-7 leading-6 cursor-pointer font-medium">
          {title}
        </label>
        <input
          readOnly={true}
          type="checkbox"
          className="form-checkbox h-4 w-4 text-blue-5 cursor-pointer accent-blue-600"
          value={value}
          checked={checked}
          id={id}
          onClick={() => {
            checked = !checked;
            setChecked(checked);
          }}
        />
      </div>
    </div>
  );
};

export default CheckBox;
