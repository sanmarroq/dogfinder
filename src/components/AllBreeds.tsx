import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Navbar, Row, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import RequestService from "../services/RequestService";
import ICustomResponse from "../types/CustomResponse";
import { FaList } from "react-icons/fa";

export const AllBreeds = () => {
  const [breeds, setBreeds] = useState<Array<string>>([]);
  const [breedsFiltered, setBreedsFiltered] = useState<Array<string>>([]);
  let { name } = useParams();

  useEffect(() => {
    if (breeds.length === 0) {
      getBreeds();
    } else {
      if (name) {
        setBreedsFiltered(breeds.filter((breed) => breed.includes(name ?? "")));
      } else {
        setBreedsFiltered(breeds);
      }
    }
  }, [name]);

  const getBreeds = () => {
    RequestService.GetAll()
      .then((response: AxiosResponse<ICustomResponse<any>>) => {
        const keys = Object.keys(response.data.message);
        setBreeds(keys);
        setBreedsFiltered(keys.filter((breed) => breed.includes(name ?? "")));
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <Container className="dogBackgroundImageAllBreeds" fluid>
      <Container>
        <Row className="mt-4">
          <Col>
            <Link to="/">Go Back</Link>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h2>All breeds</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table responsive>
              <thead>
                <tr>
                  <th>Breed</th>
                  <th className="text-center">Detail</th>
                </tr>
              </thead>
              <tbody>
                {breedsFiltered.map((breed) => (
                  <tr key={breed}>
                    <td className="capitalize">{breed}</td>
                    <td className="text-center">
                      <Link to={`/detail/${breed}`}>
                        <FaList />
                      </Link>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
