const express = require('express');
const router = express.Router();

const Menu = require('./../models/menu');

router.post('/', async(req,res)=>{
    try{
        const data = req.body;

        const newMenu = new Menu(data);

        const response = await newMenu.save();

        console.log('Data Saved');
        res.status(200).json(response);
    }
    catch (err) {  // ✅ Include 'err' here
        console.error('Error:', err);  // ✅ Now 'err' is defined
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
})

router.get('/', async(req,res)=>{
    try{
        const data = await Menu.find();
        console.log('Data Fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.error('Error:', err);  // ✅ Now 'err' is defined
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/:tastetype', async(req,res)=>{
    try{
        const tastetype = req.params.tastetype;
    if(tastetype == 'sweet' || tastetype == 'spicy' || tastetype == 'sour'){

        const response = await Menu.find({taste:tastetype})
        console.log('response fetched');
        res.status(200).json(response);
    }else{
        res.status(404).json({error: 'Invalid menu type'});
    }
    }
    catch(err){
        console.error('Error:', err);  // ✅ Now 'err' is defined
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;