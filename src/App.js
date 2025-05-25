import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/signup/signup";
import Login from "./pages/login/login";

import Dashboard from "./pages/dashboard/dashboard";
import "./App.css";
import PostUser from "./pages/post-user/PostUser";
import UpdateUser from "./update-user/UpdateUser";
import { useAuth } from "./pages/hooks/useAuth";

function App() {
  const PrivateRoute = ({ element }) => {
    const { currentUser } = useAuth();
    console.log("CurrentUser in PrivateRoute:", currentUser);
    return currentUser ? element : <Navigate to="/Signup" />;
  };

  return (
    <>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/Signup" replace />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route path="/user" element={<PrivateRoute element={<PostUser />} />} />
        <Route
          path="/user/:id/edit"
          element={<PrivateRoute element={<UpdateUser />} />}
        />
      </Routes>
    </>
  );
}

export default App;
