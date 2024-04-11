import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function EditBlogPost({ postId, authToken, handleUpdate }) {
  //const { id } = useParams(); // Get the post ID from the URL
  //const [post, setPost] = useState({}); // State to store post data
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState(''); 

  useEffect(() => {
    // Fetch post details when the component mounts
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://https://075588d3-6a91-4958-b560-4bf287cfade2-00-3aqtr78zcqhsa.picard.replit.dev/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${authToken}` // Attach JWT token to request headers
          }
        });
        const postData = response.data;
        setTitle(postData.title);
        setAuthor(postData.author);
        setContent(postData.content);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [postId, authToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send updated post data to the backend
    try {
      await axios.put(`https://https://075588d3-6a91-4958-b560-4bf287cfade2-00-3aqtr78zcqhsa.picard.replit.dev/posts/${postId}`, {
      title: title,
      author: author,
      content: content
    },{
      headers: {
        Authorization: `Bearer ${authToken}` // Attach JWT token to request headers
      }
    });
    handleUpdate();     
    }
    catch (error) {console.error('Error updating post:', error);
     }
  };

  return (
    <div>
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
        <Button variant="primary" type="submit">
          Update Post
        </Button>
      </Form>
    </div>
  );
}


