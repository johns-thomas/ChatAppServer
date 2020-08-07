
const User=require('../../models/users');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp=(req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const confirmPassword=req.body.confirmPassword;
    if(password!==confirmPassword){
        const error = new Error('Invalid password');
        error.statusCode = 401;
        throw error;
    }
    bcrypt
    .hash(password,12)
    .then((hashedPass)=>{
        const user =new User({
            name:name,
            email:email,
            password:hashedPass
     });
        return user.save();
    }).then((result)=>{
        console.log(result);
        res.status(201).json({
            message:"Loaded",
            user:result
        });
    }).catch((err)=>{
            if(!err.statusCode){
                err.statusCode=500;
    
            }next(err);
        });
    

};
exports.login=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    let currentUser;
    User.findOne({ email: email })
    .then((user)=>{
        if(!user){
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        currentUser=user;
        return bcrypt.compare(password, user.password);
    }).then((isTrue)=>{
        if(!isTrue){
            const error = new Error('Authentication failed');
            error.statusCode = 401;
            throw error;
        }
        const token =jwt.sign( 
        {
            email: currentUser.email,
            userId: currentUser._id.toString()
        },
          'jesuschrististhesavioursaveme',
          { 
        expiresIn: '1h' }
        );
        console.log(token)  
        res.status(200).json({
            message:"Authenticated",
            userId:currentUser._id.toString(),
            token:token,
            expiresIn:1 

        });
    }).catch((err)=>{
        if(!err.statusCode){
            err.statusCode=500;

        }next(err);
    })

}
exports.addContact=(req,res,next)=>{
    let userFriend=null;
    const currentUserId=req.userId;
    const friend=req.body.data.contactMail;
    let name=req.body.data.contactName;

    
    User.find({ email: friend })

    .then((friendUser)=>{
       
        if(!friendUser){
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        userFriend=friendUser[0]._id;
        
        return User.findById(currentUserId);
    })
    .then((user)=>{
      
       name=name+' : '+userFriend
        user.contacts.unshift({name:name});
       return user.save();
    })
    .then((newFriend) =>{
        
        res.status(201).json({
            message:"added contacts",
            data:{ 
                name:req.body.data.contactName,
                _id:userFriend
            }
           
            
        });
    })
    .catch((err)=>{
        if(!err.statusCode){
            err.statusCode=500;

        }next(err);
    });

};
exports.getContact=(req,res,next)=>{
    const user=req.userId;
   
    User.findById(user).then((result)=>{
        
        const arr=result.contacts.map(post=>{
            const el=post.name.split(":")[0].trim();
            const el1=post.name.split(":")[1].trim();
            return {name:el,_id:el1}
        })
        res.status(201).json({
            message:"success",
            contacts:arr
        });
    }).catch((err)=>{
        if(!err.statusCode){
            err.statusCode=500;

        }next(err);
    })
}