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
    filteredOrders.forEach(order => {
        const row = `
            <tr>
                <td>${order.id}</td>
                <td>${order.date}</td>
                <td>${order.status}</td>
                <td>${order.total}</td>
                <td><button class="btn btn-primary btn-sm" onclick="viewDetails('${order.id}')">View Details</button></td>
            </tr>
        `;
        orderTable.insertAdjacentHTML('beforeend', row);
    });
}

// Filter Orders
function filterOrders() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const status = document.getElementById('orderStatus').value;

    let filteredOrders = orders;

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
    if (!order) return;

    document.getElementById('modalOrderId').textContent = order.id;
    document.getElementById('modalItems').textContent = order.items;
    document.getElementById('modalPayment').textContent = order.payment;
    document.getElementById('modalAddress').textContent = order.address;
    document.getElementById('modalTotalItems').textContent = order.items.split(', ').length;

    const modal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
    modal.show();
}

// Initialize Table
document.getElementById('startDate').addEventListener('change', filterOrders);
document.getElementById('endDate').addEventListener('change', filterOrders);
document.getElementById('orderStatus').addEventListener('change', filterOrders);

populateTable(orders); // Initial population


// Function to validate and disable end date selection
function validateDateRange() {
    const startDate = document.getElementById('startDate').value;
    const endDateInput = document.getElementById('endDate');
    
    if (startDate) {
        // Disable the end date input if the start date is set
        endDateInput.disabled = false;  // Enable end date input

        // If the end date is earlier than the start date, disable it and show as greyed out
        if (endDateInput.value && new Date(endDateInput.value) < new Date(startDate)) {
            endDateInput.value = '';  // Clear the end date if it's invalid
        }

        // Set the min attribute to prevent selecting earlier dates
        endDateInput.setAttribute('min', startDate);
    } else {
        // Disable the end date input if no start date is selected
        endDateInput.disabled = true;
        endDateInput.value = '';  // Clear the end date if no start date
    }
}

// Add event listeners to validate when the user changes dates
document.getElementById('startDate').addEventListener('change', function() {
    validateDateRange(); // Validate when start date changes
});

document.getElementById('endDate').addEventListener('change', function() {
    validateDateRange(); // Validate when end date changes
});

// Initialize validation on page load
window.onload = function() {
    validateDateRange(); // Ensure end date is correctly set based on the start date
};
