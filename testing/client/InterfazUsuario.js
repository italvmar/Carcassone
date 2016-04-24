Session.set("FlagPoints",0);
Session.set("FlagTurn",0);
 Session.set("FlagMove",0);




 //ResourceList = new Mongo.Collection('resources');
  //ResourceList = new Mongo.Collection('resources');

if (Meteor.isClient) {
   Meteor.subscribe('resources');
changepoints=0;
changeTurn=0;
Template.points.events({

    'submit form': function(event){
      console.log("Form Subbmited");
      event.preventDefault();
      var player = event.target.Player.value;
      var points =  event.target.Points.value;
       console.log(player);
       
       for(var i in jugadores){
        if (jugadores[i].nombre==player){
             jugadores[i].puntos= jugadores[i].puntos + parseInt(points);
             Session.set("FlagPoints",1);
        }
         
       } 
      
    }

  });


var gameID = 1;  //Identificador de partida necesaria para la parte lógica del juego
posRot = 0;

//TODO
//Parece que no la esta enseñado, otra cosa interesante seria hacer un onload

  //Funcion a la que llama Plataforma para comenzar una partida
  //Realiza las llamadas a lógica para coger la información de la partida
  Template.game.events({
    
    //Boton que simula la llamda a StartTurn que hara la Plataforma
    'click button#StartGame': function () {
      
      initGame();
    },
    
         
  });


Tracker.autorun(function(){
  if (Session.get("FlagPoints")==1){
    //Actualizar a nuestra variable local
    console.log("Entra en el autoun FLAGPONTS");
    //ResourceList.update({ name: "points" }, { value: jugadores });
   // 
    ResourceList.update({_id:ResourceList.findOne({name:'points'})['_id']}, {$set:{value:jugadores}});
    console.log("PRIMER UPDATE");
     //Anotamos el cambio
     ResourceList.update({_id:ResourceList.findOne({name:'points'})['_id']}, { $inc: {flag:1} });
    //ResourceList.update({ name: "points" }, { $inc: {flag:1} });
      console.log("Segundo UPDATE");
     
      Session.set("FlagPoints",0);

  }
});

Tracker.autorun(function(){
  //Detectamos si hay cambio en base de datos
  console.log("Entra en el autoun NOTICEPOINTS");
  var checkPoints =ResourceList.find({ name: "points" }).fetch();
  console.log("flag "+checkPoints.flag);
  console.log("changepoints "+changepoints);

  if (checkPoints.flag>changepoints){
    //Actualizamos nuestro flag local
    changepoints=checkPoints.flag;
    //Actualizamos nuestra variable local
      jugadores = checkPoints.value;
     

  }
});

Tracker.autorun(function(){
  if (Session.get("FlagTurn")==1){

    ResourceList.update({_id:ResourceList.findOne({name:'fijadas'})['_id']}, {$set:{value:jugadores}});   
    ResourceList.update({_id:ResourceList.findOne({name:'fijadas'})['_id']}, { $inc: {flag:1} });

    ResourceList.update({_id:ResourceList.findOne({name:'validas'})['_id']}, {$set:{value:jugadores}});
    ResourceList.update({_id:ResourceList.findOne({name:'validas'})['_id']}, { $inc: {flag:1} });

      Session.set("FlagTurn",0);

  }
});

Tracker.autorun(function(){
  
  var checkTurn =ResourceList.find({ name: "fijadas" }).fetch();
  var validas =ResourceList.find({ name: "validas" }).fetch();
  console.log("flag "+checkTurn.flag);
  console.log("changepoints "+changeTurn);

  if (checkTurn.flag>changeTurn){
    //Actualizamos nuestro flag local
    changeTurn=checkTurn.flag;
    //Actualizamos nuestras variables locales
      fichasFijadas = checkPoints.value;
      posicionesValidas=validas.value;

  }
});

Tracker.autorun(function(){
  if (Session.get("FlagMove")==1){
      //Sacar de la coleccion la ficha con su posicion
      //Actualizar a nuestra variable local

      //TODO no imprescindible.
      //Mirar como actualizarla cada poco
      //Cuando los otros actualizadores funcionen
      Session.set("FlagMove",0);

  }
});



}