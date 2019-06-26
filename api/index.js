const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp();

exports.main = functions.https.onRequest(async(req, res) => {
  console.log("iniciando função main");
  const db = admin.firestore();

  const data = { 'teste': 'teste' };
  const ref = await db.collection('notes').add(data);

  /*const dataList = [{ 'nome': 'abc' }, { 'nome': 'def' }];

  dataList.forEach(async function(obj){
    console.log("inserindo obj: " + obj);
    const outraRef = await db.collection('outra').add(obj);
    console.log("Document written with ID: ", outraRef.id);
  })*/

  console.log("carregando livros.json");
  var cargaLivros = {};
  try {
    cargaLivros = require('./livro/livro.json');
    console.log("livros.json carregado" + cargaLivros);
  } catch(e) {
    console.log("erro na carga de livros" + e);
    next(e);
  }
  

  //Se a coleção de livros estiver vazia, carregar livros a partir do json
  console.log('verificando se precisa carregar lista de livros...');
  if(db){
    try {
      const livrosSnapshot = await db.collection('livros').get();
      const livros = [];
      livrosSnapshot.forEach((doc) => {
        livros.push({
          id: doc.id,
          data: doc.data()
        });
      });
      if(livros.length > 0){
        console.log('base possui livros cadastrados. retornando lista de livros.');
        res.json(livros);
      } else {
        console.log('base de livros vazia');
      }
    } catch(e) {
      next(e);
    }
    
    cargaLivros.forEach(async function(livro){
      const livroRef = await db.collection('livros').add(livro);
      console.log("Carregado livro: ", livroRef.id + " - " + livroRef.nome);
    });

    /*var colecaoLivros = db.collection('livros');
    colecaoLivros.count(function(err, count){
      if(count === 0){
        colecaoLivros.insertMany(livros, function(err, r){
          if(err){
            console.log('erro ao inserir livros');
          }
          console.log('livros incluídos com sucesso: ' + r.insertedCount);
        });
      } else {
        console.log('coleção de livros já está carregada. não foi realizada nova carga de livros.')
      }
    });*/
  }

  res.json({
      'status': 'OK',
      'data': Date.now()
  });
  
});

