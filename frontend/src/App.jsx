import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Landingpage from "./pages/Landingpage";
import Setting from "./pages/Setting"
import CreateForm from "./pages/CreateForm";
import CreateOutsideform from "./pages/CreateOutsideform"
import Responseformone from "./pages/Responseformone";
import Responseformtwo from "./pages/Responseformtwo";
import ShareWorkspaceHandler from "./pages/ShareWorkspaceHandler";
import { useState } from "react";
import HandleRefresh from "./HandleRefresh";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <HandleRefresh setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/setting"
          element={<PrivateRoute element={<Setting />} />}
        />
        <Route
          path="/createForm/:formId"
          element={<PrivateRoute element={<CreateForm />} />}
        />
        <Route
          path="/createoutsideForm/:formId"
          element={<PrivateRoute element={<CreateOutsideform />} />}
        />

        <Route path="/formresponse/:formId" element={<Responseformone />} />
        <Route path="/formreesponse/:formId" element={<Responseformtwo />} />
        <Route path="/share/:workspaceId" element={<ShareWorkspaceHandler />} />
      </Routes>
    </div>
  );
};
 
export default App;CreateForm;
