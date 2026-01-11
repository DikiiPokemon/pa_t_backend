const { default: axios } = require("axios");
const ApiError = require("../Error/ApiError");
const { getSheets } = require("../auth");
require("dotenv").config()



class Price {
    
    async getPrice(req, res, next){
        try {
            
            const sheets = await getSheets();
            const spreadsheetId = process.env.SPREADSHEET_ID;
            const price = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range: process.env.RANGE,
                fields: "values",
            });

            res.json(price)
        } catch (error) {
            console.error("Ошибка чтения таблицы:", error.price?.data || error.message);
        }
    }

    async changeRange(req, res, next){
        
    }
    async changeModel(req, res, next){
      
    }
    async changeType(req, res, next){
      
    }
    async changeLong(req, res, next){
      
    }

}

module.exports = new Price()