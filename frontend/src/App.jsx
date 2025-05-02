import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./Component/NavBar";
import Home from "./pages/Home";
import CreateTask from "./Component/CreateTask";
import UpdateTask from "./Component/UpdateTask";
import RegisterPage from "./pages/RegisterPage";
import PrivetRoute from "./PrivetRoute/PrivetRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<PrivetRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/update/:id" element={<UpdateTask />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
