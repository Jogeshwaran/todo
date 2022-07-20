import { Button,FormControl,InputLabel,Input } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './App.css';
import Todo from './Components/Todo-component';
import {collection, doc, getDocs, onSnapshot,query, setDoc,serverTimestamp, orderBy } from 'firebase/firestore';

import db from './firebase.js';

const App =() =>{
  // we are going to need a state to store temporarily our toDos instead of doing it manually
  const [todos,setTodos] = useState([])
  const [input,setInput] = useState('')

  //When the app loads , we need to listen to the database and fetch new todos whether they get added/removed
  // for that we using the Useeffect hook

  useEffect(()=>{
    //this fires when the app.js loads
    //everytime the db changes we want to fireoff an event i.e snapshot
    // docs => the value we added to the collection of todos i.e every single value
    //doc.data() => gives back all of the documents data in form of an object
   const addTodos = async() =>{
    const collectionRef = collection(db,'todos')
    //console.log(collectionRef);
    const q = query(collectionRef,orderBy('timestamp','desc'));
    
 
    const querySnapshot = await getDocs(q)
    //console.log(querySnapshot);
   
    //console.log(querySnapshot.docs.map(doc => doc.data()))
    setTodos(querySnapshot.docs.map(doc => doc.data().todo))
   }
    
   addTodos();

  },[])

  const onChangeHandler = (event) =>{
    setInput(event.target.value)
  }

  const onClickHandler =(event) =>{
    event.preventDefault();
    //Basically what it does means it keeps whatever we have in the array before and it appends the 
    //elements that we are passing it to the array.
    const collectionRef = collection(db,'todos')
    const docRef = doc(collectionRef)
    setDoc(docRef,{todo:input , timestamp : serverTimestamp() })
    setTodos([...todos,input])
    //To clear the input field we have to set the state to empty
    setInput('')
  }

  return(
    
    //now we are going to get input from the user and we are appending it to the todos state Array

    // 1. For this we are going to get the value of the input
    //   -> set the value of the input field to the initital value of the input State 
    // 2. To set the value of the input State we are going to need to capture the event that is triggered while 
    //any keyboard event is triggered in the input Field
        //-> We could do that using the Onchange and give it a handler function and set the input to the events value
    //3. we got our user typed value, now we are going to do is once button is clicked we are going to add the 
    // user typed value to the todo array.
    // 4. for this we are going to create a onclickHandler
    <div className='App'>
      {/* for enter button fucntionlaity we are wrapping it in a form */}
      <form>
        <FormControl>
          <InputLabel>Write a Todo ✅</InputLabel>
          <Input value={input} onChange = {onChangeHandler}/>
        </FormControl>
      {/* <input/> */}
      {/* We are disabling the button when input is null */}
      <Button type='submit' disabled = {!input} onClick={onClickHandler} variant="contained">Add Todo</Button>
      {/* <button type='submit' onClick={onClickHandler}>Add</button> */}
      </form>
{/* to dynamically display the list of todos we are going to use the map fucntion  
  we are running map on the todos array and we are getting a single todo and then displaying it
*/}
      <Todo todos={todos}/>
    </div>
  )
}

export default App;
