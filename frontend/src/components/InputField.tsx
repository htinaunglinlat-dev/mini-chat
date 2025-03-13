import { Eye, EyeOff, LucideIcon } from "lucide-react"

type InputFieldProps = {
  // Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  content: string
  type?: "text" | "email" | "password" | "number"
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  icon: LucideIcon,
  isPasswordToggle?: boolean
  isShowPassword?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const InputField: React.FC<InputFieldProps> = ({
  content, 
  type = "text", 
  icon: Icon, 
  value, 
  onChange, 
  placeholder, 
  isShowPassword, 
  isPasswordToggle,
  onClick
}) => {
  return (
  <div>
    <label className="label" htmlFor={content}>
      <span className="label-text text-sm">{content.toLocaleUpperCase()}</span>
    </label>
    <div className="relative">
      <div className="z-1 absolute top-0 bottom-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="size-5 text-base-content/90" />
      </div>
      <input
        name={content}
        type={type}
        className={`input input-bordered w-full pl-10 focus:outline-0 focus:ring-0`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {
        isPasswordToggle && (
          <button type="button"
          className="absolute z-1 inset-y-0 right-0 pr-3 cursor-pointer"
          onClick={onClick}
          >
            {isShowPassword ? (
              <EyeOff className="size-5 text-base-content/40" />
            ) : (
              <Eye className="size-5 text-base-content/40" />
            )}
          </button>
        )
      }
      <button>

      </button>
    </div>
  </div>
  )
}

export default InputField