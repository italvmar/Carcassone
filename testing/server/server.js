/*Datajugadores new Mongo.Collection('jugadores')
DataposicionesValidas new Mongo.Collection('validas')
DatafichaActiva  new Mongo.Collection('activa')
DatafichasFijadas new Mongo.Collection('fijadas')*/
/*fichasFijadas=[];

 rot0 = [];
 rot1 = [];
 rot2 = [];
 rot3 = [];
 posicionesValidas = [rot0,rot1,rot2,rot3];
 jugadores=[];

 varboards = [];

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
*/

    ResourceList = new Mongo.Collection('resources');
    console.log("Define coleccion");

    Meteor.methods({
        'getinitValue' : function(){
            console.log("llama a metodo getinitValue");
            returnvaluetemp =ResourceList.findOne({ name: "init" })/*.fetch()*/;
            returnvalue= returnvaluetemp.value;
            console.log("returnvalue " +returnvalue);
            return returnvalue;

        },

        'insertpoints' : function(tempjugadores){
            console.log("ESTOS SON LOS PUNTOS de PAPTA " +tempjugadores[0].puntos);
            console.log("llama a metodo insertpoints");
            var ID=ResourceList.findOne({name:'points'})['_id'];
            console.log("id de points"+ ID);
            ResourceList.update({_id:ID}, {$set:{value:tempjugadores}});

            ResourceList.update({_id:ResourceList.findOne({name:'points'})['_id']}, { $inc: {flag:1} });
            return returnvalue;

        },
        'getpointsValue' : function(){
            console.log("llama a metodo getpointsValue");
            returnvaluetemp =ResourceList.findOne({ name: "points" })/*.fetch()*/;
            pointsflag= returnvaluetemp.flag;
            console.log("returnpoints flag " +pointsflag);
            return returnvaluetemp;

        }

    });
   // console.log("///////////////inserta valor de iniciacion "+ iniciada);
    //    console.log("///////////////inserta valor de flag "+ checkinit.flag);
        

if (Meteor.isServer) {
     console.log("Sever loads");
        ResourceList.insert({ name: "points", value: jugadores, flag:0 });
        ResourceList.insert({ name: "fijadas", value: fichasFijadas, flag:0 });
        ResourceList.insert({ name: "validas", value: posicionesValidas, flag:0 });
       //     iniciada=1;
        ResourceList.insert({ name: "init", value: 1,flag:1});
	/*firstinit=true;*/
     insideserver =ResourceList.findOne({ name: "init" })/*.fetch()*/;

     console.log("retornamos el valor justo despues de insertar"+insideserver.value);
}