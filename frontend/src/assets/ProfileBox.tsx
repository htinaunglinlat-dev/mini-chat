
type ProfileBoxProps = {
  name: string
  time: string
  imgUrl: string
  isActive?: boolean
}

const ProfileBox: React.FC<ProfileBoxProps> = ({ name, time, imgUrl, isActive}) => {
  return (
    <div className="grid grid-cols-3 p-2 bg-white shadow-lg rounded-md gap-3 items-center">
      <img src={imgUrl} alt="" className={`col-span-1 size-14 rounded-full shadow-lg bg-contain border-4 ${isActive ? 'border-green-500' : 'border-slate-300'}`}/>
      <div className="col-span-2 flex flex-col gap-1 ">
        <h1 className="font-bold line-clamp-1 text-slate-600">{name}</h1>
        <div className="flex flex-row items-center gap-1">
          <div className={`size-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-slate-500'}`}></div>
          <span className="line-clamp-1">{time}</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileBox