import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import RequestService from "../services/RequestService";
import ICustomResponse from "../types/CustomResponse";
import { VariantCard } from "./VariantCard";
import Modal from "react-bootstrap/Modal";
import { CardDetail } from "./CardDetail";
import { AddFavorite } from "../store/ActionCreators";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

export const BreedDetail = () => {
  const [show, setShow] = useState(false);
  const dispatch: Dispatch<any> = useDispatch()
  const [variants, setVariants] = useState<Array<string>>([]);
  const [variantSelected, setVariantSelected] = useState<string>("");

  let { breed } = useParams();

  useEffect(() => {
    GetBreedVariants();
  }, []);

  const SaveFavorite=()=>{
    dispatch(AddFavorite({breed:breed!,variant:variantSelected}));
    setShow(false);
  }
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
        <Row className="justify-content-md-center mt-5">
          <Col md="4">
            <h1>Breed Detail</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-5">
          <Col md="4">
            <h1>{breed?.toUpperCase()}</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-5">
          <Col md="4">
            <h1>Sub Breeds</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-5">
          {variants.map((variant) => (
            <Col key={variant} className="mt-3">
              <VariantCard
                onModalOpen={handleShow}
                breed={breed ?? ""}
                variant={variant}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardDetail breed={breed ?? ""} variant={variantSelected} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={SaveFavorite}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
