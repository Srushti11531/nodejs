// const express = require('express');
// const fs = require('fs');
// const multer = require('multer');
// const bodyParser = require('body-parser');
// const xlsx = require('xlsx');
// const path = require('path');
// const cors = require('cors');
// require('dotenv').config();
// const userRoutes = require('./src/routes/userRoutes');

// const app = express();
// app.use(bodyParser.json());

// app.use('/api/users', userRoutes);


// // Swagger
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocs = require('./src/config/swagger.config');

// // DB init (e.g., Sequelize)
// require('./src/models/index');

// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));

// // Swagger Docs
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
//   customCss: '.swagger-ui .topbar .download-url-wrapper { display: none }'
// }));
// console.log(`Swagger available at http://localhost:${PORT}/api-docs`);


// // Ensure folders exist
// ['../data', '../uploads'].forEach(dir => {
//   const fullPath = path.join(__dirname, dir);
//   if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath);
// });
// //Create /files folder if it doesn't exist
// const filesDir = path.join(__dirname, 'files');
// if (!fs.existsSync(filesDir)) {
//   fs.mkdirSync(filesDir);
// }
// // ✅ Automatically create 'data' folder if not present
// const dataDir = path.join(__dirname, '../data');
// if (!fs.existsSync(dataDir)) {
//   fs.mkdirSync(dataDir);
// }


// // Add your main routes (e.g., users, items, etc.)
// const exampleRoutes = require('./src/routes/index');
// app.use('/api', exampleRoutes);

// // Global error handler (optional)
// const errorHandler = require('./src/middleware/errorHandler');
// app.use(errorHandler);

// //pdf

// const pdfRoutes = require("./src/routes/pdfrouter");
// app.use("/api/pdf", pdfRoutes);


// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });


const express = require('express');
const fs = require('fs');
const multer = require('multer');
const bodyParser = require('body-parser');
const xlsx = require('xlsx');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// const { connectQueue } = require('./src/config/rabbitmq');  // adjust path accordingly

// const startConsumer = require('./consumers/emailconsumer').startConsumer; 
const userRoutes = require('./src/routes/userRoutes');
const exampleRoutes = require('./src/routes/index');
//const errorHandler = require('./src/middleware/errorHandler');
const pdfRoutes = require("./src/routes/pdfrouter");
const { connectQueue } = require('./src/config/rabbitmq');
const  startConsumer  = require('./src/consumers/emailconsumer').startConsumer;
const errorHandler = require('./src/middleware/errorHandler');

//require('./src/shedules/loggershedules'); 
require('./src/shedules/date'); 

// Express app init
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./src/config/swagger.config');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  customCss: '.swagger-ui .topbar .download-url-wrapper { display: none }'
}));
console.log(`Swagger available at http://localhost:${PORT}/api-docs`);

// Ensure folders exist
['../data', '../uploads'].forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath);
});
const filesDir = path.join(__dirname, 'files');
if (!fs.existsSync(filesDir)) fs.mkdirSync(filesDir);
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

// Routes
app.use('/api/users', userRoutes);
app.use('/api', exampleRoutes);
app.use('/api/pdf', pdfRoutes);

// Error handler (keep this last)
app.use(errorHandler);


// --- RabbitMQ connection and mail worker start BEFORE server listens ---
const startApp = async () => {
  await connectQueue();
  startConsumer();

    // Start Express server
    app.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
  });
}
startApp();








