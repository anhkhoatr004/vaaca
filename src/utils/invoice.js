// Utility để tạo và in hóa đơn
export const printInvoice = (order, settings) => {
  // Tạo window mới để in
  const printWindow = window.open('', '', 'width=800,height=600');

  if (!printWindow) {
    alert('Không thể mở cửa sổ in. Vui lòng kiểm tra popup blocker.');
    return;
  }

  const invoiceHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Hóa đơn #${order.id.slice(0, 8)}</title>
      <style>
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }

        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background: white;
        }

        .header {
          text-align: center;
          border-bottom: 2px solid #333;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }

        .header h1 {
          margin: 0;
          font-size: 28px;
          color: #333;
        }

        .header p {
          margin: 5px 0;
          color: #666;
        }

        .invoice-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          font-size: 14px;
        }

        .invoice-info div {
          flex: 1;
        }

        .invoice-info strong {
          display: block;
          margin-bottom: 5px;
          color: #333;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }

        th {
          background: #f5f5f5;
          padding: 12px;
          text-align: left;
          border-bottom: 2px solid #ddd;
          font-weight: 600;
        }

        td {
          padding: 10px 12px;
          border-bottom: 1px solid #eee;
        }

        .text-right {
          text-align: right;
        }

        .text-center {
          text-align: center;
        }

        .total-row {
          background: #f9f9f9;
          font-weight: bold;
          font-size: 16px;
        }

        .notes {
          background: #fff9e6;
          padding: 15px;
          border-left: 4px solid #ffc107;
          margin-bottom: 20px;
        }

        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          color: #666;
          font-size: 12px;
        }

        .print-button {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 15px 30px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 5px;
          display: block;
          margin: 20px auto;
        }

        .print-button:hover {
          background: #45a049;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>☕ ${settings.shopName}</h1>
        ${settings.shopAddress ? `<p>${settings.shopAddress}</p>` : ''}
        ${settings.shopPhone ? `<p>Điện thoại: ${settings.shopPhone}</p>` : ''}
      </div>

      <div class="invoice-info">
        <div>
          <strong>Hóa đơn #${order.id.slice(0, 8).toUpperCase()}</strong>
          <p>Ngày: ${new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
          <p>Giờ: ${new Date(order.createdAt).toLocaleTimeString('vi-VN')}</p>
        </div>
        <div style="text-align: right;">
          <strong>Trạng thái</strong>
          <p>${getStatusLabel(order.status)}</p>
        </div>
      </div>

      ${order.notes ? `
        <div class="notes">
          <strong>Ghi chú:</strong> ${order.notes}
        </div>
      ` : ''}

      <table>
        <thead>
          <tr>
            <th style="width: 50%">Sản phẩm</th>
            <th class="text-center" style="width: 15%">SL</th>
            <th class="text-right" style="width: 17.5%">Đơn giá</th>
            <th class="text-right" style="width: 17.5%">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          ${order.items.map(item => `
            <tr>
              <td>${item.productName}</td>
              <td class="text-center">${item.quantity}</td>
              <td class="text-right">${item.price.toLocaleString('vi-VN')}đ</td>
              <td class="text-right">${(item.quantity * item.price).toLocaleString('vi-VN')}đ</td>
            </tr>
          `).join('')}
          <tr class="total-row">
            <td colspan="3" class="text-right">TỔNG CỘNG</td>
            <td class="text-right">${order.total.toLocaleString('vi-VN')}đ</td>
          </tr>
        </tbody>
      </table>

      <div class="footer">
        <p>Cảm ơn quý khách đã sử dụng dịch vụ!</p>
        <p>Hẹn gặp lại! ❤️</p>
      </div>

      <button class="print-button no-print" onclick="window.print()">
        🖨️ In hóa đơn
      </button>
    </body>
    </html>
  `;

  printWindow.document.write(invoiceHTML);
  printWindow.document.close();
};

const getStatusLabel = (status) => {
  const labels = {
    pending: 'Chờ xử lý',
    processing: 'Đang xử lý',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy'
  };
  return labels[status] || status;
};
