type TextBoxProps = {
  time: string
  content: string
  alignContent?: 'left' | 'right'
}

const TextBox: React.FC<TextBoxProps> = ({time, content, alignContent}) => {
  return (
    <div className={`flex flex-col gap-3 p-3 bg-blue-300 shadow-lg w-fit max-w-2/3 rounded-lg ${alignContent === 'right' && 'self-end'}`}>
      <p className="text-slate-700 font-bold text-lg">{content}</p>
      <span className="font-bold text-slate-500 text-base self-end">{time}</span>
    </div>
  )
}

export default TextBox