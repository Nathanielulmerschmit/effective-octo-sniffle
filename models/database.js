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
                var times = [];
                console.log(rows);
                times.push(rows[0].time1);
                times.push(rows[0].time2);
                times.push(rows[0].time3);
                resolve( times );
            })
        })
    }
    queryStatus(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) 
                    return reject (err);
                var statusTimes = [];
                console.log(rows);

                if (args = 'mon') {
                    statusTimes.push(rows[0].monStart);
                    statusTimes.push(rows[0].monEnd);
                }
                else if (args = 'tue') {
                    statusTimes.push(rows[0].tueStart);
                    statusTimes.push(rows[0].tueEnd);
                }
                else if (args = 'wed') {
                    statusTimes.push(rows[0].wedStart);
                    statusTimes.push(rows[0].wedEnd);
                }
                else if (args = 'thu') {
                    statusTimes.push(rows[0].thuStart);
                    statusTimes.push(rows[0].thuEnd);
                }
                else if (args = 'fri') {
                    statusTimes.push(rows[0].friStart);
                    statusTimes.push(rows[0].friEnd);
                }
                else if (args = 'sat') {
                    statusTimes.push(rows[0].satStart);
                    statusTimes.push(rows[0].satEnd);
                }
                else if (args = 'sun') {
                    statusTimes.push(rows[0].sunStart);
                    statusTimes.push(rows[0].sunEnd);
                }

                statusTimes.push(rows[0].main1Start);
                statusTimes.push(rows[0].main1End);
                statusTimes.push(rows[0].main2Start);
                statusTimes.push(rows[0].main2End);

                console.log(statusTimes.toString());

                resolve( statusTimes );
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


