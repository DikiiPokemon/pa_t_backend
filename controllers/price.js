const { default: axios } = require("axios");
const ApiError = require("../Error/ApiError");
const { getSheets } = require("../auth");
require("dotenv").config()
const XLSX = require('xlsx');


//Здесь забираем весь столбец по имени заголовка
function getColumn(filePath, sheetName, columnName) {
  const workbook = XLSX.readFile(filePath);

  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  return data.map(row => row[columnName]);
}

//Здесь забираем значение определенной ячейки
function getCell(filePath, sheetName, cellAddress) {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[sheetName];

  const cell = sheet[cellAddress];

  return cell ? cell.v : undefined;
}



class Price {
    
    async getPrice(req, res, next){
        try {
            
            const result = getColumn('./prices_excel/LPS.xlsx', "Mods", "Цена с НДС (руб)")
            res.json(result)
        } catch (error) {
            console.error("Ошибка чтения таблицы:", error.price?.data || error.message);
            return next(ApiError.badRequest(error.message))
        }
    }

    async getPriceBDT_BFS(req, res, next){
        try {
            const result = getCell('./prices_excel/LPS.xlsx', "Датчик LPS", "Z18")
            res.json(result)
        } catch (error) {
            console.error("Ошибка чтения таблицы:", error.price?.data || error.message);
            return next(ApiError.badRequest(error.message))
        }
    }
    async getPricefs(req, res, next){
        try {

            const result = getColumn('./prices_excel/FS.xlsx', "Mods", "Цена с НДС (руб)")
            res.json(result)
        } catch (error) {
            console.error("Ошибка чтения таблицы:", error.price?.data || error.message);
            return next(ApiError.badRequest(error.message))
        }
    }
    async changeType(req, res, next){
      
    }
    async changeLong(req, res, next){
      
    }

}

module.exports = new Price()