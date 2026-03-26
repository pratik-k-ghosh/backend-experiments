import Product from "../model/products.model.js";
import envConfig from "../config/env.config.js";
const slugg = envConfig.slugg || 2;

export const getProducts = async (req, res) =>{
    try{
        const query = {};
        const { name, available, show, sort } = req.query;
        const page = Number(req.query.page) || 1;

        if (name){
            query.name = {
                "$regex": name,
                "$options": "i"
            };
        }

        if (available){
            query.available = available;
        }

        let prompt = Product.find(query);

        if (show){
            const project = show.replace(",", " ");
            prompt = Product.find(query, project);
        }

        if (sort){
            const sortFix = sort.replace(",", " ");
            prompt = prompt.sort(sortFix);
        }

        const data = await prompt.skip(slugg*(page - 1)).limit(slugg);

        if (!data.length){
            res.status(200).send("No Products to Show");
        }

        res.status(200).send(data);
    }catch(err){
        res.status(500).send("Couldn't Fetch the Data");
    }
}

export const launchProducts = async (req, res) =>{
    try{
        const newProduct = new Product(req.body);
        await newProduct.save();

        res.status(201).send("Launched Your Product");
    }catch(err){
        res.status(500).send("Couldn't Launch the Product");
    }
}

export const updateProducts = async (req, res) =>{
    try{
        const params = req.params;
        const updateData = req.body;
        const resData = await Product.updateOne(params, updateData);

        if (resData.modifiedCount == 0){
            res.status(200).send("Product Doesn't Exist or already updated");
        }

        res.status(200).send("Updated Your Product");
    }catch(err){
        res.status(500).send("Couldn't Launch the Product");
    }
}

export const removeProducts = async (req, res) =>{
    try{
        const params = req.params;
        const resData = await Product.deleteOne(params);

        if (resData.deletedCount == 0){
            res.status(200).send("Product Doesn't Exist");
        }

        res.status(200).send("Removed Your Product");
    }catch(err){
        res.status(500).send("Couldn't Launch the Product");
    }
}
