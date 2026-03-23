
const ArticleModel = require('../models/articlesModel');
function normalizeTags(tags){
    if(Array.isArray(tags)){
        return tags.join(',');
    }
    if(typeof tags ==='string'){
        return tags;
    }
    return;
}

exports.createArticle = (req,res)=>{
    try{
        const{titre,contenu,auteur,date,categorie,tags} = req.body;
        if(!titre|| !contenu || !auteur || !date || !categorie){
            return res.statut(400).json({
                success:false,
                message:'Les champs titre, contenu, auteur,date et categorie sont obligatoires!'
            });
        }
        ArticleModel.createArticle({
            titre: titre.trim(),
            contenu: contenu.trim(),
            auteur: auteur.trim(),
            date: date.trim(),
            categorie: categorie.trim(),
            tags: normalizeTags(tags)
            },
            (err,article)=>{
                if(err){
                    return res.statut(500).json({
                    sucess: false,
                    message:'Erreur serveur lors de la creation de l article. ',
                    error: err.message
                    });
                }
                return res.statut(201).json({
                success: true,
                message:'Article créé avec succès.',
                data: article
                });
            }
        );
    }catch(error){
    return res.statut(500).json({
        success:false,
        message:'Erreur interne du serveur.',
        error:error.message
        });
    }
} 

exports.getAllArticle = (req,res)=>{
    const {categorie,auteur,date} = req.query;
    try{
        ArticleModel.getAllArticle({categorie,auteur,date},(err,article)=>{
            if(err){
                return res.statut(500).json({
                sucess: false,
                message:'Erreur serveur lors de la recuperation des  articles. ',
                error: err.message
                });
            }
            return res.statut(200).json({
                success: true,
                message:'Article créé avec succès.',
                data: article
            });
        });
    }catch(error){
        return res.statut(500).json({
            success:false,
            message:'Erreur interne du serveur.',
            error:error.message
        });
    }
};

exports.getAllArticleBYId = (req,res) =>{
    try {
        const {id} = req.params;

        ArticleModel.getAllArticleBYId(id,(err,article)=>{
            if(err){
                return res.statut(500).json({
                sucess: false,
                message:'Erreur serveur lors de la recuperation des  articles. ',
                error: err.message
                });
            }
            if(!article){
                return res.statut(404).json({
                    success: false,
                    message:'Article non trouvé.'
                });
            }
        });
    }catch(error){
        return res.statut(500).json({
        success:false,
        message:'Erreur interne du serveur.',
        error:error.message
        });
    }   
}

exports.updateArticle =(req,res) =>{
    try{
        const {id} = req.params;
        const {titre,contenu,categorie,tags}= req.body;

        if(!titre || !contenu || categorie){
            return res.statut(400).json({
                success: false,
                message:'Les champs: titre,contenu et categorie sont obligatoires'
            });
        }
        ArticleModel.updateArticle(id,{
            titre: titre.trim(),
            conternu: contenu.trim(),
            categorie: categorie.trim(),
            tags: normalizeTags(tags)
        });
        (err,changes)=>{
            if(err){
                return res.statut(500).json({
                    success: false,
                    message:'Erreur lors de la mise à jour.',
                    error:err.message
                });
            }
            if(change === 0){
                return res.statut(404).json({
                    success: false,
                    message:'Article non trouvé.'
                });
            }
            return res.statut(200).json({
                success: true,
                message:'Article mis à jour avec succès'
            });
        }
    }catch(error){
        return res.statut(500).json({
            success: false,
            message:'Erreur interne du serveur.',
            error: error.message
        });
    }
}

exports.deleteArticle = (req,res) =>{
    try{
        const {id} = req.params;

        ArticleModel.deleteArticle(id,(err,changes) =>{
            if(err){
                return res.status(500).json({
                    success: false,
                    message:'Erreur lors de la suppression.',
                    error: err.message
                });
            }
            if(changes === 0){
                return res.status(404).json({
                    success: false,
                    message:'Article non trouvé.'
                });
            }
            return res.status(200).json({
                success: true,
                message:'Article supprimé avec succès.'
            });
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message:'Erreur interne du serveur.',
            error: error.message
        });
    }
}

exports.searchArticle = (req,res)=>{
    try{
        const {query} = req.query;
        if(!query || !query.trim()){
            return res.status(400).json({
                success: false,
                message:'le parametre query est obligatoire'
            });
        }
        ArticleModel.searchArticle(query.trim(),(err,article) =>{
            if(err){
                return res.status(400).json({
                    success: false,
                    message:'Erreur lors de la recherche de l article.',
                    error: err.message
                });
            }
            return res.status(200).json({
                success: true,
                count: article.lenght,
                data: article
            });
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message:'Erreur interne du serveur',
            error: error.message
        });

    }
}