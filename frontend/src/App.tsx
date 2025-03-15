import {Navbar} from "./components/index.ts";

import {HomePage, SignUpPage, LoginPage, ProfilePage} from "./pages/index.ts"
// import SettingsPage from "./pages/SettingsPage";

import { Routes, Route } from "react-router";


import { Toaster } from "react-hot-toast";


const App = () => {
  

  return (
    <div data-theme={"light"}>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/settings" element={<SettingsPage />} /> */}
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      <Toaster />
    </div>
  );
};


/**
 * return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
 */
export default App;