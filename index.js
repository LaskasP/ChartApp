const express = require('express')
const app = express()
const path = require('path')
const mysql = require('mysql2')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Korinthos909890!',
    database: 'chartapp'
})

con.connect((e) => {
    if (e) {s
        return console.error('Connection failed ' + e.message)
    }
    console.log('Connection established!')
})



app.use(express.static('views'))
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/plot', (req, res) => {
    let {plot} = req.query
    let newQuery = ''
    if( plot === 'line'){


        let whereclase = `country_name = '${req.query.country}'`
        keys = Object.keys(req.query)
        for(let key of keys){
            if( key[0] == 'c' && key[7]){
                whereclase += ` OR country_name = '${req.query[key]}'`
            }
        }
        newQuery = `SELECT year_value,value,CONCAT(country_name,' ','${req.query.table}') AS country_name FROM (SELECT  country_id,year_value,value FROM ${req.query.table}
            LEFT JOIN years ON ${req.query.table}.year_id = years.year_id) AS arxidia
            LEFT JOIN countries ON arxidia.country_id = countries.country_id
            WHERE ${whereclase}`
        for(let key of keys){
            if(key[0] === 't' && key[5]){
                console.log(key)
                newQuery += `UNION ALL
                SELECT year_value,value,CONCAT(country_name,' ','${req.query[key]}') AS country_name FROM (SELECT  country_id,year_value,value FROM ${req.query[key]}
                LEFT JOIN years ON ${req.query[key]}.year_id = years.year_id) AS arxidia
                LEFT JOIN countries ON arxidia.country_id = countries.country_id
                WHERE ${whereclase}`
            }
        }
        newQuery += `ORDER BY year_value`
    }else if(plot === 'scater'){
        newQuery = `SELECT `
    }else{
        console.log('lol')
    }
    let {country} = req.query

    con.query(newQuery, (err, results, fields) => {
        if (err) throw err
        console.log(results)
        res.render('show', { plot, results, country})
    })

})
app.get('/tables', (req, res) => {
    con.query(
        'SELECT table_name FROM information_schema.tables WHERE table_schema ="chartapp"', (err, results, fields) => {
            if (err) throw err
            results = results.map(v => v.TABLE_NAME)
            results = results.filter((v) => {
                return (v !== 'years') && (v !== 'countries')
            })
            res.send(results)
        }
    )
})

app.get('/tables/:table', (req, res) => {
    console.log(req.params)
    const { table } = req.params
    con.query(
        `SELECT * FROM ${table}`, (err, results, fields) => {
            if (err) throw err
            //results = results.map(v => v.TABLE_NAME)
            res.send(results)
        }
    )
})

app.listen(3000, () => {
    console.log("OLA KALA")
})

