const express = require('express');
const app = express();

// serve static assets from the public folder in project root
app.use(express.static('./build/'));
app.listen(3000, () => console.log('listening...'))
