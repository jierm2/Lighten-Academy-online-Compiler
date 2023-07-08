
import { addDoc, collection, Timestamp, getDocs } from 'firebase/firestore'; 
import { db } from '../config/firebase';

export const addUser = async (user) => {
    try {
      // console.log('begin add user');
      await addDoc(collection(db, "Users"), {
        email: user.email,
        fullName: user.fullName,
        joinDate: Timestamp.fromDate(new Date()), // current date
        userID: user.userID,
        vip: false,
      });
      // console.log("User added with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding user: ", e);
    }
  };
  
  export const addProgressForTasks = async (userID) => {
    try {
      // Step 1: Retrieve task IDs from the 'task' entity
      const taskSnapshot = await getDocs(collection(db, 'Tasks'));
      const taskIds = taskSnapshot.docs.map((doc) => {
        const data = doc.data(); // Access the data of each document
        const taskId = doc.id; // Access the document ID
        return { taskId, ...data };
      });
  
      // console.log('Task IDs:', taskIds);
  
      // console.log('printing',taskSnapshot)
  
      // Step 2: Create progress records based on the task IDs
      const progressPromises = taskIds.map(async (taskId) => {
        // console.log('task idddd is',userID,'taskid',taskId)
  
        await addDoc(collection(db, 'Progress'), {
          userID,
          taskID: taskId,
          completed: false,
          completionDate: null,
        });
      });
  
      // Step 3: Wait for all progress records to be created
      await Promise.all(progressPromises);
      // console.log(progressPromises)
      // console.log("Progress records created for tasks.");
    } catch (e) {
      // console.error("Error adding progress records: ", e);
    }
  };