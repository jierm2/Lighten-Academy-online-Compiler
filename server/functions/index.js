// functions/index.js

const admin = require('firebase-admin');
admin.initializeApp();

const { onTaskCreate } = require('./task');

exports.onTaskCreate = onTaskCreate;
