import { useEffect, useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
import { Loader2, Lock, Mail, User } from "lucide-react"; // Loader2
import { Link, useNavigate } from "react-router";

import toast from "react-hot-toast";
import InputField from "../components/InputField";
import PasswordStrengthMetre from "../components/PasswordStrengthMetre";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { signup } from "../store/features/authSlice";

const SignUpPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch() 
  const {authUser, status} = useAppSelector(state => state.auth)

  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if(authUser) navigate("/")
  })

  // const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = validateForm();
    console.log(success)

    if (success === true) dispatch(signup(formData))
  };

  return (
    <div className="min-h-screen flex justify-center items-center"> 
      {/* left side */}
        <div className="w-full h-[calc(100vh-3rem)] sm:h-auto sm:max-w-md space-y-8 bg-base-200/90 px-6 py-3 mt-14 rounded-lg shadow-lg">

          <div className="text-center flex flex-col gap-2">
            <h1 className="text-2xl font-bold mt-2 text-center">Create Account</h1>
            <p className="text-base-content/60">Get started with your free account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField 
              type="text" 
              content="full name" 
              icon={User} 
              onChange={(e) => setFormData({...formData, fullName: e.currentTarget.value})}
              value={formData.fullName}
              placeholder="User001"
            />

            <InputField
              type="email"
              content="email"
              icon={Mail}
              onChange={(e) => setFormData({...formData, email: e.currentTarget.value})}
              value={formData.email}
              placeholder="user001@gmail.com"
            />

            <InputField 
              type={showPassword ? "text" : "password"}
              content="password"
              icon={Lock}
              onChange={(e) => setFormData({...formData, password: e.currentTarget.value})}
              value={formData.password}
              placeholder="******"
              isPasswordToggle
              isShowPassword={showPassword}
              onClick={() => setShowPassword(!showPassword)}
            />

            <PasswordStrengthMetre password={formData.password} />


            <button type="submit" className="btn btn-primary w-full" disabled={status === "singingUp" ? true : false}>
              {status === "singingUp" ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      
    </div>
  );
};
export default SignUpPage;