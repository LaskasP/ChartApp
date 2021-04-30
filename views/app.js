
//GET A TABLE
const getTable = async (table) => {
    try {
        const res = await axios.get(`/tables/${table}`)
        return res
    } catch (err) {
        console.log('Error' + err)
    }
}
//GET COUNTRIES
document.querySelector('#plotSelect').addEventListener('change', function () {
    console.log(this.value)
    if (this.value === 'line') {
        console.log('ela1')
    }
    console.log('ela2')
})
//ASK FOR TABLES AND CREATE FIRST OPTION ELEMENT
const fetchTableNames = async () => {
    console.log('ela')
    try {
        const res = await axios.get('/tables')
        let tables = res.data
        for (let table of tables) {
            let option = document.createElement('option')
            Object.assign(option, { value: table, text: table })
            select = document.querySelector('#tableSelect')
            select.append(option)
            console.log('ok')
        }
    } catch (err) {
        console.log('Error' + err)
    }
}
fetchTableNames()

const fetchCountries = async () => {
    try {
        const res = await axios.get('/tables/countries')
        let countries = res.data
        for (let country of countries) {
            console.log(country)
            let option = document.createElement('option')
            Object.assign(option, { value: country.country_name, text: country.country_name })
            select = document.querySelector('#countryMultiSelect')
            select.append(option)
            console.log('ok')
        }
    } catch (err) {
        console.log('Error' + err)
    }
}
fetchCountries()
////////////////////////////////////////////
var numOfTables = 1
document.querySelector('#addButtonTables').addEventListener('click', function(){
    let newTable = ''
    if(numOfTables<5){
        newTable = document.querySelector('#copythis').cloneNode(true)
        newTable.firstElementChild.firstElementChild.setAttribute("name",`table${numOfTables}`)
        //newTable.lastElementChild.remove()
        numOfTables+=1
    }else{
        newTable = document.createElement('h1')
        newTable.innerText = "You cannot have more than 5 tables. It will be a mess!!!"
        newTable.classList.add('is-size-6','has-text-danger')
        this.remove()
    }
    document.querySelector('#tableSelectField').insertBefore(newTable,document.querySelector('#copythis'))
})
var numOfCountry = 1
document.querySelector('#addButtonCountry').addEventListener('click', function(){
    let newTable = ''
    if(numOfCountry<5){
        newTable = document.querySelector('#copythisCountry').cloneNode(true)
        newTable.firstElementChild.firstElementChild.setAttribute("name",`country${numOfCountry}`)
        //newTable.lastElementChild.remove()
        numOfCountry+=1
    }else{
        newTable = document.createElement('h1')
        newTable.innerText = "You cannot have more than 5 countries. It will be a mess!!!"
        newTable.classList.add('is-size-6','has-text-danger')
        this.remove()
    }
    document.querySelector('#countryMultiSelectField').insertBefore(newTable,document.querySelector('#copythisCountry'))
})