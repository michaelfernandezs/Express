const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const scrapperRoutes = require('./routes/scrapper');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/', scrapperRoutes);

sequelize
  .authenticate()
  .then(() => console.log('Conexión exitosa con la base de datos.'))
  .catch((error) =>
    console.error('Error al conectar con la base de datos:', error)
  );

// Sincronización de modelos
sequelize
  .sync({ force: true })
  .then(() => console.log('Tablas sincronizadas.'))
  .catch((error) => console.error('Error al sincronizar las tablas:', error));

async function listTables() {
  try {
    const tables = await sequelize.query('SHOW TABLES', {
      type: sequelize.QueryTypes.SHOWTABLES,
    });
    console.log('Tablas:', tables);
  } catch (error) {
    console.error('Error listing tables:', error);
  }
}

listTables();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Server is running! Use /scrape for scraping.');
});
