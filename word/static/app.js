document.getElementById('uploadForm').onsubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch('/upload', { method: 'POST', body: formData });
    const data = await response.json();

    // Prepare data for Chart.js
    const labels = data.slice(0, 10).map(([word]) => word); // Top 10 words
    const frequencies = data.slice(0, 10).map(([_, frequency]) => frequency);

    // Create or update the chart
    const ctx = document.getElementById('outputChart').getContext('2d');
    if (window.myChart) {
        window.myChart.destroy();
    }
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Word Frequency',
                data: frequencies,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
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
};