// Dependencies
import React from "react";

// Components 
import { Login } from "./components/Auth"

// CSS
import { Container, Row } from "react-bootstrap"; 

function App() {
  return (
    <div className="App">
      <Container>
        <Row> 
          <Login />
        </Row>
      </Container>
    </div>
  );
}

export default App;
