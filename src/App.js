import "./App.css";
import AuthContextProvider from "./contexts/AuthContext";
import BlogContextProvider from "./contexts/BlogContext";
import Router from "./router/Router";
import {ToastContainer} from "react-toastify";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <BlogContextProvider>
          <Router />
          <ToastContainer/>
        </BlogContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
