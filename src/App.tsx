import { Container, Navbar } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { BreedDetail } from "./components/BreedDetail";
import { Home } from "./components/Home";

function App() {
  return (<>
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        Dog finder
      </Navbar.Brand>
    </Container>
  </Navbar>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:breed" element={<BreedDetail />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;
