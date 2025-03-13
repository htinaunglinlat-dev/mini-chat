// import { useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
import { Camera, CircleArrowLeft, Mail, User } from "lucide-react";
import {Link} from 'react-router'

import avatarImage from './../assets/avatar.png'

const ProfilePage = () => {
  // const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  // const [selectedImg, setSelectedImg] = useState(null);

  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const reader = new FileReader();

  //   reader.readAsDataURL(file);

  //   reader.onload = async () => {
  //     const base64Image = reader.result;
  //     setSelectedImg(base64Image);
  //     await updateProfile({ profilePic: base64Image });
  //   };
  // };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-2xl lg:max-w-7xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8 grid grid-cols-1 lg:grid-cols-2 lg:gap-4 relative">
          
          {/* Left-side */}
          <div className="lg:col-span-1">
            {/* profile title */}
            <div className="text-center mb-2 lg:mb-5">
              <h1 className="text-2xl font-bold">Profile</h1>
              <p className="mt-2">Your profile information</p>
            </div>


            {/* avatar upload section */}
            <div className="flex flex-col items-center gap-4 lg:col-span-1 lg">
              <div className="relative">
                <img
                  // src={selectedImg || authUser.profilePic || "/avatar.png"}
                  src={avatarImage}
                  alt="Profile"
                  className="size-32 rounded-full object-cover border-4 "
                />
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200
                    `}
                    // ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                >
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    // onChange={handleImageUpload}
                    // disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <label htmlFor="avatar-upload" className="text-sm text-zinc-400 cursor-pointer">
                {/* {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"} */}
                Click the camera icon to update your photo
              </label>
            </div>

          </div>

          <div className="lg:col-span-1">
            {/* Right side - account information */}
            <div className="space-y-6 lg:col-span-1">
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
                {/* <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p> */}
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">Ko Zayar Lin Latt</p>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                {/* <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p> */}
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">m21cust.jnpt@gmail.com</p>
              </div>
            </div>
            
            {/* Account status */}
            <div className="mt-6 bg-base-300 rounded-xl p-3">
              <h2 className="text-lg font-medium  mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Member Since</span>
                  {/* <span>{authUser.createdAt?.split("T")[0]}</span> */}
                  <span>12:34:45</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Account Status</span>
                  <span className="text-green-500">Active</span>
                </div>
              </div>
            </div>
          </div>
        
        <Link to="/" className="absolute top-5 left-5" title="back to home page">
          <CircleArrowLeft className="size-10 hover:text-primary hover:animate-back" />
        </Link>

        </div>
      </div>
    </div>
  );
};
export default ProfilePage;