

    ResourceList = new Mongo.Collection('resources');
    console.log("Define coleccion");

    Meteor.methods({
        'getinitValue' : function(){
            //console.log("llama a metodo getinitValue");
            returnvaluetemp =ResourceList.findOne({ name: "init" })/*.fetch()*/;
            returnvalue= returnvaluetemp.value;
            console.log("returnvalue " +returnvalue);
            return returnvalue;

        },

        'insertpoints' : function(tempjugadores){
           // console.log("ESTOS SON LOS PUNTOS de PAPTA " +tempjugadores[0].puntos);
            //console.log("llama a metodo insertpoints");
            var ID=ResourceList.findOne({name:'points'})['_id'];
           // console.log("id de points"+ ID);
            ResourceList.update({_id:ID}, {$set:{value:tempjugadores}});

            ResourceList.update({_id:ResourceList.findOne({name:'points'})['_id']}, { $inc: {flag:1} });
            return returnvalue;

        },
        'insertfijadas' : function(tempfijadas){
           // console.log("ESTOS SON LOS PUNTOS de PAPTA " +tempjugadores[0].puntos);
            //console.log("llama a metodo insertpoints");
            var ID=ResourceList.findOne({name:'fijadas'})['_id'];
           // console.log("id de points"+ ID);
            ResourceList.update({_id:ID}, {$set:{value:tempfijadas}});

            ResourceList.update({_id:ResourceList.findOne({name:'fijadas'})['_id']}, { $inc: {flag:1} });
            return returnvalue;

        },
        'getpointsValue' : function(){
            //console.log("llama a metodo getpointsValue");
            returnvaluetemp =ResourceList.findOne({ name: "points" })/*.fetch()*/;
            //pointsflag= returnvaluetemp.flag;
            //console.log("returnpoints flag " +pointsflag);
            return returnvaluetemp.value;

        },
        'getfijadasValue' : function(){
            //console.log("llama a metodo getpointsValue");
            returnvaluetemp =ResourceList.findOne({ name: "fijadas" })/*.fetch()*/;
            //fijadasflag= returnvaluetemp.flag;
            //console.log("returnpoints flag " +pointsflag);
            return returnvaluetemp.value;

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