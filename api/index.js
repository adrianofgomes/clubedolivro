const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp();

exports.main = functions.https.onRequest(async(req, res) => {
  console.log("iniciando função main");
  const db = admin.firestore();

  const data = { 'teste': 'teste' };
  const ref = await db.collection('notes').add(data);

  const dataList = [{ 'nome': 'abc' }, { 'nome': 'def' }];

  dataList.forEach(async function(obj){
    console.log("inserindo obj: " + obj);
    const outraRef = await db.collection('outra').add(obj);
    console.log("Document written with ID: ", outraRef.id);
  })
  
  res.json({
      'status': 'OK',
      'ref': ref.id
  });
  
});

