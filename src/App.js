import React, {useEffect, useState} from 'react';
import axios from 'axios'
import './App.css';
import { Formik } from 'formik';

const URL = 'https://rickandmortyapi.com/api/character/';

function App() {

  const [data, setData] = useState([]);

  //Getting the Data

  const getData = async () => {
    await axios.get(URL)
      .then(response => {
        console.log(response.data); 
      })
  }
  
  useEffect(async() => {
    await getData();
  }, []);


const validEmail = (values) => { 
  
  const errors={};

  if(!values.email){
    errors.email = 'required' 
  }else if(values.email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
    errors.email = 'insert a valid email';
  }

  return errors;
}


const checkEmail = async (email) => {
  
  try{
    const existence = await axios.post("URLchckingExistence", email);
    
    console.log(existence);
  } catch(error){
    console.error(error)
  }

  // await axios.post(URLchckingExistence, email)
  //   .then(response=>{
  //     console.log(response);
  //   })
  
  console.log(email);
  
}

  return (
    <Formik initialValues={{"email":"",}} onSubmit={checkEmail} validate={validEmail}>
      {({values, errors, handleSubmit, handleChange})=>(
        <form onSubmit={handleSubmit}>
          <input id="email" name="email" type="email" onChange={handleChange} value={values.email} />
          {errors.email}
          <button type='submit'>Submit</button>
        </form>
      )}
    </Formik>
  );
}

export default App;
