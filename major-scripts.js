document.getElementById('majorSearchForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const majorDesc = document.getElementById('majorDesc').value;
    const goodForStudents = document.getElementById('goodForStudents').value;
    const futureJob = document.getElementById('futureJob').value;

    // Fetch the major information
     const response = await fetch('https://i3yng2hc62.execute-api.us-east-1.amazonaws.com/prod/kao-major', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({ majorDesc, goodForStudents, futureJob })
     });

	 const data1 = await response.json();
	 console.log(data1['data']);
	 const data = data1['data'];

    // Dummy data
    //const data = [
    //    {
    //        major_name: 'Major A',
    //        good_for_which_students: 'Students A',
    //        future_job: 'Job A',
    //        major_detail: 'Detail A'
    //    },
    //    {
    //        major_name: 'Major B',
    //        good_for_which_students: 'Students B',
    //        future_job: 'Job B',
    //        major_detail: 'Detail B'
    //    }
    //];

    displayMajorResults(data);
});

function displayMajorResults(data) {
    const resultsDiv = document.getElementById('majorResults');
    resultsDiv.innerHTML = '';

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headers = ['Major Name', 'Major Detail', 'Future Job'];

    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.innerText = headerText;
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    data.forEach(rowData => {
        const row = document.createElement('tr');

        Object.values(rowData).forEach((cellData, index) => {
            const cell = document.createElement('td');
            if (index === 0) {
                const link = document.createElement('a');
                link.href = '#';
                link.innerText = cellData;
                link.addEventListener('click', () => fetchMajorUniv(cellData));
                cell.appendChild(link);
            } else {
                cell.innerText = cellData;
            }
            row.appendChild(cell);
        });

        table.appendChild(row);
    });

    resultsDiv.appendChild(table);
}

async function fetchMajorUniv(majorName) {
     //Fetch the university information
     const response = await fetch('https://i3yng2hc62.execute-api.us-east-1.amazonaws.com/prod/kao-major2univ', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({ majorName })
     });

	 const data1 = await response.json();
	 console.log(data1['data']);
	 const data = data1['data'];

    // Dummy data
    //const data = [
    //    {
    //        major_name: majorName,
    //        university_name: 'University A',
    //        major_rank: 'Rank 1'
    //    },
    //    {
    //        major_name: majorName,
    //       university_name: 'University B',
    //        major_rank: 'Rank 2'
    //     }
    //];

    displayUnivResults(data);
	
    // Scroll to the beginning of the univResults div
    document.getElementById('univResults').scrollIntoView({ behavior: 'smooth' });
}

function displayUnivResults(data) {
    const resultsDiv = document.getElementById('univResults');
    resultsDiv.innerHTML = '';

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headers = ['Major Name', 'University Name', 'Major Rank'];

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
