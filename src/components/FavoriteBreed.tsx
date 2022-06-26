import { FaHeart } from "react-icons/fa";
import { Col, Row, Card, Button } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { FavoriteState } from "../type";
import IFavorite from "../types/Favorite";
export const FavoriteBreed = () => {

    const favorite: IFavorite|undefined = useSelector(
        (state: FavoriteState) => state.favorite,
        shallowEqual
      )
  return (
    <>
      <Row className="justify-content-md-center">
        <Col md="4" className="text-center">
          <h2 className="d-inline">
            <FaHeart size={50} /> {favorite?.variant}
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="3" className="text-center">
        
          <Card style={{ width: "11rem" }} className="text-center"> 
            <Card.Img
              variant="top"
              src="https://www.akc.org/wp-content/uploads/2017/11/Siberian-Husky-standing-outdoors-in-the-winter.jpg"
            />
            <Card.Body>
              <Card.Title>My Favorite dog</Card.Title>
              <Card.Text>
                Some 
              </Card.Text>
              <Button variant="primary">Show</Button>
            </Card.Body>
          </Card>
         
        </Col>
      </Row>
    </>
  );
};
