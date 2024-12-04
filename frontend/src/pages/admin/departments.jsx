import React from 'react';
import DepartmentList from '../../components/admin/DepartmentList';
import ClassList from '../../components/admin/AddDetails';
import { EndpointProvider } from '../../context/EndpointContext';

const Dashboard = () => {
  return (
    <EndpointProvider>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <DepartmentList />
          {/* <ClassList /> */}
        </div>
      </div>
    </EndpointProvider>
  );
};

export default Dashboard;
