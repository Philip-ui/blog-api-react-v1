import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Row, Col, Card, Modal } from "react-bootstrap";
import { useCookies  } from "react-cookie";

/* This component is responsible for displaying individual blog posts with 
   options to edit and delete them and accepts postId as a prop.
*/
export default function BlogPostCard({ postId }) {
  // It initializes state variables for post (representing the individual blog post), 
  //show (to manage the visibility of the delete confirmation modal), and cookies using the useCookies hook.
   const[post, setPost] = useState([]);
   const [show, setShow] = useState(false); 
   const [cookies, setCookies] = useCookies(['jwt']);  
   
   
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // token variable is initialized to hold the JWT token.
  var token = '';
  token = cookies.jwt;  
  
  const BASE_URL = "https://075588d3-6a91-4958-b560-4bf287cfade2-00-3aqtr78zcqhsa.picard.replit.dev";
  
  /*This effect hook runs when the component mounts or when postId changes.
    It fetches the individual blog post with the specified postId from the server.
    Upon receiving a response, it sets the post state variable with the retrieved data.
  */
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPost();    
  }, [postId]);
 
  /* This function handles the deletion of the blog post.
     It checks if the user is authenticated by verifying the presence of a JWT token.
     If authenticated, it sends an HTTP DELETE request to delete the post with the specified postId.
     Upon successful deletion, it sets the post state variable to null to indicate that the post has been deleted.
     It also closes the delete confirmation modal.
  */
  const deletePost = async () => {
    if (!token) {
      console.error('User is not authenticated');
      setCookies('jwt', null);
      return;
    }
    try {      
      await axios.delete(`${BASE_URL}/posts/${postId}`, {
        headers: {
          Authorization: token,
        },
      });
      setPost(null);
      console.log('Post deleted');
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  if (!post) {
    return null; // Post has been deleted or not found
  }
 
  // Get individual post with edit and delete button on each posts
  return (
    <Row 
      className="p-3" 
      style={{ 
        borderTop: "1px solid #D3D3D3", 
        borderBottom: "1px solid #D3D3D3" 
      }}
    >
    <Col  md={12} className="mb-4">
     <Card className="my-3">        
        <Card.Body>
          <Card.Title>Title: {post.title}</Card.Title>
          <Card.Title>Author: {post.author}</Card.Title>
          <Card.Text style={{ fontWeight: 600, fontSize: "20px" }}>Content: {post.content}</Card.Text>         
          
          <Button variant="secondary" href={`edit-post/${post.id}`} className="mx-2">
            Edit
          </Button>
          <Button variant="danger" onClick={handleShow} className="mx-2">
            Delete
          </Button>
        </Card.Body>
      </Card>
      </Col>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this todo?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deletePost} className="mx-2">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  )
  
}

