import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../helpers/AuthContext';
import axios from 'axios';

const AdmTeachers = () => {
  const { authState } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/auth`);
        setUsers(response.data.listOfUsers);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };
    fetchRequests();

  }, [authState.id]);

  if (authState.role !== 'admin') {
    return <p>Nemate pravo pristupa</p>;
  }

  const handleRemove = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/auth/users/${userId}`);
      const response = await axios.get(`http://localhost:3001/auth`);
      
      setUsers(response.data.listOfUsers);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:3001/auth/users/${userId}`, { role: newRole });
      const response = await axios.get(`http://localhost:3001/auth`);
      setUsers(response.data.listOfUsers);
    } catch (error) {
      console.error('Error changing user role:', error);
    }
  };

  return (
    <div>
      <div className="profile-page">
        <div className='user-content'>
          <h1>Ukloni korisnika</h1>
          <table>
            <thead>
              <tr>
                <th>Ime</th>
                <th>Uloga</th>
                <th>Promijeni ulogu</th>
                <th>Ukloni</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td><select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="teacher">Teacher</option>
                      <option value="parent">Parent</option>
                      <option value="student">Student</option>
                    </select></td> 
                    <td>
                    <button onClick={() => handleRemove(user.id)}>Ukloni</button>
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

export default AdmTeachers