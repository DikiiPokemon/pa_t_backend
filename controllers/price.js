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
                range: `Mods!F:F`,
                fields: "values",
            });
            
            let arr = price.data.values
            arr.shift()
            const result = arr.flat()
            res.json(result)
        } catch (error) {
            console.error("Ошибка чтения таблицы:", error.price?.data || error.message);
        }
    }

    async getPriceBDT_BFS(req, res, next){
        try {
            const sheets = await getSheets();
            const spreadsheetId = process.env.SPREADSHEET_ID;
            const price = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range: `Датчик LPS!Z18`,
                fields: "values",
            });
            
            let arr = price.data.values
            const result = arr.flat()
            res.json(result)
        } catch (error) {
            console.error("Ошибка чтения таблицы:", error.price?.data || error.message);
        }
    }
    async changeModel(req, res, next){
      
    }
    async changeType(req, res, next){
      
    }
    async changeLong(req, res, next){
      
    }

}

module.exports = new Price()