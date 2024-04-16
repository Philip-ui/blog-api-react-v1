import { Button, Col, Row, Form, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// This component handles user authentication
export default function AuthPage() { 
  const url =
    "https://075588d3-6a91-4958-b560-4bf287cfade2-00-3aqtr78zcqhsa.picard.replit.dev";

  // useCookies(['jwt']) initializes a cookie named jwt and provides access to it via the cookies variable. setCookie is a function to update cookies.  
  const [cookies, setCookie] = useCookies(['jwt']);

  // Initializing necessary state variables using the useState hook, such as username, password, usernameError, and passwordError.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");  
  const [usernameError, setUsernameError] = useState(""); 
  const [passwordError, setPasswordError] = useState("");
  
  //navigate is a function provided by useNavigate to navigate between routes.
  const navigate = useNavigate();
  
  /* Login in authenticating username and password from back-end database. 
  This function is triggered when the user clicks the login button.*/
  const handleLogin = async (e) => {    
    e.preventDefault();  //It prevents the default form submission behavior.
    try {
      //It sends a POST request to the specified URL with the provided username and password.
      const res = await axios.post(`${url}/auth/login`, { username, password });

      /*If the login is successful (status 200, authenticated is true), 
      it sets the JWT token received in the response as a cookie, logs a success message, and
       navigates to the home page. */        
      if (res.data && res.data.auth === true && res.data.token) {
        const token = res.data.token;
        // Set the JWT token as a cookie
        setCookie('jwt', token, { path: '/' });        
        console.log("Login was successful, token saved");
        
        navigate("/home");
        console.log('jwt',cookies);
      }
      /* If there are errors, it handles different error cases (e.g., no such username, incorrect password) 
      and sets appropriate error messages.*/
    } catch (error) { 
      if (error.response) {
      if (error.response && error.response.status === 400) {
      // No such username
      setUsernameError("No such username.");
      setPasswordError("");
      
    } else if (error.response && error.response.status === 401) {
      // Wrong password
      setUsernameError("");
      setPasswordError("Incorrect password.");
      
    } else {
      console.error(error);
        setUsernameError("An unexpected error occurred.");
        setPasswordError("");
        
    }
   } else {
    console.error(error);
    setUsernameError("An unexpected error occurred.");
    setPasswordError("");
    
  }
 }
};

/* This effect hook runs when the component mounts.
It checks if a JWT token exists in cookies.
If a token exists, it automatically redirects the user to the home page.*/
useEffect(() => {
  const token = cookies.jwt;
  if (token) {
    navigate("/home");
  }
}, [navigate, cookies]);

  return (
    <Container >
        <Row className="d-flex">
        <Col sm={4}></Col> 
            <Col className="my-3 border border-primary rounded m-2 p-2 bg-primary bg-gradient text-white" sm={4}>
                    <h1 className="my-3">Login to your account</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="d-flex text-start">Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
                            <Form.Text className="d-flex text-start text-white">
                            Username: philip
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="d-flex text-start">Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                             {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>} 
                            <Form.Text className="d-flex text-start text-white">
                            Password: password123
                            </Form.Text>                   
                        </Form.Group>
                        <Button variant="secondary" onClick={handleLogin}>Login</Button>
                    </Form>
            </Col>
        <Col sm={4}></Col>
      </Row>
    </Container>
    );
}
