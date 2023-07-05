
import { collection, addDoc, Timestamp } from 'firebase/firestore'; 
import { db } from '../config/firebase'; // make sure you export your firestore instance from this file


const addTask = async (task) => {
    try {
      const docRef = await addDoc(collection(db, "Tasks"), {
        taskDescription: task.description,
        taskID: task.idtoUpperCase(),
        taskName: task.title,
        taskType: task.type,  // You need to define this in the exercise object
      });
      // console.log("Task added with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding task: ", e);
    }
  };
  