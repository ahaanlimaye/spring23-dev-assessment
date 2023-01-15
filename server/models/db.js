const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'conection error'));
db.once('open', () => console.log('Connected'));