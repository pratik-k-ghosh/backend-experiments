import User from "../models/userModel.js";

export const getUsers = async (req, res) =>{
    let query = {};
    const {name, address, membership} = req.query;

    if(name){
        query.name = name;
    }
    if(address){
        query.address = address;
    }
    if(membership){
        query.membership = membership;
    }

    try{
        const data = await User.find(query);
        res.status(200).send(data);
    }catch(err){
        res.status(500).send("Couldn't fetch Data");
    }
}

export const createUser = async (req, res) =>{
    try{
        const newUser = new User(req.body);
        const data = await newUser.save();
        res.status(200).send(data);
    }catch(err){
        res.status(500).send("Couldn't Create User");
    }
}

export const updateUser = async (req, res) =>{
    try{
        const params = req.params;
        const updated = await User.findOneAndUpdate(params, { $set: req.body }, {new: true});
        res.status(200).send(updated);
    }catch(err){
        res.status(500).send("Couldn't Update User");
    }
}

export const deleteUser = async (req, res) =>{
    try{
        const params = req.params;
        const key = req.body.pass;
        const {pass} = await User.findOne(params);

        if(key == pass){
            const deleted = await User.deleteOne(params);
            res.status(200).send(deleted);
        }
        else{
            res.status(400).send({"pass": "Wrong"});
        }
    }catch(err){
        res.status(500).send("Couldn't Delete User");
    }
}