const {createPool} = require('mysql');

const pool = createPool({
    host: "creightonshuttleproject.catetjkzgnzo.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "CreightonShuttle",
})

pool.query('Select * from Routes', (err, res) => {
    return console.log(res)
})