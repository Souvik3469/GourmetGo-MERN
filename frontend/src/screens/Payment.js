import React, { useState } from 'react';

export default function Payment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('mobileUPI');

  const handlePayment = (event) => {
    event.preventDefault();
    setIsProcessing(true);

    // Simulating payment processing delay (3 seconds)
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 3000);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className="payment-container">
      <h1>Payment Page</h1>
      {isPaid ? (
        <div className="success-message">
          <p>Payment successful! Amount: {paymentAmount}</p>
        </div>
      ) : (
        <form className="payment-form" onSubmit={handlePayment}>
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            className="payment-method-select"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <option value="mobileUPI">Mobile UPI</option>
            <option value="netbanking">Netbanking</option>
          </select>

          <div className="payment-fields">
            <table>
              <tbody>
                {paymentMethod === 'mobileUPI' && (
                  <>
                    <tr>
                      <td><label htmlFor="upiId">UPI ID:</label></td>
                      <td><input type="text" id="upiId" className="payment-input" /></td>
                    </tr>
                    <tr>
                      <td><label htmlFor="mobileNumber">Mobile Number:</label></td>
                      <td><input type="text" id="mobileNumber" className="payment-input" /></td>
                    </tr>
                  </>
                )}

                {paymentMethod === 'netbanking' && (
                  <>
                    <tr>
                      <td><label htmlFor="accountNumber">Account Number:</label></td>
                      <td><input type="text" id="accountNumber" className="payment-input" /></td>
                    </tr>
                    <tr>
                      <td><label htmlFor="bankName">Bank Name:</label></td>
                      <td><input type="text" id="bankName" className="payment-input" /></td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            className="payment-input"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
          />

          <button type="submit" className="pay-button" disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      )}

      <style>
        {`
        .payment-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        .success-message {
          padding: 20px;
          background-color: #67c23a;
          border-radius: 5px;
          color: #fff;
          margin-bottom: 20px;
        }

        .payment-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 400px;
          padding: 20px;
          background-color: #0b3472;
          border-radius: 10px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }

        .payment-method-select {
          margin-bottom: 10px;
          font-size: 16px;
          padding: 10px;
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: #050202;
        }

        .payment-fields {
          margin-bottom: 10px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
        }

        table td {
          padding: 10px;
        }

        table td:first-child {
          padding-right: 20px;
        }

        .payment-input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .pay-button {
          background-color: #697ce6;
          color: #fff;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .pay-button:hover {
          background-color: #31ca23;
        }
        `}
      </style>
    </div>
  );
}
