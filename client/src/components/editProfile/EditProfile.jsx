import { Button, MenuItem, TextField } from '@mui/material'
import { Container } from '@mui/system'
import './editProfile.css'
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function EditProfile({user}) {
  const { user : currentUser } = useContext(AuthContext);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [desc, setDesc] = useState(user.desc);
  const [city, setCity] = useState(user.city);
  const [from,setFrom] = useState(user.from);
  const [relationship,setRelationship] = useState(user.relationship);

  const status = [
    {
      value: 1,
      label: 'Single',
    },
    {
      value: 2,
      label: 'Married',
    },
    {
      value: 3,
      label: 'None',
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editUser = {
      ...user,
      userId: currentUser._id,
      desc: desc,
      username: username,
      email: email,
      city: city,
      from: from,
      relationship: relationship,
    };
    try {
      await axios.put("/users/"+ user._id, editUser);
      window.location.reload();
    } catch (err) {}
  };

  return (
  <Container style={{marginTop: '5%'}}>
    <form onSubmit={handleSubmit}>
      <div className="flex">
      <div className="usernameField">
    <h4>Username:</h4>
    <TextField
    id="filled-basic"
    label="Username"
    value={username}
    variant="filled"
    InputProps={{
      readOnly: true,
    }}
    helperText="You can't Change your username"
    onChange={(e)=> setUsername(e.target.value)}
    />
    </div>

      <div className="usernameField">
    <h4>Marital Status:</h4>
    <TextField
          select
          label="Select"
          value={relationship}
          helperText="Please select your Marital Status"
          onChange={(e)=> setRelationship(e.target.value)}
        >
          {status.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </div>
      </div>
    
    <div className="usernameField">
    <h4>Email:</h4>
    <TextField
    id="filled-basic"
    type='email'
    label="Email"
    value={email}
    style={{width:"60%"}}
    variant="filled"
    onChange={(e)=> setEmail(e.target.value)}
    />
    </div>
    <div className="usernameField">
    <h4>Bio:</h4>
    <TextField
          id="filled-multiline-static"
          label="Add Your Bio"
          style={{width:"60%"}}
          multiline
          rows={4}
          value={desc}
          variant="filled"
          onChange={(e)=> setDesc(e.target.value)}
        />
    </div>
    <div className="flex">

    <div className="usernameField">
    <h4>City:</h4>
    <TextField
    id="filled-basic"
    value={city}
    variant="filled"
    onChange={(e)=> setCity(e.target.value)}
    />
    </div>
    <div className="usernameField">
    <h4>From:</h4>
    <TextField
    id="filled-basic"
    value={from}
    variant="filled"
    onChange={(e)=> setFrom(e.target.value)}
    />
    </div>
    </div>
    <div className="submit-btn">
    <Button variant="contained" color="success" type="submit">Submit</Button>
    </div>
    </form>
    </Container>
  )
}
