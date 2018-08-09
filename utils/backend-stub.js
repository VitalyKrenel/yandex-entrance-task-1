const { generateData, generateDetails } = require('./generate-data');

const data = generateData();
const cache = {};

function initApp(app) {
  app.get('/api/stations', (req, res) => {
    res.json(data);
  });

  app.get('/api/stations/:id', (req, res) => {
    const { id } = req.params;
    const info = data[id];
    const details = cache[id] || (cache[id] = generateDetails(info));

    res.json({ ...info, ...details });
  });
}

exports.initBackendStub = initApp;
