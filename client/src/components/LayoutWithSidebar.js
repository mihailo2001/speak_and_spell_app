import React from 'react';
import Sidebar from './Sidebar';

const LayoutWithSidebar = ({ children }) => {
    return (
        <div className='layout'>
            <div className="profile-page">
                <Sidebar />
            </div>
            <div className="profile-content">
                {children}
            </div>
        </div>
    );
};

export default LayoutWithSidebar;
