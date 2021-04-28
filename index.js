const express = require('express')
const app = express()
const path = require('path')
const mysql = require('mysql2')


app.set('views', path.join(__dirname, '/views'))
//app.set('view engine', 'ejs')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Korinthos909890!',
    database: 'chartapp'
})

con.connect((e) => {
    if (e) {
        return console.error('Connection failed ' + e.message)
    }
    console.log('Connection established!')
})

app.use(express.static('views'))

app.get('/tables', (req, res) => {
    con.query(
        'SELECT table_name FROM information_schema.tables WHERE table_schema ="chartapp"', (err, results, fields) => {
            if (err) throw err
            results = results.map(v => v.TABLE_NAME)
            res.send(results)
        }
    )
})

app.get('/tables/:table', (req, res) => {
    console.log(req.params)
    const { table } = req.params
    con.query(
        `SELECT year_value,value,country_name FROM (SELECT  country_id,year_value,value FROM ${table}
            LEFT JOIN years ON ${table}.year_id = years.year_id) AS arxidia
            LEFT JOIN countries ON arxidia.country_id = countries.country_id
            WHERE country_name = 'Greece' OR country_name = 'Germany' OR country_name = 'Italy'
            ORDER BY year_value`, (err, results, fields) => {
        if (err) throw err
        //results = results.map(v => v.TABLE_NAME)
        res.send(results)
    }
    )
})

app.listen(3000, () => {
    console.log("OLA KALA")
})

