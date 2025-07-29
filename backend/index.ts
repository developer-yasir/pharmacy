
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory database
let medicines = [
  { id: 1, name: 'Aspirin', price: 5.99, quantity: 100 },
  { id: 2, name: 'Ibuprofen', price: 7.49, quantity: 80 },
];

let orders = [
  { id: 1, customerName: 'John Doe', items: [{ medicineId: 1, quantity: 2 }], status: 'Pending' },
  { id: 2, customerName: 'Jane Smith', items: [{ medicineId: 2, quantity: 1 }], status: 'Completed' },
];

// Medicine API
app.get('/api/medicines', (req, res) => {
  res.json(medicines);
});

app.post('/api/medicines', (req, res) => {
  const newMedicine = { ...req.body, id: medicines.length + 1 };
  medicines.push(newMedicine);
  res.status(201).json(newMedicine);
});

app.delete('/api/medicines/:id', (req, res) => {
  const id = parseInt(req.params.id);
  medicines = medicines.filter(m => m.id !== id);
  res.status(204).send();
});

// Order API
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const newOrder = { ...req.body, id: orders.length + 1 };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.put('/api/orders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedOrder = req.body;
  orders = orders.map(o => (o.id === id ? { ...o, ...updatedOrder } : o));
  res.json(orders.find(o => o.id === id));
});

// Analytics API
app.get('/api/analytics', (req, res) => {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => {
    const orderTotal = order.items.reduce((itemAcc, item) => {
      const medicine = medicines.find(m => m.id === item.medicineId);
      return itemAcc + (medicine ? medicine.price * item.quantity : 0);
    }, 0);
    return acc + orderTotal;
  }, 0);
  const popularMedicines = medicines.map(m => ({
    name: m.name,
    orderCount: orders.filter(o => o.items.some(i => i.medicineId === m.id)).length,
  })).sort((a, b) => b.orderCount - a.orderCount);

  res.json({
    totalOrders,
    totalRevenue,
    popularMedicines,
  });
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
