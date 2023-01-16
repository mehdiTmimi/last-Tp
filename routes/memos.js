const express= require('express')
const {Memo} = require('../models/Memo');
const { User } = require('../models/User');
const router = express.Router();

// ajouter
router.post("",async (req,res)=>{

    // recuperation des donnees envoyees
   const {date, content} =  req.body
   // verification
   if(!date || !content)
    return res.status(400).json({message:"date and content are required"})

    // creer une instance du model
    const memo=new Memo({
        date:date,
        content:content
    })
    const login =  req.session.login;
    try{
    const dataMemo =  await memo.save()
    const user=await User.findOne({login:login})
    user.memos.push(dataMemo)
    const data = await user.save();
    res.json(data);
    }catch(err)
    {
        res.status(500).send({message:err})
    }
    // enregister au niveau du Mongodb atlas
/*
    promise.then(x=>111111111111).catch(err=>2222222222222222)

    try{
       let x  =await promise
        111111111111111111111111
    }catch(err)
    {
        22222222222222222222222
    }
    */
})

// lister
router.get("",async (req,res)=>{
    const login =  req.session.login;
    const user=await User.findOne({login:login})
    const nbr = req.query.nbr || user.memos.length
    const dataToSend=user.memos.filter((elem,index)=>index<nbr)
    res.json(dataToSend)
    /*
    const nbr=req.query.nbr
    if(nbr)
        res.json(await Memo.find().limit(nbr).exec());
    else
        res.json(await Memo.find());
   */
   /*const memos= await Memo.find();

    const nbr=req.query.nbr || memos.length
    */
})

// selectionner


// modifier


//supprimer


module.exports.memosRouter= router;
