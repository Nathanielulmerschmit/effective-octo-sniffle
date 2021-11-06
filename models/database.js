const mysql = require('mysql');
const config = {
    host: "creightonshuttleproject.catetjkzgnzo.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "CreightonShuttle",
    database: 'Shuttles'
};

class Database{
    constructor( config) {
        this.connection = mysql.createConnection(config);
    }
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) 
                    return reject (err);
                const times = []
                times.push(rows[0].time1);
                times.push(rows[0].time2);
                times.push(rows[0].time3);
                resolve( times );
            })
        })
    }
    close() {
        return new Promise( (resolve, reject) => {
            this.connection.end( err => {
                if (err)
                    return reject (err)
                resolve();
            })
        })
    }
}


module.exports = {
    Database: new Database(config),
}


