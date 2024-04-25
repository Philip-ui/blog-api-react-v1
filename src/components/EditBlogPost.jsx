import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import { useCookies  } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";

// This component edits a blog post
export default function EditBlogPost() {
  const { id: postId } = useParams(); // Get the postId from the URL 
  const navigate = useNavigate();  // useNavigate hook is used to get the navigate function for programmatic navigation.
  
  // Initializes state variables for title, author, and content of the blog post.
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  // Initializes cookies using the useCookies hook.
  const [cookies, setCookies] = useCookies(['jwt']);
  var token = '';

  token = cookies.jwt;
  
  // This effect hook runs when the component mounts or when postId changes.
  useEffect(() => {
   
    /* Fetch post details when the component mounts with the specified postId from the backend server.
    Upon successful fetch, it updates the state variables title, author, and content with the retrieved data.
    */
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://075588d3-6a91-4958-b560-4bf287cfade2-00-3aqtr78zcqhsa.picard.replit.dev/posts/${postId}`);
        const postData = response.data;
        setTitle(postData.title);
        setAuthor(postData.author);
        setContent(postData.content);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
    if (cookies.jwt == null) navigate("/login");    
  }, [cookies, navigate, postId]);

  // This function handles the submission of the edited blog post form.
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents the default form submission behavior.  
    
    // checks if the user is authenticated by verifying the presence of a JWT token in cookies.
    if (!token) {
      console.error('User is not authenticated');
      setCookies('jwt', null);      
      return;
    }
    /* Makes an HTTP PUT request to the server to update the post with the specified postId.
       It includes the updated title, author, and content in the request body.
       It sets the JWT token in the request headers for authentication.
       Upon successful update, it navigates the user to the home page.
       If an error occurs during the request, it logs the error message.
    */
    try {
      await axios.put(`https://075588d3-6a91-4958-b560-4bf287cfade2-00-3aqtr78zcqhsa.picard.replit.dev/posts/${postId}`, {
      title: title,
      author: author,
      content: content
    },{
      headers: {
        Authorization: token // Attach JWT token to request headers
      }
    });
    console.log("token", token);
    console.log('blog post is Edited');
    navigate("/home");     
    }
    catch (error) {console.error('Error updating post:', error);
     }
  };
  
  //Edit and Update form
  return (
    <Container >
        <Row className="d-flex">
          <Col sm={4}></Col>
            <Col className="my-3 border border-success rounded m-2 p-2 bg-success-subtle bg-gradient text-grey" sm={4}>
                <h2>Edit Post</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={title} 
                      onChange={e => setTitle(e.target.value)} 
                    />
                  </Form.Group>
                  <Form.Group controlId="author">
                    <Form.Label>Author</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={author} 
                      onChange={e => setAuthor(e.target.value)} 
                    />
                  </Form.Group>
                  <Form.Group controlId="content">
                    <Form.Label>Content</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={5} 
                      value={content} 
                      onChange={e => setContent(e.target.value)} 
                    />
                  </Form.Group>
                  <br />
                  <Button variant="secondary" type="submit">
                    Update Post
                  </Button>
                </Form>
              </Col>
              <Col sm={4}></Col> 
            </Row>
        </Container>      
  );
}


