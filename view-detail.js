 // Extract Query Parameters
 function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id'),
        items: params.get('items'),
        payment: params.get('payment'),
        address: params.get('address'),
        totalItems: params.get('totalItems'),
        totalCost: params.get('totalCost'),
    };
}

// Populate Order Details
function displayOrderDetails() {
    const orderDetails = document.getElementById('orderDetails');
    const order = getQueryParams();

    if (!order.id) {
        orderDetails.innerHTML = `<p class="text-danger">No order details found.</p>`;
        return;
    }

    orderDetails.innerHTML = `
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Items:</strong> ${order.items}</p>
        <p><strong>Payment Method:</strong> ${order.payment}</p>
        <p><strong>Shipping Address:</strong> ${order.address}</p>
        <p><strong>Total Items:</strong> ${order.totalItems}</p>
        <p><strong>Total Cost:</strong> ${order.totalCost}</p>
    `;
}

// Back Button Functionality
function goBack() {
    window.history.back();
}

// Initialize
window.onload = displayOrderDetails;