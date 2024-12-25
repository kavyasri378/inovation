document.getElementById('add-item').addEventListener('click', function () {
    const itemsContainer = document.getElementById('items-container');
    const newItemRow = document.createElement('div');
    newItemRow.classList.add('item-row');
    newItemRow.innerHTML = `
        <label for="item-description">Description:</label>
        <input type="text" id="item-description" name="item-description[]" required>
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" name="quantity[]" required>
        <label for="price">Price per Unit:</label>
        <input type="number" id="price" name="price[]" required>
        <label for="tax">Tax Rate (%):</label>
        <input type="number" id="tax" name="tax[]" required>
    `;
    itemsContainer.appendChild(newItemRow);
});

document.getElementById('invoice-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const customerName = document.getElementById('customer-name').value;
    const customerAddress = document.getElementById('customer-address').value;
    const customerPhone = document.getElementById('customer-phone').value;
    const deliveryType = document.getElementById('delivery-type').value;
    const itemDescriptions = document.getElementsByName('item-description[]');
    const quantities = document.getElementsByName('quantity[]');
    const prices = document.getElementsByName('price[]');
    const taxes = document.getElementsByName('tax[]');

    let invoiceHTML = `
        <div class="invoice">
            <div class="invoice-header">
                <h2>SOKKAI-THE CLOTHING BRAND</h2>
                <p>Bava Street, Pollachi, Coimbatore, Tamil Nadu, India</p>
                <p>Phone: 8438434868 | Email: sokkai@example.com</p>
            </div>
            <div class="invoice-details">
                <table>
                    <tr>
                        <td><strong>Customer Name:</strong> ${customerName}</td>
                        <td><strong>Invoice Date:</strong> ${new Date().toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <td><strong>Customer Address:</strong> ${customerAddress}</td>
                        <td><strong>Invoice Number:</strong> #${Math.floor(Math.random() * 100000000000)}</td>
                    </tr>
                    <tr>
                        <td><strong>Customer Phone:</strong> ${customerPhone}</td>
                        <td><strong>Delivery Type:</strong> ${deliveryType}</td>
                    </tr>
                    <tr>
                        <td><strong>Salesperson:</strong> Mahendra Kumar</td>
                        <td><strong>Payment Terms:</strong> Due Upon Receipt</td>
                    </tr>
                </table>
            </div>
            <div class="invoice-items">
                <table>
                    <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Tax</th>
                        <th>Total</th>
                    </tr>
    `;

    let totalAmount = 0;
    for (let i = 0; i < itemDescriptions.length; i++) {
        const description = itemDescriptions[i].value;
        const quantity = quantities[i].value;
        const price = prices[i].value;
        const taxRate = taxes[i].value;
        const total = quantity * price * (1 + taxRate / 100);
        totalAmount += total;

        invoiceHTML += `
            <tr>
                <td>${description}</td>
                <td>${quantity}</td>
                <td>${price}</td>
                <td>${taxRate}%</td>
                <td>${total.toFixed(2)}</td>
            </tr>
        `;
    }

    invoiceHTML += `
                </table>
            </div>
            <div class="invoice-footer">
                <p><strong>Delivery Charge:</strong> $30.00</p>
                <p><strong>Total Amount Due:</strong> ${(totalAmount + 30).toFixed(2)}</p>
            </div>
        </div>
    `;

    document.getElementById('invoice-container').innerHTML = invoiceHTML;
});
