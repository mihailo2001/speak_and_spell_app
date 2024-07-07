import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

const Sidebar = () => {
    const { authState } = useContext(AuthContext);

    const renderLinks = () => {
        if (authState.role === 'admin') {
            return (
                <>
                    <Link to="/admin/teachers">Nastavnici</Link>
                    <Link to="/admin/courses">Kursevi</Link>
                    <Link to="/admin/roles">Uloge</Link>
                    <Link to="/admin/payments">Uplate</Link>
                </>
            );
        }
        else if (authState.role === 'teacher') {
            return (
                <>
                    <Link to="/teacher/posts">Objave</Link>
                    <Link to="/teacher/class-time">Termini</Link>
                    <Link to="/teacher/enrollments">Zahtjevi</Link>
                    <Link to="/teacher/remove-child">Ukloni dijete</Link>
                </>
            );
        } else if (authState.role === 'parent') {
            return (
                <>
                    <Link to="/parent/payments">Uplate</Link>
                    <Link to="/parent/add-child">Prijavi dijete</Link>
                </>
            );
        }
        return <></>;
    };

    return (
        <div className="sidebar">
            <span>
                <h2>{authState.username}</h2>
                <p>{authState.role}</p>
            </span>
            <br></br>
            <Link className='' to="/profile">Lični podaci</Link>
            {renderLinks()}
        </div>
    );
};

export default Sidebar;
