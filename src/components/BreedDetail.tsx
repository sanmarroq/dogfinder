import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import RequestService from "../services/RequestService";
import ICustomResponse from "../types/CustomResponse";
import { VariantCard } from "./VariantCard";
import Modal from "react-bootstrap/Modal";
import { CardDetail } from "./CardDetail";
import { AddFavorite } from "../store/ActionCreators";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { FaFlushed } from "react-icons/fa";

export const BreedDetail = () => {
  const [show, setShow] = useState(false);
  const dispatch: Dispatch<any> = useDispatch();
  const [variants, setVariants] = useState<Array<string>>([]);
  const [variantSelected, setVariantSelected] = useState<string>("");

  let { breed } = useParams();

  useEffect(() => {
    GetBreedVariants();
  }, []);

  const SaveFavorite = () => {
    dispatch(AddFavorite({ breed: breed!, variant: variantSelected }));
    setShow(false);
  };
  const GetBreedVariants = () => {
    RequestService.GetBreedVariants(breed!)
      .then((response: AxiosResponse<ICustomResponse<string[]>>) => {
        setVariants(response.data.message);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const handleShow = (variant: string) => {
    setVariantSelected(variant);
    setShow(true);
  };

  const handleClose = () => setShow(false);
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col md="4">
            <Link to="/allbreeds">Go Back</Link>
          </Col>
        </Row>
        <Row className=" mt-3">
          <Col md="4">
            <h2>Breed Detail</h2>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-2">
          <Col md="4" className="text-center">
            <h1 className="secondaryTitleColor capitalize">{breed}</h1>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md="4">
            <h3 className="secondaryTitleColor">Variants:</h3>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-3">
          {variants.length === 0 ? (
            <Col className="text-center mt-5">
              <FaFlushed size={150} />
              <h2 className="secondaryTitleColor">
                {" "}
                No variants for this Breed
              </h2>
            </Col>
          ) : (
            variants.map((variant) => (
              <Col key={variant} className="mt-3">
                <VariantCard
                  onModalOpen={handleShow}
                  breed={breed ?? ""}
                  variant={variant}
                />
              </Col>
            ))
          )}
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="capitalize">{variantSelected}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardDetail breed={breed ?? ""} variant={variantSelected} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={SaveFavorite}>
            <FaHeart /> Favorite
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
