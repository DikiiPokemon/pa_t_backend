const { google } = require("googleapis");

//Регистарация для гугл excel оставляю до лучших времен, подготовлено уже под аккаунт, который завел Садиков Андрей

async function Auth(){
    const auth = new google.auth.GoogleAuth({
        keyFile: "./pa-t-483815-19cbb749254e.json", // <-- точное имя файла
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();


    return client;
}

let sheets;

async function getSheets() {
  if (!sheets) {
    await initSheets();
  }
  return sheets;
}

async function initSheets() {
  const auth = await Auth()
  sheets = google.sheets({ version: "v4", auth: auth });
}

initSheets()
module.exports = {
  getSheets,
};