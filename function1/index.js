/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {
  let message = req.query.message || req.body.message || 'Hello World from GitHub!';
  res.status(200).send(message);
};

exports.main = (req, res) => {
  const admin = require('firebase-admin');
  const functions = require('firebase-functions');

  admin.initializeApp(functions.config().firebase);
  
  var db = admin.firestore();

  var docRef = db.collection('users').doc('alovelace');

  var setAda = docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
  });

  db.collection('users').get()
    .then((snapshot) => {
      /*snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });*/
      res.status(200).send(message);
    })
    .catch((err) => {
      //console.log('Error getting documents', err);
      res.status(500).send('Error getting documents\n\n' + err);
    });
  
  let message = req.query.message || req.body.message || 'Hello from main!';
  res.status(200).send(message);

};

