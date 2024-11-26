import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ClassList = () => {
  const { departmentId, yearId } = useParams();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/departments/${departmentId}/years/${yearId}/classes`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch classes.");
        }
        const data = await response.json();
        setClasses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, [departmentId, yearId]);

  if (loading) return <p>Loading classes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        Classes for Department {departmentId}, Year {yearId}
      </h2>
      <ul className="space-y-2">
        {classes.map((classItem) => (
          <li key={classItem.id} className="p-2 border rounded">
            {classItem.class_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;
