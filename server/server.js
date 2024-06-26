const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const noteRoutes = require('./routes/notesRoutes');
const formRoutes = require('./routes/formRoutes');
const eventRoutes = require('./routes/eventRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3001', // Replace with your frontend URL
        methods: ["GET", "POST"]
    }
});

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3001' // Replace with your frontend URL
}));

app.use((req, res, next) => {
    req.app.set('socketio', io);
    next();
});

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/notifications', notificationRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const createAdminUser = async () => {
    const email = 'admin@example.com';
    const password = 'adminpassword123';
    const name = 'Admin User';

    try {
        const adminExists = await Admin.findOne({ email });

        if (!adminExists) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const admin = new Admin({
                name,
                email,
                password: hashedPassword,
                isAdmin: true,
            });
            await admin.save();
            console.log('Admin user created successfully');
        } else {
            console.log('Admin user already exists');
        }
    } catch (error) {
        console.error(`Error creating admin user: ${error.message}`);
    }
};

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('notify', (notification) => {
        io.emit('notify', notification);
    });

    // Add any other socket event listeners here
});

server.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await createAdminUser();
});
