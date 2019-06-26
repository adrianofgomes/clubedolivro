const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp();

exports.main = functions.https.onRequest(async(req, res) => {
  console.log("iniciando função main");
  const db = admin.firestore();

  //const data = { 'teste': 'teste' };
  //const ref = await db.collection('notes').add(data);

  /*const dataList = [{ 'nome': 'abc' }, { 'nome': 'def' }];

  dataList.forEach(async function(obj){
    console.log("inserindo obj: " + obj);
    const outraRef = await db.collection('outra').add(obj);
    console.log("Document written with ID: ", outraRef.id);
  })*/

  const livros = require('./livro/livro.json');

  //Se a coleção de livros estiver vazia, carregar livros a partir do json
  console.log('Inicialização: verificando se precisar carregar lista de livros...');
  if(db){

    livros.forEach(async function(livro){
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
      'status': 'OK2',
  });
  
});

