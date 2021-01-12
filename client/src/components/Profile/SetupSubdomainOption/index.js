import React from "react";  
import axios from "axios";

// CSS
import { Col, Row } from "react-bootstrap"; 
import "./SetupSubdomainOption.css"

export default class SetupSubdomainOption extends React.Component { 
  constructor(props) { 
    super(props)

    this.state = { 
      url: "",
    }
  }

  handleKeyPress = (e) => { 
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    };
  }

  handleChange = (e) => { 
    const replaceSpace = e.target.value.replace(" ", "-").trim()

    this.setState({
      [e.target.name]: replaceSpace,
    });
  }

  handleSubmit = (e) => { 
    e.preventDefault(); 
    
    axios.post("/dns/create", { 
      url: this.state.url, 
    }).then(result => { 
      console.log(result)
    });
  }

  render() { 
    return ( 
      <Col> 
        <Row> 
          <Col xs={4} sm={4} md={4} lg={4} xl={4}> 
            <input 
              autocomplete="off"
              className="account-input" 
              name="url" 
              placeholder="your-website-name" 
              type="text" 
              onChange={this.handleChange} 
              onKeyPress={this.handleKeyPress}
              value={this.state.url}
            /> 
          </Col>
          <Col xs={2} sm={2} md={2} lg={2} xl={2} className="my-auto"> 
            .ryanbrown.xyz
          </Col>
        </Row>
        <Row>
          <Col xs={2} sm={2} md={2} lg={2} xl={2}>
            <button className="btn btn-primary mt-2" onClick={this.handleSubmit}>Create</button>
          </Col>
          <Col id="error">
            {this.state.error}
          </Col>
        </Row> 
      </Col>
    )
  }
}