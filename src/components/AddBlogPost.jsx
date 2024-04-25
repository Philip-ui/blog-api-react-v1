import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Form, Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCookies  } from "react-cookie";

// This component responsible for allowing users to add new blog posts.
export default function AddBlogPost() {
  // Initializes state variables using the useState hook, such as title, author, and content.
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  // Initializes cookies using the useCookies hook.
  const [cookies, setCookie] = useCookies(['jwt']);

  var token = '';
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt == null) navigate("/login");
  }, [cookies, navigate]);
  // This function handles the submission of the blog post form. Saving blog post to back end database
  const handleSave = async (e) => {
    e.preventDefault();  // prevents the default form submission behavior.  
    token = cookies.jwt;

    // checks if the user is authenticated by verifying the presence of a JWT token in cookies.  
    if (!token) {
      console.error('User is not authenticated');
      setCookie('jwt', null);
      return;
    }

    /* Makes an HTTP POST request to the server to create a new blog post, passing the title, author, and content.
    It sets the JWT token in the request headers for authentication.
    */
    try {
      const response = await axios.post('https://075588d3-6a91-4958-b560-4bf287cfade2-00-3aqtr78zcqhsa.picard.replit.dev/posts', {
        title: title,
        author: author,
        content: content,        
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token // Set the JWT token in the request headers
        }
      });
      console.log("token", token);
      console.log('New blog post created:', response.data);
      
      // Clear the form fields after successful submission and route to home page
      setTitle("");
      setAuthor("");
      setContent("");
      navigate("/home");
    } 
    // If an error occurs during the request, it logs the error message.
    catch (error) {
      console.error('Error creating blog post:', error);
    }
  };
  
  // Adding blog post form
  return (
    <>
    <Container>
     <Row className="d-flex">
      <Col sm={3}></Col> 
      <Col className="my-3 border border-primary rounded m-2 p-2 bg-primary-subtle bg-gradient text-grey" sm={6}>
        <h1 className="my-3 ">Add Blog Post</h1>
          <Form onSubmit={handleSave}>
              <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
                <Form.Control 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Type Title"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                type="text"
                placeholder="Type Author"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                value={content}
                onChange={(e) => setContent(e.target.value)}
                as="textarea"
                rows={3}
                placeholder="Contents"
                required
              />
            </Form.Group>
            <Button
            variant="primary"
            className="rounded-pill"
            type="submit"
            >
            Submit
          </Button>
          </Form>
        </Col>
        <Col sm={3}></Col> 
      </Row>      
    </Container> 
    </>
  )

}