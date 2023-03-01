import * as React from 'react';
import { Card, Form, Button, Spinner, Container, Row, Col } from 'react-bootstrap';

import FadeIn from 'react-fade-in';

import quizQuestions from '../../assets/quizQuestions.json'


import {useLocation} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './GameScreen.css'

function GameScreen() {
  const location = useLocation();

  const [timeLeft, setTimeLeft] = React.useState(100)

  React.useEffect(()=>{
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft-1)
    }, 50);
    return () => clearTimeout(timer);
  },[timeLeft])


  const quizQuestionsList = quizQuestions.questions
  
  const [currentQ, setCurrentQ] = React.useState(0) 

  const showNextquestion = (e) => {
    e.preventDefault();
    e.target.reset();
    console.log('Getting on next question')
    if(currentQ < quizQuestionsList.length-1){
      setCurrentQ(currentQ+1)
      setTimeLeft(100)
    }
    else{
      setShowFinished(true)
      setShowQuestions(false)
    }
  }

  const [player1, setPlayer1] = React.useState(location.state.name.nameValue) 
  const [player2, setPlayer2] = React.useState('second player') //we will have to set this value from server as soon as second player joins

  
  const [showQuestions, setShowQuestions] = React.useState(false) 
  const [showIntro, setShowIntro] = React.useState(true) 
  const [showFinished, setShowFinished] = React.useState(false) 

  React.useEffect(()=>{
    const timer = setTimeout(() => {
      setShowQuestions(true)
      setShowIntro(false)
    }, 3000);
    return () => clearTimeout(timer);
  },[])
  



  
  const [selectedOption, setSelectedOption] = React.useState(0) 
  const handleOptionSelect = (event) => {
    console.log('Selected option: ', event.target.value)
  }

  return (
    <div className='bg'>
      {/* <div className='score-bar'>
        <Container>
          <Row>
            <Col><span>{player1}</span></Col>
            <Col><span>{player2}</span></Col>
          </Row>
        </Container>
      </div> */}
      <div className="game-bg">
        {/* <h1 className="form-heading mb-4 mt-4">CLASH OF SOFTWARE ENGINEERS</h1> */}
        <h2 className='game-heading'>
          Welcome, {player1}
        </h2>
        <h5 className="text">Game Room Session: {location.state.room.roomValue}</h5>
        <h6 className="text mb-4" style={{fontStyle: "italic"}}>playing against <span style={{fontWeight: "500", fontStyle: "normal"}}>{player2}</span></h6>

        <Card className='game-card'>          
          <Card.Body>
            {showIntro &&
              <div className='intro-card'>
                <Card.Text>
                  You are about to start the quiz. waiting for other player to join.
                </Card.Text>
              
                <div className='spinner-container'>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>  
              </div>
            }

            {showQuestions &&
            <FadeIn>
              <div className='trivia-card'>
                <Card>
                  <Card.Header>{quizQuestionsList[currentQ].question}</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <Form onSubmit={showNextquestion}>
                        <Form.Group>
                          {quizQuestionsList[currentQ].options.map((item, key) =>
                            <Form.Check>
                              <Form.Check.Input 
                                type="radio" name="grouped" required inline 
                                id={`option-${key}`}
                                onChange={handleOptionSelect} 
                                value={item}
                              />
                              <Form.Check.Label for={`option-${key}`}>{item}</Form.Check.Label>
                            </Form.Check>
                          )}
                        </Form.Group>
                        
                      <Button className='mt-4' variant="primary" type='submit'>Next</Button>
                      </Form>                    
                    </Card.Text>
                  </Card.Body>

                </Card>
              </div>
            </FadeIn>
            }

            {showFinished &&
              <div className='intro-card'>
                <Card>
                  <Card.Header>Game is finished!</Card.Header>
                </Card>
              
                <div className='spinner-container'>
                </div>  
              </div>
            }
            

          </Card.Body>
        </Card>

      </div>
    </div>
  );
}

export default GameScreen;