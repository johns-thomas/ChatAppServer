const io =require('../../socket');
//const User=require('../../models/users');
const Message =require('../../models/message');



exports.postMessage =(req,res,next)=>{
    const sender=req.userId;
    const reciever=req.body.receiver;
    const message=req.body.content;
    const post =new Message({
        message:message,
        sender:sender,
        receiver:reciever
    });
    post.save()
    .then((result) =>{
    
       io.getConnection().sockets.on('connection', (socket)=>{
           
        socket.on('room', (reciever)=> {
            
            socket.join(reciever);  
        });
        
    });

    io.getConnection().sockets.in(reciever).emit('message', result);
        res.status(201).json({
            message:"Succes",
            post : result
        });

    }).catch(err =>{
        console.log(err);
        if(!err.statusCode){
            err.statusCode=500;

        }next(err);
    });
};

exports.getMessage=(req,res,next)=>{
    const rec=req.body.receiver.trim();
    const user=req.userId;
    let send=null;
    let rece=null;
    
    Message.find({
        $or:[
            {
                sender:user,receiver:rec
            },
            {
                sender:rec,receiver:user
            }
        ]
    })
    .then((result)=>{
       // console.log(result);
        send=result;
        
  
            res
            .status(200).json({
                message:[...send]
            });
            
    }).catch((err)=>{
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err);
    });

};
exports.deleteMessage=(req,res,next)=>{
    Message.findByIdAndDelete().then((result)=>{
        res.status(200).json({message:result});
    }).catch(err =>{
        if(!err.statusCode){
            err.statusCode=500;

        }next(err);
    })
}
