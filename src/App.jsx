import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Landing from "./pages/Landing";
import Auth from "./components/layout/Auth";
import AuthGuard from "./guard/AuthGuard";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";

import ForgetPass from "./components/Auth/ForgetPass";
import CheckEmail from "./components/Auth/CheckEmail";
import NewPass from "./components/Auth/NewPass";

import Dashboard from "./pages/Dashboard";
import TaskForm from "./components/taskComponents/TaskForm";
import Tasks from "./pages/Tasks";
import EditTaskModal from "./components/taskComponents/EditTaskModal";
import Categories from "./pages/Categories";

import ProfileSettings from "./pages/ProfileSettings";
import PasswordSettings from "./pages/PasswordSettings";
import NotFound from "./pages/PageNotFound"
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <main className="w-full min-h-screen ">
      <Routes>
        <Route
          path="/"
          element={
            <AuthGuard>
              <Layout />
            </AuthGuard>
          }
        >
          <Route
            index
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />
          <Route
            path="tasks"
            element={
              <AuthGuard>
                <Tasks />
              </AuthGuard>
            }
          />
          <Route
            path="create-task"
            element={
              <AuthGuard>
                <TaskForm />
              </AuthGuard>
            }
          />
          <Route
            path="/edit-task/:id"
            element={
              <AuthGuard>
                {" "}
                <EditTaskModal />{" "}
              </AuthGuard>
            }
          />{" "}
          <Route
            path="categories"
            element={
              <AuthGuard>
                {" "}
                <Categories />{" "}
              </AuthGuard>
            }
          />
          <Route
            path="passwordsetting"
            element={
              <AuthGuard>
                {" "}
                <PasswordSettings />{" "}
              </AuthGuard>
            }
          />

          <Route
            path="profilesetting"
            element={
              <AuthGuard>
                {" "}
                <ProfileSettings />{" "}
              </AuthGuard>
            }
          />
        </Route>

        <Route path="/auth" element={<Auth />}>
          <Route index element={<Landing />} />

          <Route path="login" element={<Login />} />
          <Route index path="signup" element={<SignUp />} />
          <Route index path="forget-pass" element={<ForgetPass />} />
          <Route index path="check-email" element={<CheckEmail />} />
          <Route index path="new-pass" element={<NewPass />} />
        </Route>
        <Route path="*" element={<NotFound />}/>
      </Routes>

      <ToastContainer />
    </main>
  );
}

export default App;
