// functions/task.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const onTaskCreate = functions.firestore
    .document('Tasks/{taskId}')
    .onCreate(async (snap, context) => {
        const newTaskId = snap.id;  // The ID of the newly created task.
        
        // Get all the users.
        const usersSnapshot = await admin.firestore().collection('Users').get();
        
        // For each user, create a new progress record for the new task.
        const promises = [];
        usersSnapshot.forEach(doc => {
            const userId = doc.id;  // The ID of the current user.
            
            // Create a new progress record.
            const promise = admin.firestore().collection('Progress').add({
                userID: userId,
                taskID: newTaskId,
                completed: false,
                completionDate: null,
            });
            
            promises.push(promise);
        });
        
        // Wait for all the progress records to be created.
        await Promise.all(promises);
        
        console.log(`Created progress records for new task ${newTaskId}.`);
    });

module.exports = {
    onTaskCreate,
}
