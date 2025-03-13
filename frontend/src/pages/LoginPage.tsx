import { useEffect, useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router";
import { Loader2, Lock, Mail } from "lucide-react";
import InputField from "../components/InputField";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../store/features/authSlice";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useAppDispatch()
  const {isLoading, errorMessage, authUser} = useAppSelector(state => state.auth)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({email, password}))
  };

  useEffect(() => {
    console.log(errorMessage)
    if(errorMessage) toast.error(errorMessage || "unknown error")
    if(authUser) navigate('/')
  }, [errorMessage])

  return (
    <div className="min-h-screen flex justify-center items-center">
      {/* Left Side - Form */}
      <div className="w-full h-[calc(100vh-3rem)] sm:h-auto sm:max-w-md bg-base-200/90 space-y-8 px-6 py-3 mt-14 rounded-lg shadow-lg">

        <div className="text-center flex flex-col gap-2">
          <h1 className="text-2xl font-bold mt-2 text-center">Welcome Back</h1>
          <p className="text-base-content/60">Sign in to your account</p>
        </div>

          {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <InputField
            type="email"
            content="email"
            icon={Mail}
            onChange={(e) => setEmail(e.currentTarget.value)}
            value={email}
            placeholder="user001@gmail.com"
          />

          <InputField 
            type={showPassword ? "text" : "password"}
            content="password"
            icon={Lock}
            onChange={(e) => setPassword(e.currentTarget.value)}
            value={password}
            placeholder="******"
            isPasswordToggle
            isShowPassword={showPassword}
            onClick={() => setShowPassword(!showPassword)}
          />

          <button type="submit" className="btn btn-primary w-full" > {/* disabled={isLoggingIn}> */} 
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Log in"
            )}
          </button>
        </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
    </div>
  );
};
export default LoginPage;