// StudentTable.js
import React from 'react';

const StudentTable = ({ students, sortConfig, setSortConfig, paginatedStudents }) => {
    const handleSort = (key) => {
        setSortConfig({
            key,
            direction:
                sortConfig.key === key && sortConfig.direction === 'ascending'
                    ? 'descending'
                    : 'ascending',
        });
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {[
                            { key: 'student_id', label: 'ID' },
                            { key: 'student_name', label: 'Name' },
                            { key: 'student_department', label: 'Department' },
                            { key: 'student_dob', label: 'DOB' },
                            { key: 'student_year', label: 'Year' },
                            { key: 'class', label: 'Class' },
                        ].map(({ key, label }) => (
                            <th
                                key={key}
                                onClick={() => handleSort(key)}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            >
                                {label}
                                {sortConfig.key === key && (
                                    <span>{sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}</span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedStudents.map((student) => (
                        <tr key={student.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{student.student_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{student.student_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{student.student_department}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {new Date(student.student_dob).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{student.student_year}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{student.class}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentTable;
