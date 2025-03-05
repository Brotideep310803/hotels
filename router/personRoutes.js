const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

router.post('/', async(req,res)=>{
    try{
        const data = req.body;

        const newPerson = new Person(data);

        const response = await newPerson.save();

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
        const data = await Person.find();
        console.log('Data Fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.error('Error:', err);  // ✅ Now 'err' is defined
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


router.get('/:worktype', async(req,res)=>{
    try{
        const worktype = req.params.worktype;
        if(worktype == 'chef'||worktype == 'manager'||worktype=='waiter'){

            const response = await Person.find({work:worktype});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invailid work type'});
        }
    }
    catch(err){
        console.error('Error:', err);  // ✅ Now 'err' is defined
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


router.put('/:id',async(req,res)=>{
    try{
        const personID = req.params.id;
        const PersonData = req.body;

        const  response = await Person.findByIdAndUpdate(personID,PersonData,{
            new : true,
            runValidators : true
        })

        if(!response){
            return res.status(404).json({error:'Person not found'});
        }

        console.log('Data updated');
        res.status(200).json(response);

    }
    catch(err){
        console.error('Error:', err);  // ✅ Now 'err' is defined
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


router.delete('/:id',async(req,res)=>{
    try{
        const personID = req.params.id;
        const response = await Person.findByIdAndDelete(personID);

        if(!response){
            return res.status(404).json({error:'Person not found'});
        }

        console.log('Person Deleted');
        res.status(200).json({message:'Person Deleted Suuccesssfully'});
    }
    catch(err){
        console.error('Error:', err);  // ✅ Now 'err' is defined
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


module.exports = router;