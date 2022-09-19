const fsPromise = require('fs').promises;



const getDbFiles = async (dbPath) => {
    try {
        const file = await fsPromise.readFile(dbPath);
        return JSON.parse(file.toString())
    } catch (error) {
        error.status = 505;
        error.message = "An error occur. Can't get file from Db"
    }
    
};


const writeToDb = async (filepath, file) => {
    try {
        fsPromise.writeFile(filepath, JSON.stringify(file));
    } catch (error) {
        error.status = 505;
        error.message = "An error occur. Can't write file Db"
    }
};


module.exports = {
    getDbFiles,
    writeToDb
}
