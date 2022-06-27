import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { Col, Row, Button, Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FavoriteState } from "../type";
import IFavorite from "../types/Favorite";
import { Dispatch, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import RequestService from "../services/RequestService";
import ICustomResponse from "../types/CustomResponse";
import { RemoveFavorite } from "../store/ActionCreators";
import Image from "react-bootstrap/Image";

export const FavoriteBreed = () => {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState<string>("");
  const dispatch: Dispatch<any> = useDispatch();
  const [favorite, setFavorite] = useState<IFavorite | undefined>(undefined);
  const favoriteData: IFavorite | undefined = useSelector(
    (state: FavoriteState) => state.favorite,
    shallowEqual
  );

  useEffect(() => {
    if (favoriteData) {
      setFavorite(favoriteData);
      getVariantImages();
    }
  }, [favoriteData]);

  const RemoveFavoriteBreed = () => {
    setFavorite(undefined);
    dispatch(RemoveFavorite);
  };

  const getVariantImages = () => {
    RequestService.GetBreedVariantImages(
      favoriteData?.breed!,
      favoriteData?.variant!
    )
      .then((response: AxiosResponse<ICustomResponse<string[]>>) => {
        setImage(response.data.message.shift() ?? "");
        console.log(response);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  if (favorite !== undefined && favorite?.breed !== "") {
    return (
      <>
        <Row className="justify-content-md-center mb-2">
          <Col md="4" className="text-center">
            <h3
              className="d-inline favoriteTextTitle capitalize"
              onClick={handleShow}
            >
              <FaHeart className="heartStyle" size={40} /> See your favorite{" "}
              <a className="favoriteTextTitle" href="#">
                {" "}
                {favorite?.breed} - {favorite?.variant}
              </a>
            </h3>
          </Col>
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="capitalize">
              {favorite?.breed} {favorite?.variant}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image width={450} src={image} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={RemoveFavoriteBreed} variant="primary">
              Remove
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <Row className="justify-content-md-center">
          <Col md="4" className="text-center">
            <h3 className="d-inline favoriteTextTitle">
              <FaHeartBroken className="heartStyle" size={40} /> Here you will
              see your favorite breed
            </h3>
          </Col>
        </Row>
      </>
    );
  }
};
