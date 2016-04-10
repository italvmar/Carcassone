if (Meteor.isClient) {




var gameID = 1;  //Identificador de partida necesaria para la parte lógica del juego
posRot = 0;
  
  //Sesiones para botones
  Session.set('showRotateTile', false);
  Session.set('showFollowers', false);
  Session.set('showPickTile', false);
  Session.set('showPlayers', false);

  //Sesiones estado del turno
  Session.set('pickTileOK', false);
  Session.set('fixedToken', false);
  Session.set('firstTurn', true);
  Session.setDefault('currentPlayer', 1);
  //Session.setDefault('posRot', 0);

  //Sesiones para Meteor.call
  Session.setDefault('players', undefined);
  Session.setDefault('tileID', 0);
  Session.setDefault('rotInfo', undefined);
  



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
}