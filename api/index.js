const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp();

exports.main = functions.https.onRequest(async(req, res) => {
  const db = admin.firestore();
  const data = [{ 'nome': 'abc' }, { 'nome': 'def' }];

  data.forEach(function(obj){
    const ref = await db.collection('notes').add(data);
    console.log("Document written with ID: ", ref.id);
  })

  
  res.json({
      'status': 'OK'
  });
  
});

