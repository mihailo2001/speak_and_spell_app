import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../helpers/AuthContext';
import axios from 'axios';

const ParentPayments = () => {
  const { authState } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (authState.role === 'parent') {
      const fetchPayments = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/payment/all/${authState.id}`);
          setPayments(response.data);
        } catch (error) {
          console.error('Error fetching payments:', error);
        }
      };
      fetchPayments();
    }
  }, [authState.id]);

  if (authState.role !== 'parent') {
    return <p>Nemate pravo pristupa</p>;
  }

  const handlePay = async (paymentId) => {
    try {
      await axios.put(`http://localhost:3001/payment/pay/${paymentId}`);
      const response = await axios.get(`http://localhost:3001/payment/all/${authState.id}`);
      setPayments(response.data);
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  return (
    <div className="profile-page">
      <div className='user-content'>
      <h2>Uplate</h2>
      <table>
        <thead>
          <tr>
            <th>Vrijednost</th>
            <th>Datum</th>
            <th>Status</th>
            <th>Plati</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id}>
              <td>{payment.amount}</td>
              <td>{new Date(payment.date).toLocaleDateString('en-GB')}</td>
              <td>{payment.status}</td>
              <td>
                {payment.status === 'unpaid' ? (
                  <button onClick={() => handlePay(payment.id)}>Pay</button>
                ) : (
                  <span>Plaćeno</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ParentPayments;
