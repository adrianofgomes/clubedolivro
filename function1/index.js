const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp();

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

exports.main = functions.https.onRequest(async(req, res) => {
  const db = admin.firestore();
  const data = { 'teste': 'teste' };
  const ref = await db.collection('notes').add(data);
  res.json({
      id: ref.id,
      data
  });
  
});

