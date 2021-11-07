const express = require('express');
const app = express();
const PORT = process.env.PORT || 6969;
const userData = require('./MOCK_DATA.json');

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
