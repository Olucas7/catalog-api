const db = require('../db/mysql');

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    await db.query('INSERT INTO cart (product_id, quantity) VALUES (?, ?)', [productId, quantity]);
    res.status(201).json({ message: 'Item added to cart' });
  } catch (err) {
    res.status(500).json({ error: 'Error adding to cart' });
  }
};

const getCart = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.id, p.name, p.price, c.quantity, (p.price * c.quantity) as total
      FROM cart c
      JOIN products p ON c.product_id = p.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching cart' });
  }
};

module.exports = { addToCart, getCart };
