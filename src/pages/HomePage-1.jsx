import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { Cookies } from 'universal-cookie'; // Import Cookies
import BlogPosts from "../components/BlogPosts";
import { useCookies } from "react-cookie";


export default function HomePage() {
  const [cookies, removeCookie] = useCookies(['jwt']);
  // const cookies = new Cookies(); // Create a Cookies instance
  const authToken = cookies.jwt; // Retrieve JWT token from cookies
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) navigate("/login");
  }, [authToken, navigate]);

  const handleLogout = () => {
    // Remove the JWT token from cookies
    removeCookie('jwt');
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <Container>
      <Row>          
        <BlogPosts handleLogout={handleLogout}/>
      </Row>
    </Container>
  );
}


