const db = require('../db/mysql');

const getProducts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = { getProducts };
