import User from "../model/users.model.js";

export const getUsers = async (req, res) =>{
    try{
        const { name } = req.query;
        const data = await User.find({ "name": name });

        if (!data.length){
            res.status(200).send("No User to Show");
        }

        res.status(200).send(data);
    }catch(err){
        res.status(500).res("Couldn't get User");
    }
}

export const createUsers = async (req, res) =>{
    try{
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send("User Created");
    }catch(err){
        res.status(500).res("Couldn't create User");
    }
}

export const updateUsers = async (req, res) =>{
    try{
        const params = req.params;
        const updatedUser = await User.updateOne(params, req.body);

        if (updatedUser.modifiedCount == 0){
            res.status(200).send("User Doesn't Exist or already updated");
        }
        res.status(200).send("User Updated");

    }catch(err){
        res.status(500).res("Couldn't update User");
    }
}

export const deleteUsers = async (req, res) =>{
    try{
        const params = req.params;
        const { pass } = req.body;

        const userData = await User.findOne(params);

        if (!userData){
            res.status(200).send("User Doesn't Exist");
        }
        else {
            if (pass != userData.pass){
                res.status(400).send("Wrong Password");
            }
            else {
                await User.deleteOne(params);
                res.status(200).send("Deleted User");
            }
        }
    }catch(err){
        res.status(500).res("Couldn't Delete User");
    }
}