import React, { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import SettingsPage from "./pages/SettingsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { LoaderCircle } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  // console.log(authUser);

  if (isCheckingAuth) {
    return (
      <div className="flex h-screen justify-center items-center">
        <LoaderCircle className="size-20 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
