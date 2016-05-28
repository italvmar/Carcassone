Session.set("FlagPoints",0);
Session.set("FlagTurn",0);
 Session.set("FlagMove",0);
 Session.set("flagUpdatePoints",0);
 Session.set("flagUpdateFijadas",0);



 //ResourceList = new Mongo.Collection('resources');
  //ResourceList = new Mongo.Collection('resources');

if (Meteor.isClient) {
//Ponemos un intervalo de comprobacion para actualizar nuestras variables
//con la base de datos

  setInterval(function() {

   checkPoints =Meteor.call('getpointsValue',
     function(error, result){
          if(error){
              console.log(error);
          } else {
              console.log("EL VALOR DEL CHECKPOINTS "+result[0].puntos);
              Session.set('pointsresult', result);
              Session.set('flagUpdatePoints',1);
              
              
          }
      })
   checkFijadas =Meteor.call('getfijadasValue',
     function(error, result){
          if(error){
              console.log(error);
          } else {
              console.log("EL VALOR DEL CHECKPOINTS "+result[0].puntos);
              Session.set('fijadasresult', result);
              Session.set('flagUpdateFijadas',1);
              
              
          }
      })
   
}, 2000);


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
      iniciada=0;
    
      var checkinit = Meteor.call('getinitValue',
      function(error, result){
          if(error){
              console.log(error);
          } else {
              console.log("EL VALOR DEL RESULT "+result);
              Session.set('initresult', result);
              
              
          }
      })
     iniciada=Session.get('initresult');
  
    //iniciada= checkinit.value;
    console.log("ha sido iniciada  "+ iniciada);
    
    
      initGame();
    },
    
         
  });


Tracker.autorun(function(){
  if (Session.get("FlagPoints")==1){
    //Actualizar a nuestra variable local
    console.log("Entra en el autoun FLAGPONTS");

     var checkinit = Meteor.call('insertpoints',jugadores,
      function(error, result){
          if(error){
              console.log(error);
          } else {
              console.log("EL VALOR DEL RESULT "+result);
               Session.set("FlagPoints",0);
              
              
          }
      })  

  }
});

Tracker.autorun(function(){
  if (Session.get("flagUpdatePoints")==1){
    checkPoints=Session.get('pointsresult');
    Session.set("flagUpdatePoints",0);
  //Detectamos si hay cambio en base de datos
  console.log("Entra en el autoun NOTICEPOINTS");
 // var checkPoints =ResourceList.find({ name: "points" }).fetch();
 
  console.log("changepoints "+checkPoints[0].puntos);
      jugadores = checkPoints;
      console.log("esto es lo que hay en jugadores "+jugadores[0].puntos);
  }
});      

Tracker.autorun(function(){
  if (Session.get("FlagTurn")==1){

    var checkinit = Meteor.call('insertfijadas',fichasFijadas,
      function(error, result){
          if(error){
              console.log(error);
          } else {
              console.log("EL VALOR DEL RESULT "+result);
               Session.set("FlagPoints",0);
              
              
          }
      }) 

      Session.set("FlagTurn",0);

  }
});

Tracker.autorun(function(){
  if (Session.get("flagUpdateFijadas")==1){
    checkFijadas=Session.get('fijadasresult');
    Session.set("flagUpdateFijadas",0);
  //Detectamos si hay cambio en base de datos
  console.log("Entra en el autoun UPDATEFIJADAS");
  
      fichasFijadas = checkFijadas;
      
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