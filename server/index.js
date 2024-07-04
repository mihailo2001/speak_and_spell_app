const express = require('express');
const app = express();

app.use(express.json());

const db = require('./models');
const userRouter = require('./routes/User');
const courseRouter = require('./routes/Course');
const postRouter = require('./routes/Post');
const childRouter = require('./routes/Child');
const enrollmentRouter = require('./routes/Enrollment');
const paymentRouter = require('./routes/Payment');

app.use('/auth', userRouter);
app.use('/courses', courseRouter);
app.use('/posts', postRouter);
app.use('/child', childRouter);
app.use('/enrollments', enrollmentRouter);
app.use('/payment', paymentRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server running on port 3001.');
    });
});
