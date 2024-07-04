const express = require('express');
const app = express();

app.use(express.json());

const db = require('./models');
const userRouter = require('./routes/User');
const courseRouter = require('./routes/Course');
const childRouter = require('./routes/Child');
const enrollmentRouter = require('./routes/Enrollment');
const paymentRouter = require('./routes/Payment');
const postRouter = require('./routes/Post');

app.use('/auth', userRouter);
app.use('/courses', courseRouter);
app.use('/child', childRouter);
app.use('/enrollments', enrollmentRouter);
app.use('/payment', paymentRouter);
app.use('/posts', postRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server running on port 3001.');
    });
});
