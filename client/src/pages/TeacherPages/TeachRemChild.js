import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../helpers/AuthContext';
import axios from 'axios';

const TeachRemChild = () => {
  
  const { authState } = useContext(AuthContext);
  const [enrollRequests, setEnrollRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/enrollments/byTeacherAcc/${authState.id}`);
        setEnrollRequests(response.data.listOfEnrollments);
        console.log(response.data.listOfEnrollments);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };
    fetchRequests();

  }, [authState.id]);

  if (authState.role !== 'teacher') {
    return <p>Nemate pravo pristupa</p>;
  }

  const handleRemove = async (enrollId) => {
    try {
      await axios.delete(`http://localhost:3001/enrollments/${enrollId}`);
      const response = await axios.get(`http://localhost:3001/enrollments/byTeacherAcc/${authState.id}`);
      
      setEnrollRequests(response.data.listOfEnrollments);
    } catch (error) {
      console.error('Error updating enrollment:', error);
    }
  };

  return (
    <div>
      <div className="profile-page">
        <div className='user-content'>
          <h1>Ukloni dijete</h1>
          <table>
            <thead>
              <tr>
                <th>Dijete</th>
                <th>Kurs</th>
                <th>Ukloni</th>
              </tr>
            </thead>
            <tbody>
              {enrollRequests.map(enrollment => (
                <tr key={enrollment.id}>
                  {console.log(enrollment)}
                  <td>{enrollment.Child?.name}</td>
                  <td>{enrollment.Course?.title}</td>
                  <td>
                    <button onClick={() => handleRemove(enrollment.id)}>Ukloni</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TeachRemChild
