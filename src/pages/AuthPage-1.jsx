import { Button, Col, Row, Form, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function AuthPage() { 
  const url =
    "https://075588d3-6a91-4958-b560-4bf287cfade2-00-3aqtr78zcqhsa.picard.replit.dev";

  // Possible values: null (no modal shows), "Login", "SignUp"
  // const cookies = useMemo(() => new Cookies(), []); // Initialize cookies object
  const [cookies, setCookie/*, removeCookie*/] = useCookies(['jwt']);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");  
  const [usernameError, setUsernameError] = useState(""); 
  const [passwordError, setPasswordError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();  
    try {
      const res = await axios.post(`${url}/auth/login`, { username, password });
      if (res.data && res.data.auth === true && res.data.token) {
        const token = res.data.token;
        // Set the JWT token as a cookie
        setCookie('jwt', token, { path: '/' });
        // cookies.set('jwt', token, { path: '/' }); // Set secure and HTTP-only flag
        console.log("Login was successful, token saved");
        navigate("/home");
      }
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
