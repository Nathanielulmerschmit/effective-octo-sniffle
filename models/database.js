const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "creightonshuttleproject.catetjkzgnzo.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "CreightonShuttle",
    database: 'Shuttles'
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Database is connected successfully!');
    conn.query('Select * from Routes', (err, result, fields) => {
        if (err) throw err;
        console.log("Result: " + result[1].numberOfStops);
    });
});

function route (route, stop) {
    conn.query(`Select ${stop} from ${route}`, (err, result) => {
        if (err) throw err;
        return "Result: " + result[1].numberOfStops;
    });
    
}

module.exports = ('simpleQuery');

