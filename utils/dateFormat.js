// Date formatter takes timestamp from unix code and converts it to locale string
const dateFormat = (timestamp = Date.now()) => {
    return new Date(timestamp).toLocaleString();
};

// export dateFormatter
module.exports = dateFormat;