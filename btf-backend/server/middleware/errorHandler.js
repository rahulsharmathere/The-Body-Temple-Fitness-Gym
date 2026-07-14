// centralized error handler - controllers just call next(err) on unexpected errors
const errorHandler = (err, req, res, next) => {
    console.log(err);

    if (err.code === 11000) {
        return res.status(409).json({ success: false, message: 'This record already exists' });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({ success: false, message: err.message });
    }

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Server error'
    });
}

// wraps a route not found in the same JSON shape as the rest of the API
const notFound = (req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
}

module.exports = { errorHandler, notFound };
