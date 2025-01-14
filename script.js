// Sample Orders Data
const orders = [
    {
        id: 'ORD001',
        date: '2025-01-10',
        status: 'Delivered',
        total: '$150.00',
        items: 'Laptop, Mouse',
        payment: 'Credit Card',
        address: '123 Main St, Cityville',
    },
    {
        id: 'ORD002',
        date: '2025-01-12',
        status: 'Pending',
        total: '$200.00',
        items: 'Smartphone, Charger',
        payment: 'PayPal',
        address: '456 Elm St, Townsville',
    },
];

// Populate Order Table
const orderTable = document.getElementById('orderTable');
const noResults = document.getElementById('noResults');

function populateTable(filteredOrders) {
    orderTable.innerHTML = ''; // Clear previous rows
    if (filteredOrders.length === 0) {
        noResults.classList.remove('d-none');
        return;
    }
    noResults.classList.add('d-none');

    const fragment = document.createDocumentFragment(); // Improve performance
    filteredOrders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.date}</td>
            <td>${order.status}</td>
            <td>${order.total}</td>
            <td>
                <button 
                    class="btn btn-primary btn-sm" 
                    onclick="viewDetails('${order.id}')">View Details</button>
            </td>
        `;
        fragment.appendChild(row);
    });

    orderTable.appendChild(fragment); // Append all rows at once
}

// Filter Orders
function filterOrders() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const status = document.getElementById('orderStatus').value;

    let filteredOrders = [...orders];

    if (startDate) {
        filteredOrders = filteredOrders.filter(order => new Date(order.date) >= new Date(startDate));
    }
    if (endDate) {
        filteredOrders = filteredOrders.filter(order => new Date(order.date) <= new Date(endDate));
    }
    if (status !== 'all') {
        filteredOrders = filteredOrders.filter(order => order.status.toLowerCase() === status.toLowerCase());
    }

    populateTable(filteredOrders);
}

// View Order Details
function viewDetails(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) {
        console.error(`Order ID ${orderId} not found.`);
        return;
    }

    // Construct query parameters with order data
    const queryParams = new URLSearchParams({
        id: order.id,
        items: order.items,
        payment: order.payment,
        address: order.address,
        totalItems: order.items.split(', ').length,
        totalCost: order.total,
    });

    // Navigate to the detail page
    window.location.href = `view-detail.html?${queryParams.toString()}`;
}

// Validate Date Range
function validateDateRange() {
    const startDate = document.getElementById('startDate').value;
    const endDateInput = document.getElementById('endDate');

    if (startDate) {
        endDateInput.disabled = false;

        if (endDateInput.value && new Date(endDateInput.value) < new Date(startDate)) {
            endDateInput.value = ''; // Clear invalid end date
        }

        endDateInput.setAttribute('min', startDate); // Prevent earlier dates
    } else {
        endDateInput.disabled = true;
        endDateInput.value = ''; // Clear end date if no start date
    }
}

// Event Listeners for Filtering and Validation
document.getElementById('startDate').addEventListener('change', () => {
    validateDateRange();
    filterOrders();
});
document.getElementById('endDate').addEventListener('change', filterOrders);
document.getElementById('orderStatus').addEventListener('change', filterOrders);

// Initialize Table
populateTable(orders); // Populate with all orders initially

// Initialize Validation on Page Load
window.onload = () => validateDateRange();
