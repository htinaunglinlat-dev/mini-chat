type ButtonProps = {
  onClick: () => void
  className?: string
  children?: React.ReactNode | string
}


const Button: React.FC<ButtonProps> = ({onClick, className, children}) => {
  return (
    <button
      onClick={onClick}
      className={"px-4 py-2 bg-blue-500 text-white rounded-lg".concat(className || '')}
    >
      {children}
    </button>
  )
}

export default Button