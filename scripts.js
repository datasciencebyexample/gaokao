document.getElementById('searchForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const univName = document.getElementById('univName').value;
    const tagList = Array.from(document.getElementById('tagList').selectedOptions).map(option => option.value);
    const province = document.getElementById('province').value;
    const majorDesc = document.getElementById('majorDesc').value;
    const rank = document.getElementById('rank').value;

	console.log(univName)
	console.log(tagList)
	console.log(province)
	console.log(majorDesc)
	console.log(rank)	
    const response = await fetch('https://i3yng2hc62.execute-api.us-east-1.amazonaws.com/prod/kao-univ', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ univName, tagList, province, majorDesc, rank })
    });
	
	const data1 = await response.json();
	console.log(data1['data']);
	const data = data1['data'];
	
	// Dummy output
	//const data = [
	//	{
	//		univ_name: 'University A',
	//		tag_list: ['Tag A', 'Tag B','Tag C'],
	//		province: 'Province A',
	//		city: 'City A',
	//		rank: 'Rank 1',
	//		major: 'Major A',
	//		url: 'https://www.university-a.com'
	//	},
	//	{
	//		univ_name: 'University B',
	//		tag_list: ['Tag B', 'Tag C'],
	//		province: 'Province B',
	//		city: 'City B',
	//		rank: 'Rank 2',
	//		major: 'Major B',
	//		url: 'https://www.university-b.com'
	//	}
	//];
	

    displayResults_dummy(data);
});


function displayResults_dummy(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headers = ['University Name', 'Tags', 'Province', 'City', 'Rank', 'URL'];

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
            if (Array.isArray(cellData)) {
                cellData.forEach((value, index) => {
                    const span = document.createElement('span');
                    span.innerText = value;
                    cell.appendChild(span);
                    if (index < cellData.length - 1) {
                        cell.appendChild(document.createElement('br'));
                    }
                });
            } else {
                cell.innerText = cellData;
            }
            row.appendChild(cell);
        });

        table.appendChild(row);
    });

    resultsDiv.appendChild(table);
}


// Add this code to handle radio button change event
document.querySelectorAll('input[name="searchType"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const genericFields = document.getElementById('genericFields');
        const rankFields = document.getElementById('rankFields');
        if (radio.value === 'generic') {
            genericFields.style.display = 'block';
            rankFields.style.display = 'none';
        } else {
            genericFields.style.display = 'none';
            rankFields.style.display = 'block';
        }
    });
});

// Add this code to handle radio button change event
document.querySelectorAll('input[name="searchType"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const genericFields = document.getElementById('genericFields');
        const rankFields = document.getElementById('rankFields');
        if (radio.value === 'generic') {
            genericFields.style.display = 'block';
            rankFields.style.display = 'none';
        } else {
            genericFields.style.display = 'none';
            rankFields.style.display = 'block';
        }
        resetInputFields();
    });
});

function resetInputFields() {
    document.getElementById('univName').value = '';
    document.getElementById('majorDesc').value = '';
    document.getElementById('tagList').selectedIndex = -1;
    document.getElementById('province').selectedIndex = 0;
    document.getElementById('rank').selectedIndex = 0;
}
