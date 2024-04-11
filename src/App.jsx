import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AddBlogPost from "./components/AddBlogPost";
import EditBlogPost from "./components/EditBlogPost";
import Logout from "./pages/Logout";
import { useCookies } from 'react-cookie'; // Import Cookies
import axios from 'axios'; // Import axios

export default function App() {
  //Uses the useCookies hook from react-cookie to retrieve the JWT token stored in cookies.
  const [cookies] = useCookies(['jwt']);
  const token = cookies.jwt; // Retrieve JWT token from cookies

  //If a token exists, it sets the default authorization header for Axios requests.
  if (token) {
    // Set the default Authorization header for axios requests    
    axios.defaults.headers.common['Authorization'] = token;
  }

  /* The <Routes> component defines the routes of the application. Each <Route> corresponds to a specific URL path
   and renders a specific component (HomePage, AuthPage, etc.) when that path is accessed. The element prop is used
    to specify the component to be rendered. 
    The path="*" route is a catch-all route, rendering the AuthPage component for any unspecified paths.*/
  return (
 
    <BrowserRouter>      
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/add" element={<AddBlogPost />} />
          <Route path="/edit-post/:id" element={<EditBlogPost />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<AuthPage />} />
        </Routes>      
    </BrowserRouter>
 
  );
}


