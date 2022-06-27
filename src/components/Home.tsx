import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FavoriteBreed } from "./FavoriteBreed";
export const Home = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");

  const goToAllElements = () => {
    navigate(`/allbreeds/${filter}`);
  };
  return (
    <Container className="dogBackgroundImageHome " fluid>
      <Row>
        <Col className="text-center mt-5">
          <h1>Explore All The Dog Breeds</h1>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-5 mb-3">
        <Col md="4" className="text-center">
          <Form.Group className="mb-3" controlId="breedText">
            <Form.Control
              autoComplete="false"
              type="text"
              placeholder="Type a breed..."
              onChange={(e) => setFilter(e.target.value)}
            />
            <Button className="d-inline mt-3" onClick={goToAllElements}>
              Go
            </Button>
            <p className="text-center mt-3">
              Or just see all <Link to="/allbreeds">here</Link>
            </p>
          </Form.Group>
        </Col>
      </Row>
      <FavoriteBreed />
    </Container>
  );
};
