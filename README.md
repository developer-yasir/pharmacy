# Pharmacy App - MERN Stack Application

A modern **Pharmacy Management System** built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). This project features a complete solution with a public-facing frontend, secure backend API, and an admin dashboard to manage inventory, orders, customers, and more.

---

## 📸 Screenshots

![Frontend](./screenshots/frontend.png)  
![Dashboard](./screenshots/admin-dashboard.png)

---

## 🚀 Features

### 👥 User Side (Frontend)
- View medicines/products with search and category filters
- Add to cart, place orders, and track them
- Responsive mobile-first design

### 🧑‍💼 Admin Dashboard
- CRUD operations for medicines/products
- Manage categories, orders, users
- Real-time dashboard with stats and charts

### ⚙️ Backend API
- Authentication & Authorization (JWT)
- Secure RESTful API with role-based access
- MongoDB integration with Mongoose models

---

## 🛠️ Tech Stack

### 🌐 Frontend
- React.js + React Router
- Tailwind CSS / Bootstrap
- Axios

### 🖥️ Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (for image upload)

### 📊 Admin Dashboard
- React + Charts (Chart.js or Recharts)
- Admin-specific protected routes

---

## 📦 Installation

### Step 1: Clone the Repo

```bash
git clone https://github.com/developer-yasir/pharmacy.git
cd pharmacy
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend & Dashboard Dependencies

```bash
cd ../frontend
cd ../admin-dashboard
npm install
```

### Step 4: Setup Environment Variables

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Step 5: Run the App

```bash
# Start Backend
cd backend
node server.js

# Start Frontend
cd ../frontend
npm run dev

# Start Admin Dashboard
cd ../admin-dashboard
npm run dev
```

---

## 📈 Future Improvements

- Payment Integration (Stripe/Razorpay)
- Email/SMS notifications
- Advanced filtering, reporting, and analytics
- Progressive Web App (PWA) support

---

## 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Acknowledgements

- React Docs  
- Node.js Docs  
- MongoDB University  
- Open Source Community  

---

**Developed with 💙 by [Yasir](https://github.com/developer-yasir)**
