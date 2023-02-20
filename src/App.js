import React, { useEffect, useState } from 'react'
import {db} from "./firebase-config"
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { async } from '@firebase/util';

const App = () => {

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");


  const usersCollectionsRef = collection(db, "users");

  useEffect(() =>{
    const getUsers = async () =>{
       const data = await getDocs(usersCollectionsRef);
       setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));

    }

    getUsers();

  }, []);

  const createUser = async () =>{
    await addDoc(usersCollectionsRef, {name, age});
  }
  
  const updateUser = async (id, age) =>{
    const userDoc = doc(db, "users", id);
     const newField = {age: age+1};
     await updateDoc(userDoc, newField);

  }

  const delteUser = async (id) =>{
   const userDoc = doc(db, "users", id);

  await deleteDoc(userDoc);
  }
  return (
    <div className='app'>

      <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
      <input type="number" placeholder='Age' value={age} onChange={(e) => setAge(e.target.value)}/>
      <button onClick={createUser}>Create User</button>



      {
        users.map((user) => {
          return <div key={user.id}>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button onClick={()=>updateUser(user.id, user.age)}>Increase Age</button>
           <button onClick={()=>delteUser(user.id)}>Delete User</button>


          </div>
        })
      }
    </div>
  )
}

export default App