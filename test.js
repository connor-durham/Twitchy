const response = require('cfn-response');
const aws = require('aws-sdk');
const mongoose = require('mongoose');
let conn = null;
const uri = "mongodb+srv://connor-durham:bg2987dw*@cluster0-mamux.mongodb.net/test?retryWrites=true&w=majority";
const identity = new aws.CognitoIdentityServiceProvider();
exports.handler = async (event, context, callback) => { 
    context.callbackWaitsForEmptyEventLoop = false;
    if (conn == null) {
    conn = await mongoose.createConnection(uri, {
      // Buffering means mongoose will queue up operations if it gets
      // disconnected from MongoDB and send them when it reconnects.
      // With serverless, better to fail fast if not connected.
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0 // and MongoDB driver buffering
    });
    conn.model('users', new mongoose.Schema({ username: String, email: String }));
  }
  const M = conn.model('users');
  const doc = await M.create({ username: event.userName, email: event.request.userAttributes.email });
  console.log(doc);
  context.done(null, event);
};