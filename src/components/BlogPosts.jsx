import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, Col, Image, Nav, Row, Spinner } from "react-bootstrap";
import BlogPostCard from "./BlogPostCard";
import { useCookies } from "react-cookie";

// This component is responsible for displaying a list of blog posts.
export default function BlogPosts() {
  // Initializes state variables for posts using the useState hook to manage the list of blog posts.
  const [posts, setPosts] = useState([]);
  // State variable to track loading state
  const [loading, setLoading] = useState(false); 
  // Initializes cookies using the useCookies hook.
  const [cookies] = useCookies(['jwt']);
  

 //url and pic variables hold URLs for images displayed in the component.
  const url = "https://foodseekerdude.com/images/gallery/australia/perth/perth-08.jpg";
  const pic = "https://foodseekerdude.com/images/logo.jpg";
   
  // token variable is initialized to hold the JWT token.
  var token = '';  
  token = cookies.jwt;

  /*This effect hook runs when the component mounts or when token changes.
    It checks if there's a token available.
    If there's a token, it decodes the token to extract user information and fetches the blog posts associated with that user.
  */
  useEffect(() => {
       
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      fetchPosts(userId);
    }
  }, [token]);

  /*This function sends a GET request to fetch all blog posts from the server.
    Upon receiving a response, it sets the posts state variable with the retrieved data.
  */
  
  const fetchPosts = () => {
    setLoading(true); // Start loading spinner when fetching data
    fetch(`https://075588d3-6a91-4958-b560-4bf287cfade2-00-3aqtr78zcqhsa.picard.replit.dev/posts`)
    .then((response) => response.json())
    .then((data) => {
      setPosts(data);
      setLoading(false); // Stop loading spinner after data is fetched
    })
    .catch((error) => {
      console.error("Error:", error);
      setLoading(false); // Stop loading spinner on error
    });
  }
 
  console.log('All Posts', posts);
  // Display Top menu (Home, Add Post and Log out), Home page, hero picture, and All blog posts by routing to BlogPostCard
  return (
    <>
    {loading ? ( // Render loading spinner while fetching data
      <Row className="justify-content-center">
        <Spinner animation="border" className="mt-3" variant="primary" />
      </Row>
    ) : (
    <Col sm={12} className="bg-light" style={{ border: "1px solid lightgrey" }}>
      <Nav variant="pills" defaultActiveKey="/home" justify>
        <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/add">Add Post</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/logout">Logout</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3"></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-4"></Nav.Link>
        </Nav.Item>
      </Nav>
      <Image src={url} style={{ width: "100%", height: "600px" }}fluid />
      <br />
      <Image 
        src={pic}
        roundedCircle
        style={{
          width: 150,
          position: "absolute",
          top: "140px",
          border: "4px solid #F8F9FA",
          marginLeft: 15,
        }}
      />

      <Row className="justify-content-end">
        <Col xs="auto">
          <Button className="rounded-pill mt-2" variant="outline-secondary"  href="/logout">
            Logout
          </Button>
        </Col>
      </Row>

      <p className="mt-1" style={{ margin: 0, textAlign: "center", fontWeight: "bold", fontSize: "24px" }}>
        Kok Onn Chong Blog Posts
      </p>
      <p style={{ marginBottom: "2px"}}></p>
      <p>This is my Blog Posts. I post about virtually anything. It can be topics like A day in the Life of a Software Engineer to Animal Kingdom, King Kong vs. Godzilla.</p>
      <p>
        <strong>271</strong> Following <strong>610</strong> Followers
      </p>
      
      {posts.length > 0 && posts.map((post) => (       
        <BlogPostCard 
          key={post.id} 
          title={post.title}
          author={post.author}
          content={post.content} 
          postId={post.id}
          cookies={cookies}
         />
      ))}
    </Col>
     )}
   </>
  )
}