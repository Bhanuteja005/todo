import {
  ClipboardCheck,
  Gauge,
  LayoutDashboard,
  NotebookPen
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import MobileHeader from "./components/MobileHeader";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import { auth } from "./firebaseConfig";
import Completed from "./pages/Completed";
import Home from "./pages/Home";
import Important from "./pages/Important";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";

const App = () => {
  const mobileMenuRef = useRef();
  const [showMobileMainDropdown, setShowMobileMainDropdown] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      if (!mobileMenuRef.current.contains(e.target)) {
        setShowMobileMainDropdown(false);
      }
    };

    if (showMobileMainDropdown) {
      document.addEventListener("mousedown", handler);
    } else {
      document.removeEventListener("mousedown", handler);
    }
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [showMobileMainDropdown]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const AuthLayout = () => (
    <div className="flex">
      <div className="hidden sm:block sticky top-0 h-screen overflow-y-auto w-64 bg-gray-200">
        <Sidebar>
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text={"Tasks"}
            path={"/"}
          />
          <SidebarItem
            icon={<Gauge size={20} />}
            text={"Important"}
            path={"/important"}
          />
          <SidebarItem
            icon={<ClipboardCheck size={20} />}
            text={"Completed"}
            path={"/completed"}
          />
          <SidebarItem
            icon={<NotebookPen size={20} />}
            text={"ToDo"}
            path={"/todo"}
          />
        </Sidebar>
      </div>
      <div className="flex-1 p-6 overflow-y-auto w-full min-h-screen">
        <MobileHeader />
        <Outlet />
      </div>
    </div>
  );

  return (
    <Routes>
      {!user ? (
        <>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<SignUp setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/important" element={<Important />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      )}
    </Routes>
  );
};

export default App;
