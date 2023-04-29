document.getElementById('scoreSearchForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const province = document.getElementById('province').value;
    const univName = document.getElementById('univName').value;

    // Fetch the score information
     const response = await fetch('https://i3yng2hc62.execute-api.us-east-1.amazonaws.com/prod/kao-score', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({ province, univName })
     });

	const data1 = await response.json();
	console.log(data1['data']);
	const data = data1['data'];

    // Dummy data
    //const data = [
    //    {
    //        province: province,
    //        univ_name: univName,
    //        lowest_score: 500
    //    }
    //];

    displayScoreResults(data);
});

function displayScoreResults(data) {
    const resultsDiv = document.getElementById('scoreResults');
    resultsDiv.innerHTML = '';

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headers = ['省份', '学校', '科别','招生','批次','录取线范围'];

    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.innerText = headerText;
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    data.forEach(rowData => {
        const row = document.createElement('tr');

        Object.values(rowData).forEach(cellData => {
            const cell = document.createElement('td');
            cell.innerText = cellData;
            row.appendChild(cell);
        });

        table.appendChild(row);
    });

    resultsDiv.appendChild(table);
}