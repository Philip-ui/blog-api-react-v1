import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

// This component responsible for handling the logout functionality in the application.
export default function Logout() {
  const navigate = useNavigate();
  //initializes state variables using the useCookies hook, specifically fetching the JWT token from cookies.
  const [cookies, setCookie] = useCookies(['jwt']);

  /*This function handles the click event of the login button.
    It checks if a JWT token exists in cookies. 
    If it does, it sets the JWT cookie to null effectively removing it.
    Then, it navigates the user to the login page. */
  const handleLoginClick = () => {
    if (cookies.jwt) {
      // set the JWT cookie to null
      setCookie('jwt', null);
    }   
    navigate("/login");
  }
  return (
    <Container>
        <h1 className="my-3">Logged Out</h1>
        <Row>
            <Col md={4}>
                <Card className='my-3'>
                    <Card.Body>                             
                    <Card.Text>You are logged out</Card.Text>      
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Button variant="primary" onClick={handleLoginClick}>Login</Button>
    </Container>
    
  )
}