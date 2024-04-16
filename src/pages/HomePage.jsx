import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BlogPosts from "../components/BlogPosts";
import { useCookies } from "react-cookie";

// This component is responsible for rendering the home page of the blog application. 
export default function HomePage() {
  // Initializes state variables using the useCookies hook, specifically fetching the JWT token from cookies.
  const [cookies, setCookie] = useCookies(['jwt']);  
  const authToken = cookies.jwt; // Retrieve JWT token from cookies
  const navigate = useNavigate();

  /* The useEffect hook runs when the component mounts or when the authToken value changes. 
  If there's no authentication token (authToken is falsy), it navigates the user to the login page.
  */
  useEffect(() => {
    if (!authToken) navigate("/login");
  }, [authToken, navigate]);

  /* This function handles the logout action.
It checks if a JWT token exists in cookies. 
If it does, it sets the JWT cookie to null effectively removing it.
Then, it navigates the user to the login page.
  */
  const handleLogout  =  () => {
    if (cookies.jwt) {
      // set the JWT cookie to null
      setCookie('jwt', null);
      console.log('jwt logout',cookies);
    }   
    navigate("/login");
  };

  /*Inside the row, it renders the BlogPosts component, 
  passing the handleLogout function as a prop.
  */
  return (
    <Container>
      <Row>          
        <BlogPosts handleLogout={handleLogout}/>
      </Row>
    </Container>
  );
}


