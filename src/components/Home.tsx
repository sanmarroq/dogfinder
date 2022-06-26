import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { FavoriteState } from "../type";
import IFavorite from "../types/Favorite";
import { AllBreeds } from "./AllBreeds";
import { FavoriteBreed } from "./FavoriteBreed";
export const Home = () => {

  const [filter, setFilter] = useState("");

  return (
    <Container>
      <Row>
        <Col className="text-center mt-5">
          <h1>Dog Finder</h1>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-5">
        <Col md="4" className="text-center">
          <Form.Group className="mb-3" controlId="breedText">
            <Form.Control type="text" placeholder="Breed Name"  onChange={e => setFilter( e.target.value )} />
            <Form.Text className="text-muted">Type a breed of dog</Form.Text>
          </Form.Group>
        </Col>
      </Row>
      <FavoriteBreed />
      <AllBreeds name={filter} />
    </Container>
  );
};
