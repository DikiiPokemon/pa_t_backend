const { default: axios } = require("axios");
const ApiError = require("../Error/ApiError");
require("dotenv").config()

class Products {
    async getAll(req, res, next){
        let result = {
            LPS: [],
            FS: [],
            sensors: [],
            other: [],
        }
        try {
            const products = await axios.get(
                "https://api.moysklad.ru/api/remap/1.2/entity/product",
                {
                    auth: {
                        username: process.env.user,
                        password: process.env.password,
                    },
                    headers: {
                    "Accept-Encoding": "gzip", // ускоряет ответ
                    },
                }
            );

            products.data.rows?.map((i, idx) => {

                
                if(i.name.includes("LPS (") && !i.name.includes("Разбор")){
                    result.LPS.push(products.data.rows[idx])
                }else if(i.name.includes("FS ") && !i.name.includes("Катушка") && !i.name.includes("Бобина") && !i.name.includes("BFS")){
                    result.FS.push(products.data.rows[idx])
                }else if(i.name.includes("Блок BFS") || i.name.includes("Блок BDT")){
                    result.sensors.push(products.data.rows[idx])
                }else{
                    result.other.push(products.data.rows[idx])
                }
            })

            // result.push("LPS": ...LPS, FS, sensors, other)
            
            res.json(result);
        } catch (error) {
            return next(ApiError.badRequest(error))
        }
    }

    async getMods(req, res, next){
       
        try {
            const {prod_id} = req.body
            const mods = await axios.get(
                "https://api.moysklad.ru/api/remap/1.2/entity/variant",
                {
                    params:{
                        filter: "productid="+ prod_id,
                    },
                    auth: {
                        username: process.env.user,
                        password: process.env.password,
                    },
                    headers: {
                    "Accept-Encoding": "gzip", // ускоряет ответ
                    },
                }
            )

            res.json(mods.data.rows);
        } catch (error) {
            return next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new Products()