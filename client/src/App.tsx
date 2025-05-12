import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/auth/sign-in";
import Home from "./pages/home";
import SignUP from "./pages/auth/sign-up";

const App = () => {
  return (
    <Routes>
      <Route path="/auth/sign-in" element={<SignIn />} />
      <Route path="/auth/sign-up" element={<SignUP />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
