
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.join(__dirname,'..','database','blog.db');
const db = new sqlite3.Database(dbPath,(err) =>{
    if(err){
        console.error("Erreur de connexion à SQlite:",err.message);
    }else{
        console.log("Connexion à SQlite réussie.")
    }

});

db.serialize(()=>{
    db.run(`
        CREATE TABLE IF NOT EXISTS articles(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titre TEXT NOT NULL,
        contenu TEXT NOT NULL,
        auteur TEXT NOT NULL,
        date TEXT NOT NULL,
        categorie TEXT NOT NULL,
        tags TEXT 
    )
    `,(err)=>{
        if(err){
            console.error("Erreur lors de la creation de la table article:",err.message);
        }else{
            console.log("Table article créer.");
        }
    });
});

module.exports = db;