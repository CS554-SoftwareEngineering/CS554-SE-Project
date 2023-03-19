import * as React from 'react';
import { Card, Form, Button, Spinner, Container, Row, Col } from 'react-bootstrap';
import FadeIn from 'react-fade-in';

import quizQuestions from '../../assets/quizQuestions.json'

import io from 'socket.io-client';
import TimerBar from "../TimerBar/TimerBar"

import {useLocation} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './GameScreen.css'

const socket = io('http://localhost:3005');


function GameScreen() {
  const location = useLocation();


  const quizQuestionsList = quizQuestions.questions
  
  const [currentQ, setCurrentQ] = React.useState(0) 

  const showNextquestion = () => {

    console.log("moving onto the next question")
    if(currentQ < quizQuestionsList.length-1){
      setCurrentQ(currentQ+1)
    }
    else{
      setShowFinished(true)
      setShowQuestions(false)
      stopCounterRepeatRef.current.stopCounterRepeat()
    }
  }

  const checkAnswer = (e) => {
    e.preventDefault();
    e.target.reset();

    // console.log('checking for: ', selectedOption)
    if(quizQuestionsList[currentQ].answer == selectedOption){
      setScore(score+1)
    }
    showNextquestion()
  }

  const nextQRef= React.useRef(null);


  const [player1, setPlayer1] = React.useState(location.state.name.nameValue) 
  const [player2, setPlayer2] = React.useState('Awaiting second player to join...')
  const [playerCount, setPlayerCount] = React.useState(1); 
  const [roomName, setRoomName] = React.useState(location.state.room.roomValue) 

  
  const [showQuestions, setShowQuestions] = React.useState(true) 
  const [showIntro, setShowIntro] = React.useState(false) 
  const [showFinished, setShowFinished] = React.useState(false) 

  React.useEffect(()=>{
    
    socket.on('connect', function() {
      const sessionID = socket.id; //
      console.log(sessionID, player1)
    });

    console.log({ player1, roomName })
    socket.emit('joinGame', { player1, roomName });

    // const timer = setTimeout(() => {
    //   setShowQuestions(true)
    //   setShowIntro(false)
    // }, 3000);
    // return () => clearTimeout(timer);
  },[])

  


  const stopCounterRepeatRef = React.useRef(null)

  
  const [selectedOption, setSelectedOption] = React.useState(0) 
  const handleOptionSelect = (event) => {
    setSelectedOption(0)
    console.log(`${player1} Selected option: `, event.target.value)
    setSelectedOption(event.target.value)
  }

  return (
    <div className='bg'>
      <div className="game-bg">
        <div className='game-details-container'>
          <div>
            <h2 className='game-heading'>
              Welcome, {location.state.name.nameValue}
            </h2>
            <h5 className="text">Game Room Session: {location.state.room.roomValue}</h5>
            {/* <h6 className="text mb-4" style={{fontStyle: "italic"}}>playing against <span style={{fontWeight: "500", fontStyle: "normal"}}>{player2}</span></h6> */}
          </div>
          {showTimer &&
          <TimerBar ref={stopCounterRepeatRef}/>
          }
        </div>

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
            // <FadeIn>
              <div className='trivia-card'>
                <Card>
                  <Card.Header>{quizQuestionsList[currentQ].question}</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <Form onSubmit={checkAnswer}>
                        <Form.Group>
                          {quizQuestionsList[currentQ].options.map((item, key) =>
                            <Form.Check>
                              <Form.Check.Input 
                                type="radio" name="grouped" inline 
                                id={`option-${key}`}
                                onChange={handleOptionSelect} 
                                value={item}
                              />
                              <Form.Check.Label for={`option-${key}`}>{item}</Form.Check.Label>
                            </Form.Check>
                          )}
                        </Form.Group>
                        
                      <Button className='mt-4' variant="primary" type='submit' ref={nextQRef}>Next</Button>
                      </Form>                    
                    </Card.Text>
                  </Card.Body>

                </Card>
              </div>
            // {/* </FadeIn> */}
            }

            {showFinished &&
              <div className='intro-card'>
                <Card>
                  <Card.Header>Game is finished!</Card.Header>
                  <Card.Header>Your score is, {player1} : {score}</Card.Header>
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