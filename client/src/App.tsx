import { useEffect, useState } from "react";
import axios from "axios";

import { Button, FormHelperText, MenuItem, Select, TextField } from "@mui/material";

//Types
import { NounType } from "./Types/WordTypes";


function App() {

  const [babbler, setBabbler] = useState('');
  const [noun, setNoun] = useState('');
  const [allNouns, setAllNouns] = useState<NounType[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api')
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.error(error);
      })
  }, []);

  const handleBabblerChange = (e: any) => {
    setBabbler(e.target.value);
  }

  const handleGetNouns = () => {
    axios.get('/api/words/loadNouns')
      .then((response) => {
        setAllNouns(response.data);
      }).catch((error) => {
        console.error("Error fetching nouns", error);
      })
  }

  const handleAddNoun = () => {
    axios.post('/api/words/AddOneNoun', { noun })
      .then((response) => {
        console.log(response);
        setNoun('');
        handleGetNouns();
      }).catch((error) => {
        console.log("Error adding noun", error);
        setError(error.response.data.message);

      })
  }

  const handleDeleteNoun = (id: string) => {
    axios.delete(`/api/words/deleteOneNoun/${id}`,)
      .then(() => {
        handleGetNouns();
      }).catch((error) => {
        console.error(error);
      })
  }

  return (
    <div>
      <div>
        <h1>Trans Babbler</h1>
        {error !== '' &&
          <p>{error}</p>
        }
        <TextField required label="noun" variant="outlined" value={noun} onChange={(e) => setNoun(e.target.value)} />
        <Button variant="contained" color="secondary" onClick={handleAddNoun}>Add Noun</Button>
        <Button variant="contained" color="secondary" onClick={handleGetNouns}>Load All Nouns</Button>
      </div>
      <div>
        <Select
          sx={{
            minWidth: 120

          }}
          variant="filled"
          color="secondary"
          value={babbler}
          label="Babbler"
          onChange={handleBabblerChange}>
          <MenuItem value={"babblerOne"}>Babbler One</MenuItem>
          <MenuItem value={"babblerTwo"}>Babbler Two</MenuItem>
          <MenuItem value={"babblerThree"}>Babbler Three</MenuItem>
        </Select>
        <FormHelperText>Choose your Babbler</FormHelperText>
      </div>
      <div>
        {allNouns.length > 0 &&
          allNouns.map((item) => (
            <p key={item._id.toString()}>{item.noun} <a onClick={() => handleDeleteNoun(item._id.toString())} style={{
              cursor: 'pointer',
              color: 'red',
              marginLeft: 15
            }}>X</a>
            </p>
          ))
        }

      </div>
    </div>
  )
}

export default App
