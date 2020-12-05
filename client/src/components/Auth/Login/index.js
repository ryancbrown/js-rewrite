import React from "react";  
import axios from "axios";

// CSS
import { Col, Row } from "react-bootstrap"; 
import "../Auth.css";

export default class Login extends React.Component { 
  constructor(props) { 
    super(props)

    this.state = { 
      email: "", 
      password: "",
      passwordToggle: true, 
      error: "",
    }
  }

  handleKeyPress = (e) => { 
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    };
  }

  handleChange = (e) => { 
    const input = e.target.value.trim(); 

    this.setState({
      [e.target.name]: input,
    });
  }

  handleToggle = (e) => { 
    const toggleState = this.state.passwordToggle; 
    
    if (toggleState) { 
      this.setState({ 
        passwordToggle: false
      });
    }
    
    if (!toggleState) { 
      this.setState({ 
        passwordToggle: true
      });
    };
  }

  handleSubmit = (e) => { 
    e.preventDefault(); 
    
    axios.post("/auth", { 
      email: this.state.email, 
      password: this.state.password, 
      type: "sign-in", 
    }).then(result => { 
      if (result.data.status === 403) { 
        this.setState({ 
          error: result.data.error.message, 
        });
      } else if (result.data.status === 200) { 
        this.setState({ 
          error: "", 
        });
      }
    });
  }

  render() { 
    return ( 
      <Col> 
        <Row> 
          <Col> 
            <input 
              className="auth-input" 
              name="email" 
              placeholder="Email" 
              type="text" 
              onChange={this.handleChange} 
              onKeyPress={this.handleKeyPress}
            /> 
          </Col>
        </Row>
        <Row>
          <Col>
            <input 
              className="auth-input" 
              name="password" 
              placeholder="Password" 
              type={this.state.passwordToggle ? "password" : "text"} 
              onChange={this.handleChange} 
              onKeyPress={this.handleKeyPress}
            /> 
          </Col>
          <span className="auth-password-toggle" onClick={this.handleToggle}>{this.state.passwordToggle ? "SHOW PASSWORD" : "HIDE PASSWORD"}</span>
        </Row>
        <Row>
          <Col xs={2} sm={2} md={2} lg={2} xl={2}>
            <button className="btn btn-primary mt-2" onClick={this.handleSubmit}>Sign in</button>
          </Col>
          <Col id="error">
            {this.state.error}
          </Col>
        </Row> 
      </Col>
    )
  }
}