import React from 'react'
import DepartmentList from '../../components/admin/report/DepartmentList'
import Navbar from '../../components/Nabvbar'

const ReportPageDepartments = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50">
    <div className="">
      <DepartmentList />
    </div>
  </div>
  </>
  )
}

export default ReportPageDepartments