import * as React from "react";
import { Button, Form, Container, Row, Col, Dropdown } from 'react-bootstrap';

import { useNavigate } from "react-router-dom";


import FadeIn from 'react-fade-in';




import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

function Home() {
  const [roomValue, setRoom] = React.useState("Select a Room");
  const [nameValue, setName] = React.useState("");

  const navigate = useNavigate();

  const handleSelectRoom = (event) => {
    console.log("selected room : ", event.target.innerText);
    setRoom(event.target.innerText);
  };
  const handleName = (event) => {
    setName(event.target.value);
  };

  const enterGameRoom = (event) => {
    event.preventDefault();

    // console.log("submitted value : ", [name, room]);
    // window.location.replace("/game");
    navigate('/game',{state:{
      name:{nameValue},
      room:{roomValue} 
    }});

  };

  return (
    <div className="bg">
      <div className="form-bg">
        <FadeIn>
         <h2 className="form-heading mb-4 mt-4">CLASH OF SOFTWARE ENGINEERS</h2>
        </FadeIn>
      <FadeIn delay={1000}>  
        <Form onSubmit={enterGameRoom}>
          <Container>
            <Row>
              <Col sm={6}>
                <Form.Group className="mb-4 mt-4" controlId="formBasicName">
                  {/* <Form.Label>Name</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="Player Name"
                    value={nameValue}
                    onChange={handleName}
                  />
                  {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text> */}
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group className="mb-4 mt-4" controlId="formBasicSession">
                  {/* <Form.Label>Select a Game Room Session to Join and Play:</Form.Label> */}
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {roomValue}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="" value="Room 1" onClick={handleSelectRoom}>Room 1</Dropdown.Item>
                      <Dropdown.Item href="" value="Room 1" onClick={handleSelectRoom}>Room 2</Dropdown.Item>
                      <Dropdown.Item href="" value="Room 1" onClick={handleSelectRoom}>Room 3</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  {/* <Form.Select
                    aria-label="Default select example"
                    value={roomValue}
                    onChange={handleSelectRoom}
                  >
                    <option value="Room 1">Room 1</option>
                    <option value="Room 2">Room 2</option>
                    <option value="Room 3">Room 3</option>
                  </Form.Select> */}
                </Form.Group>
              </Col>
            </Row>
          </Container>
          <Form.Group className="mb-4 mt-4" controlId="formBasicPassword">
            <Button variant="primary" type="submit">
              ENTER
            </Button>
          </Form.Group>
        </Form>
      </FadeIn>
      </div>
    </div>
  );
}

export default Home;
