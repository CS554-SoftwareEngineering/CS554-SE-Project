import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import './Home.css'
import { Typography, TextField, Button, InputLabel, MenuItem, FormControl, Select} from '@mui/material';

function Home() {
  const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#65D1EF',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'grey',
    },
    '&:hover fieldset': {
      borderColor: 'black',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#65D1EF',
    },
  },
});

  const [room, setRoom] = React.useState('')
  const [name, setName] = React.useState('')

  const handleSelectRoom = (event) => {
    setRoom(event.target.value);
  };
  const handleName = (event) => {
    setName(event.target.value);
  };
  React.useEffect(() => {
    console.log('selected room: ', room)
  },[room])

  return (
    
    <div className='home-bg'>
      <div className='form-bg'>
        <Typography variant="h5" >TRIVIA GAME!</Typography>
        <div className='create-room-form'>
          <div className='label-heading'>
            <Typography className="label-heading" variant="p" >Create a Game Room Session: </Typography>
          </div>
          <div className='create-room-div'>
            <TextField id="standard-basic" className="text-primary" label="Session" variant="outlined" />
            <CssTextField label="Custom CSS" id="custom-css-outlined-input" />
            <Button className='button-primary' variant="contained">Create</Button>
          </div> 
          <div className='label-heading'>
            <Typography variant="p" >Select a Game Room Session to Join and Play: </Typography>        
          </div>
          
          <div className='join-room-div'>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={room}
                onChange={handleSelectRoom}
                label="Age"
              >
                <MenuItem value={"room 1"}>room 1</MenuItem>
                <MenuItem value={"room 2"}>room 2</MenuItem>
                <MenuItem value={"room 3"}>room 3</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained">Join and Play</Button>
          </div>        
        </div>
      </div>
      
    {/* <p>This is the homepage.</p> */}
    {/* <p>
      Data passed from backend: <%= locals.exampleText || "Default data passed"
      %>
    </p> */}
      {/* <div>
        <form id="create-room-form" action="">
          <div>
            <Typography variant="h6" >Create a Game Room Session: </Typography>
            <TextField id="outlined-basic" label="Session" variant="standard" />
            <Button variant="contained">Create</Button>
          </div>
          <div>
            <TextField id="outlined-basic" label="Name" variant="standard" />
          </div>
          <div>
            <Typography variant="h6" >Select a Game Room Session to Join and Play: </Typography>        <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={room}
              onChange={handleSelectRoom}
              label="Room"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'room 1'}>room 1</MenuItem>
              <MenuItem value={'room 2'}>room 2</MenuItem>
              <MenuItem value={'room 3'}>room 3</MenuItem>
            </Select>
            <Button variant="contained">Join and Play</Button>
          </div>
        </form>
        
      </div> */}
    </div>
  );
}

export default Home