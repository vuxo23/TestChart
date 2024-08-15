function readCSV(filePath) {
    return fetch(filePath)
        .then(response => response.text())
        .then(data => {
           
            const rows = data.split('\n');
            const labels = [];
            const values = [];
            
           
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i].split(',');
                if (row.length === 2) {
                    labels.push(row[0]);
                    values.push(parseInt(row[1]));
                }
            }

            return { labels, values };
        });
}

function createChart(labels, values) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'NPIP',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
readCSV("data.csv").then(data => {
    createChart(data.labels, data.values);
});

