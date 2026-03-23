
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const articlesRoutes = require('./routes/articlesRoutes');

require('./config/db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json);

app.get('/',(req,res) =>{
    res.status(200).json({
        success: true,
        message:"Bienvenu sur l'API Blog",
        documentation:'http://localhost:3000/api-docs'
    });
});

app.use('/api',articlesRoutes);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));
app.use((req,res)=>{
    res.status(404).json({
        success:false,
        message:'Route non trouvée.'
    });
});

app.listen(PORT,()=>{
    console.log(`Serveur demarre sur http://localhost:${PORT}`);
    console.log(`Swagger disponible sur http://localhost:${PORT}/api-docs`);
});