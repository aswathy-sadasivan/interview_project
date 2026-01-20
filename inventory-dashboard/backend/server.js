const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory data
let products = [
    { id: 1, name: "Wireless Mouse", price: 29.99, stock: 15, lowStockThreshold: 5 },
    { id: 2, name: "Mechanical Keyboard", price: 89.99, stock: 8, lowStockThreshold: 3 },
    { id: 3, name: "HD Monitor", price: 159.00, stock: 2, lowStockThreshold: 4 },
    { id: 4, name: "USB-C Hub", price: 45.50, stock: 0, lowStockThreshold: 2 },
    { id: 5, name: "External SSD", price: 120.00, stock: 20, lowStockThreshold: 5 },
    { id: 6, name: "Laptop Stand", price: 35.00, stock: 4, lowStockThreshold: 5 },
    { id: 7, name: "Webcam", price: 59.99, stock: 1, lowStockThreshold: 3 }
];

// Use a Router to handle paths
const router = express.Router();

// GET /products
router.get('/products', (req, res) => {
    res.json(products);
});

// POST /update-stock
router.post('/update-stock', (req, res) => {
    const { id, newQuantity } = req.body;

    if (id === undefined || newQuantity === undefined) {
        return res.status(400).json({ error: "Missing id or newQuantity" });
    }

    if (newQuantity < 0) {
        return res.status(400).json({ error: "Stock cannot be negative" });
    }

    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    product.stock = newQuantity;
    res.json({ message: "Stock updated", product });
});

// Mount the router on both /api (for Vercel) and / (for local)
app.use('/api', router);
app.use('/', router);

// Export the Express API
module.exports = app;

// Only listen if running standalone (not required for Vercel)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
