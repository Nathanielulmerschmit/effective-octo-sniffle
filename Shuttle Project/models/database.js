const {createPool} = require('mysql');

const pool = createPool({
    host: "creightonshuttleproject.catetjkzgnzo.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "CreightonShuttle",
    connectionLimit: 10
})

pool.query('select * from routes', (err, res) => {
    return console.log(res);
})