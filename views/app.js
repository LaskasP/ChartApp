const select = document.querySelector('#table-select')

const fetchTableNames = async () => {
    try {
        const res = await axios.get('/tables')
        let tables = res.data
        for (let table of tables) {
            let option = document.createElement('option')
            Object.assign(option, { value: table, text: table })
            select.append(option)
            console.log('ok')
        }
    } catch (err) {
        console.log('Error' + err)
    }
}
fetchTableNames()

const getTable = async (table) => {
    try {
        const res = await axios.get(`/tables/${table}`)
        return res
    } catch (err) {
        console.log('Error' + err)
    }
}

select.addEventListener('change', async () => {
    document.querySelector('#container').classList.add('hidden')
    chart(select.value)
})

////////////////////////////////////////////
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

const chart = async (table) => {
    res = await getTable(table)
    data = res.data
    console.log(data)
    var parseTime = d3.timeParse("%Y")
    data.forEach(function (d) {
        d.year_value = parseTime(d.year_value);
        return d;
    })
    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
        .key(function (d) { return d.country_name; })
        .entries(data);
    // Add X axis --> it is a date format
    var x = d3.scaleTime()
        .domain(d3.extent(data, function (d) { return d.year_value; }))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return +d.value; })])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // color palette
    var res = sumstat.map(function (d) { return d.key }) // list of group names
    var color = d3.scaleOrdinal()
        .domain(res)
        .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])

    // Draw the line
    svg.selectAll(".line")
        .data(sumstat)
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", function (d) { return color(d.key) })
        .attr("stroke-width", 1.5)
        .attr("d", function (d) {
            return d3.line()
                .x(function (d) { return x(d.year_value); })
                .y(function (d) { return y(+d.value); })
                (d.values)
        })

}