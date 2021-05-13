//ASK FOR TABLES AND CREATE FIRST OPTION ELEMENT
window.onload = async () => {
    try {
        const res = await axios.get('/tables')
        let tables = res.data
        for (let table of tables) {
            let option = document.createElement('option')
            Object.assign(option, { value: table, text: table.replace(/_/g, ' ') })
            select = document.querySelector('#tableSelect')
            select.append(option)
        }
    } catch (err) {
        console.log('Error' + err)
    }
    try {
        const res = await axios.get('/tables/countries')
        let countries = res.data
        for (let country of countries) {
            console.log(country)
            let option = document.createElement('option')
            Object.assign(option, { value: country.country_name, text: country.country_name })
            select = document.querySelector('#countryMultiSelect')
            select.append(option)
        }
    } catch (err) {
        console.log('Error' + err)
    }
}
const clear = function () {
    document.querySelector('#addButtonCountry').disabled = false
    document.querySelector('#addButtonTables').disabled = false
    groupby = document.querySelector('#groupby')
    groupby.disabled = false
    groupby.value = 'all'
    tablesField = document.querySelector('#tableSelectField')
    countriesField = document.querySelector('#countryMultiSelectField')
    while (tablesField.childElementCount > 3) {
        tablesField.removeChild(tablesField.lastElementChild)
    }
    while (countriesField.childElementCount > 3) {
        countriesField.removeChild(countriesField.lastElementChild)
    }

}
document.querySelector('#plotSelect').addEventListener('change', function () {
    clear()
    console.log(this.value)
    if (this.value === 'scater') {
        document.querySelector('#addButtonCountry').disabled = true
        document.querySelector('#addButtonTables').disabled = true
        document.querySelector('#groupby').disabled = true
        let newTable = document.querySelector('#copythis').cloneNode(true)
        newTable.firstElementChild.firstElementChild.setAttribute("name", `table2`)
        document.querySelector('#tableSelectField').insertBefore(newTable, document.querySelector('#copythis'))
    }
    console.log('ela2')
})

////////////////////////////////////////////
var numOfTables = 1
document.querySelector('#addButtonTables').addEventListener('click', function () {
    let newTable = ''
    if (numOfTables < 5) {
        newTable = document.querySelector('#copythis').cloneNode(true)
        newTable.firstElementChild.firstElementChild.setAttribute("name", `table${numOfTables}`)
        //newTable.lastElementChild.remove()
        numOfTables += 1
    } else {
        newTable = document.createElement('h1')
        newTable.innerText = "You cannot have more than 5 tables. It will be a mess!!!"
        newTable.classList.add('is-size-6', 'has-text-danger')
        this.remove()
    }
    document.querySelector('#tableSelectField').insertBefore(newTable, document.querySelector('#copythis'))
})
var numOfCountry = 1
document.querySelector('#addButtonCountry').addEventListener('click', function () {
    let newTable = ''
    if (numOfCountry < 5) {
        newTable = document.querySelector('#copythisCountry').cloneNode(true)
        newTable.firstElementChild.firstElementChild.setAttribute("name", `country${numOfCountry}`)
        //newTable.lastElementChild.remove()
        numOfCountry += 1
    } else {
        newTable = document.createElement('h1')
        newTable.innerText = "You cannot have more than 5 countries. It will be a mess!!!"
        newTable.classList.add('is-size-6', 'has-text-danger')
        this.remove()
    }
    document.querySelector('#countryMultiSelectField').insertBefore(newTable, document.querySelector('#copythisCountry'))
})