// Dependencies
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

// Components 
import { Login } from "./components/Auth"
import SetupSubdomainOption from "./components/Profile/SetupSubdomainOption";

// CSS
import { Container, Row } from "react-bootstrap"; 

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount = () => {

  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render={props => (
              <>
                <Container fluid className="px-0 pt-2">
                  <Login /> 
                </Container>
              </>
            )}
          />
        </Switch>
        <Switch>
          <Route
            exact
            path="/account"
            render={props => (
              <Container fluid className="px-0 pt-2">
                <SetupSubdomainOption />
              </Container>
            )}
          />
        </Switch>
      </Router>
    );
  }
}
