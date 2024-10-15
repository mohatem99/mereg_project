import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

import Auth from "./components/layout/Auth";
import Login from "./components/Auth/Login";
import { ToastContainer } from "react-toastify";
import AuthGuard from "./guard/AuthGuard";

function App() {
  return (
    <main className="w-full min-h-screen ">
      <Routes>
        <Route path="/" element={<Layout />}>
          {" "}
          <Route
            index
            path="dashboard"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />
        </Route>

        <Route path="/auth" element={<Auth />}>
          <Route index path="login" element={<Login />} />
        </Route>
      </Routes>

      <ToastContainer />
    </main>
  );
}

export default App;
