import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup } from 'react-bootstrap';

function SearchBar() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const ep = parseInt(input);
    if (!isNaN(ep) && ep >= 1 && ep <= 1000) {
      navigate(`/episode/${ep}`);
    } else {
      alert('Enter a valid episode number (1–1000)');
    }
  };

  return (
    <Form onSubmit={handleSearch} className="my-4 d-flex justify-content-center">
      <InputGroup style={{ maxWidth: '300px' }}>
        <Form.Control
          type="number"
          placeholder="Enter episode number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" variant="primary">Go</Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBar;
