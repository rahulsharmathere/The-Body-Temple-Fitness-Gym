const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const { errorHandler, notFound } = require('./middleware/errorHandler')

const authRoutes = require('./routes/authRoutes')
const memberRoutes = require('./routes/memberRoutes')
const profileRoutes = require('./routes/profileRoutes')
const membershipPlanRoutes = require('./routes/membershipPlanRoutes')
const membershipRoutes = require('./routes/membershipRoutes')
const attendanceRoutes = require('./routes/attendanceRoutes')
const progressRoutes = require('./routes/progressRoutes')
const gymInfoRoutes = require('./routes/gymInfoRoutes')
const contactRoutes = require('./routes/contactRoutes')

const app = express();

app.use(cors({
    origin: [
        process.env.CLIENT_URL,
         "https://www.thebtf.in",
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/plans', membershipPlanRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/gym-info', gymInfoRoutes);
app.use('/api/contact', contactRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
