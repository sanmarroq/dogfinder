import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import RequestService from "../services/RequestService";
import ICustomResponse from "../types/CustomResponse";
type AllBreedsProps = {
  name: string;
};
export const AllBreeds = ({ name }: AllBreedsProps) => {
  const [breeds, setBreeds] = useState<Array<string>>([]);
  const [breedsFiltered, setBreedsFiltered] = useState<Array<string>>([]);

  useEffect(() => {
    if (breeds.length === 0) {
      getBreeds();
    } else {
      if (name) {
        setBreedsFiltered(breeds.filter(breed=>breed.includes(name)));
      }else{
        setBreedsFiltered(breeds);
      }
    }
  }, [name]);

  const getBreeds = () => {
    RequestService.GetAll()
      .then((response: AxiosResponse<ICustomResponse<any>>) => {
        const keys = Object.keys(response.data.message);
        setBreeds(keys);
        setBreedsFiltered(keys);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return (
    <>
      <Row className="mt-5">
        <Col>
          <h2>All breeds</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Breed</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {breedsFiltered.map((breed) => (
                <tr key={breed}>
                  <td>{breed}</td>
                  <td>
                    <Link to={`/detail/${breed}`}>Go</Link>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};
