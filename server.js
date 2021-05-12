const express = require('express')

const app = express()

//For bodyparsing
app.use(express.json())

//db connection
const connectDB = require('./config/db')

// Setting headers on responses
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    next();
});

//Routes
app.use('/api/branch', require('./routes/api/branch'))
app.use('/api/alert', require('./routes/api/alert'))
app.use('/api/auth', require('./routes/api/auth'))
// app.get('/', (req, res) => res.status(200).json({ msg: '404 Page not found' }))

connectDB()
const PORT = process.env.PORT || 5000

//For production purpose-

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))