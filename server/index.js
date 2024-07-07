const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use('/static', express.static(path.join(__dirname, './public/images')));
app.use(cors());

const db = require('./models');
const userRouter = require('./routes/User');
const courseRouter = require('./routes/Course');
const childRouter = require('./routes/Child');
const enrollmentRouter = require('./routes/Enrollment');
const paymentRouter = require('./routes/Payment');
const postRouter = require('./routes/Post');
const fileRoutes = require('./routes/File');

app.use('/auth', userRouter);
app.use('/courses', courseRouter);
app.use('/child', childRouter);
app.use('/enrollments', enrollmentRouter);
app.use('/payment', paymentRouter);
app.use('/posts', postRouter);
app.use('/files', fileRoutes);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server running on port 3001.');
    });
});
