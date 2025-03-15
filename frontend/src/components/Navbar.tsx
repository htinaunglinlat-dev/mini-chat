import { Link } from "react-router";
// import { useAuthStore } from "../store/useAuthStore";
import { Loader2, LogOut, LucideProps, MessageSquare, Settings, User } from "lucide-react";
import * as motion from 'motion/react-client'
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/features/authSlice";

const Navbar = () => {
  // const { logout, authUser } = useAuthStore();
  const {authUser, status} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  return (
    <header
      className="border-b border-base-300 fixed w-full top-0 z-50 backdrop-blur-lg bg-base-100/80">
      <div className="max-w-7xl mx-auto px-2 sm:px-10 h-16">
        <div className="flex items-center justify-between h-full">

          {/* Logo - Left side */}
          <motion.div 
          className="flex items-center gap-8"
          initial={{opacity: 0, y: 10}}
          animate={{opacity: 1, y: 0}}
          >
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all duration-300">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold hidden sm:inline">Chatty</h1>
            </Link>
          </motion.div>

          {/* Nav Button Lists - Right side */}
          <div className="flex items-center gap-2">

            {/* <NavButton path="/settings" Icon={Settings}>Settings</NavButton> */}

            {/* {authUser && ( */}
            {authUser && (
              <>
                <NavButton path="/profile"  Icon={User}>Profile</NavButton>

                <button className="btn flex gap-2 items-center" onClick={() => dispatch(logout())}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>

        </div>
      </div>
      {
        status === "loggingOut" && <div className="w-full h-screen bg-slate-900/60 fixed top-0 left-0 flex justify-center items-center"><Loader2 className="animate-spin size-10 mr-4" />Logging out</div>
      }
    </header>
  );
};

interface NavButtonProps {
  path: string
  Icon: React.FC<LucideProps>
  children?: React.ReactNode
}


const NavButton: React.FC<NavButtonProps> = ({path, Icon, children}) => {
  return (
    <Link to={path} className={`btn gap-2`}>
      <Icon className="size-5" />
      <span className="hidden sm:inline">{children}</span>
    </Link>
  )
}
export default Navbar;