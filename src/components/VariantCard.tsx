import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import RequestService from "../services/RequestService";
import ICustomResponse from "../types/CustomResponse";
import Spinner from "react-bootstrap/Spinner";
type VariantCardProps = {
  breed: string;
  variant: string;
  onModalOpen: (variant: string) => void;
};
export const VariantCard = ({
  breed,
  variant,
  onModalOpen,
}: VariantCardProps) => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    getVariantImages();
  }, []);
  const getVariantImages = () => {
    RequestService.GetBreedVariantImages(breed!, variant)
      .then((response: AxiosResponse<ICustomResponse<string[]>>) => {
        setImage(response.data.message.shift() ?? "");
        console.log(response);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const buttonClick = () => {
    onModalOpen(variant);
  };
  if (image) {
    return (
      <>
        <Card style={{ width: "18rem", height: "22rem" }}>
          <Card.Img variant="top" src={image} height="200" width="100" />
          <Card.Body>
            <Card.Title className="capitalize">{variant}</Card.Title>
            <Button onClick={buttonClick} variant="primary">
              Learn More
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    return (
      <Card style={{ width: "18rem" }}>
        <Spinner animation="grow" />
        <Card.Body>
          <Card.Title>Loading...</Card.Title>
        </Card.Body>
      </Card>
    );
  }
};
