
const fetchTableNames = async () => {
    try {
        const res = await axios.get('/tables')
        let tables = res.data
        for (table of tables) {
            let option = document.createElement('option')
            Object.assign(option, { value: table, text: table })
            document.querySelector('#table-select').append(option)
            console.log('ok')
        }
    } catch (err) {
        console.log('Error' + err)
    }
}
fetchTableNames()