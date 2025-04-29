require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const ClubRoutes = require('./routes/ClubRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', ClubRoutes);

// Database Connection
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco estabelecida.');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });
  })
  .catch(error => {
    console.error('Erro ao conectar ao banco:', error);
    process.exit(1);
  });

module.exports = app;