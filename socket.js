let socketIO;
module.exports={
    init: httpServer =>{
        socketIO=require('socket.io')(httpServer);
        return socketIO;
    },
    getConnection: () =>{
    
        if(!socketIO){
            throw new Error("IO not connected");
        }
        return socketIO;
    }
}