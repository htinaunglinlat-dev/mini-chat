type InputProps = {
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}


const Input: React.FC<InputProps> = ({placeholder, value, onChange}) => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
    />
  );
}

export default Input