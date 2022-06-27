import { Col, Container, Navbar, Row } from "react-bootstrap";
import { FaDog } from "react-icons/fa";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./style/stylesheet.scss";
import { BreedDetail } from "./components/BreedDetail";
import { Home } from "./components/Home";
import { AllBreeds } from "./components/AllBreeds";

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <FaDog size={50} /> Dog Finder
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>About us</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:breed" element={<BreedDetail />} />
        <Route path="/allbreeds/:name" element={<AllBreeds />} />
        <Route path="/allbreeds" element={<AllBreeds />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
