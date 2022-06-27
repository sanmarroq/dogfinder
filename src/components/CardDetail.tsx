import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import RequestService from "../services/RequestService";
import ICustomResponse from "../types/CustomResponse";

type CardDetailProps = {
  breed: string;
  variant: string;
};

export const CardDetail = ({ breed, variant }: CardDetailProps) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    getVariantImages();
  }, []);
  const getVariantImages = () => {
    RequestService.GetBreedVariantImages(breed!, variant)
      .then((response: AxiosResponse<ICustomResponse<string[]>>) => {
        setImages(response.data.message);
        console.log(response);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return (
    <Carousel>
      {images.map((image) => (
        <Carousel.Item key={image}>
          <img
            className="d-block w-100 CarrouselImage"
            src={image}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 className="capitalize">{variant}</h3>
            <p className="capitalize">{breed}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
