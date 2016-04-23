ficha= function(num, coordx, coordy, rot, token, player) {
      this.num = num;
      this.coord = [coordx,coordy];
      this.rot = rot;
      this.token=token;
      this.player=player
};
jugador= function(posicion, puntos, nombre,idPlayer,fichas){
    this.pos=posicion;
    this.puntos=puntos;
    this.nombre=nombre;
    this.idPlayer=idPlayer;
    this.fichas=fichas;
};

rot= function(coordx, coordy,pos1,pos2,pos3,pos4,pos5,pos6,pos7,pos8,pos9){
  this.coord = [coordx,coordy];
  this.dummyPos=[pos1,pos2,pos3,pos4,pos5,pos6,pos7,pos8,pos9];
}
  fichasFijadas=[];

 rot0 = [];
 rot1 = [];
 rot2 = [];
 rot3 = [];
 posicionesValidas = [rot0,rot1,rot2,rot3];
 jugadores=[];

 boards = [];

 firstinit=true;

 fichaActiva= new ficha(02,0,0,0,0,0);
///////////////////////////Meto rotaciones posibles para ir comprobando///////////
    var fichapos= new rot(1,0,true,true,true,true,true,true,true);
    posicionesValidas[0].push(fichapos);
    var fichapos= new rot(0,1,true,true,true,true,true,true,true);
    posicionesValidas[0].push(fichapos);
    var fichapos= new rot(4,4,true,true,true,true,true,true,true);
    posicionesValidas[3].push(fichapos);
    var fichapos= new rot(1,2,true,true,true,true,true,true,true);
    posicionesValidas[0].push(fichapos);
    var fichapos= new rot(2,0,true,true,true,true,true,true,true);
    posicionesValidas[2].push(fichapos);
    var fichapos= new rot(0,2,true,true,true,true,true,true,true);
    posicionesValidas[0].push(fichapos);
    var fichapos= new rot(3,6,true,true,true,true,true,true,true);
    posicionesValidas[1].push(fichapos);
    var fichapos= new rot(1,3,true,true,true,true,true,true,true);
    posicionesValidas[0].push(fichapos);

    var fichapos= new rot(7,2,true,true,true,true,true,true,true);
    posicionesValidas[2].push(fichapos);
    var fichapos= new rot(6,4,true,true,true,true,true,true,true);
    posicionesValidas[3].push(fichapos);
    var fichapos= new rot(6,3,true,true,true,true,true,true,true);
    posicionesValidas[2].push(fichapos);
    var fichapos= new rot(2,7,true,true,true,true,true,true,true);
    posicionesValidas[0].push(fichapos);
  ////////////////////////////Meto jugadores temporales para ir comprobando//////////////////// 

    var tempPlayer= new jugador(0,666,"Papta",523,7);
    jugadores.push(tempPlayer);
    var tempPlayer= new jugador(1,2,"Dolan",524,7);
    jugadores.push(tempPlayer);
    var tempPlayer= new jugador(2,30,"Murtix",122,7);
    jugadores.push(tempPlayer);
    var tempPlayer= new jugador(3,30,"Gooby",123,7);
    jugadores.push(tempPlayer);
    var tempPlayer= new jugador(4,30777,"TR-8R",322,7);
    jugadores.push(tempPlayer);

    ResourceList = new Mongo.Collection('resources');
    ResourceList.insert({ name: "points", value: jugadores, flag:0 });
    ResourceList.insert({ name: "fijadas", value: fichasFijadas, flag:0 });
    ResourceList.insert({ name: "validas", value: posicionesValidas, flag:0 });
    //ResourceList.insert({ name: "activa", value: fichaActiva, flag:0 });
