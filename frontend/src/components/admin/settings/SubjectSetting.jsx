import React, { useState, useEffect, useMemo } from "react";
import { toast, Toaster } from "react-hot-toast";

const SubjectSetting = () => {
    // State Management
    const [subjects, setSubjects] = useState([]);
    const [formData, setFormData] = useState({
        sub_code: "",
        sub_name: "",
    });
    const [action, setAction] = useState("add");
    const [loading, setLoading] = useState(false);

    // Enhanced State
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({
        key: "sub_code",
        direction: "ascending",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [validationErrors, setValidationErrors] = useState({});

    // Configuration
    const endpoint = `${import.meta.env.VITE_API_BASE_URL}/subjectsettings`;
    const itemsPerPage = 10;

    // Fetch Subjects
    const fetchSubjects = async () => {
        setLoading(true);
        try {
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error("Failed to fetch");
            const data = await response.json();
            setSubjects(data);
        } catch (error) {
            toast.error("Failed to fetch subjects");
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Lifecycle
    useEffect(() => {
        fetchSubjects();
    }, []);

    // Validation Function
    const validateForm = () => {
        const errors = {};

        if (!formData.sub_code.trim()) {
            errors.sub_code = "Subject code is required";
        }
        if (!formData.sub_name.trim()) {
            errors.sub_name = "Subject name is required";
        }

        return errors;
    };

    // Handle Submit
    const handleSubmit = async () => {
        if (action !== "delete") {
            const errors = validateForm();
            if (Object.keys(errors).length > 0) {
                setValidationErrors(errors);
                toast.error("Please fix the validation errors");
                return;
            }
        }

        try {
            let response;
            if (action === "add") {
                response = await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            } else if (action === "update") {
                response = await fetch(`${endpoint}/${formData.sub_code}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            } else if (action === "delete") {
                if (window.confirm(`Are you sure you want to delete subject ${formData.sub_name}?`)) {
                    response = await fetch(`${endpoint}/${formData.sub_code}`, {
                        method: "DELETE",
                    });
                } else {
                    return;
                }
            }

            if (response) {
                const data = await response.json();
                if (response.ok) {
                    fetchSubjects();
                    resetForm();
                    toast.success(data.message || "Action completed successfully");
                } else {
                    toast.error(data.message || "Failed to perform action");
                }
            }
        } catch (error) {
            console.error("Submit error:", error);
            toast.error("An error occurred");
        }
    };

    // Reset Form
    const resetForm = () => {
        setFormData({
            sub_code: "",
            sub_name: "",
        });
        setValidationErrors({});
    };

    // Handle Subject Selection
    const handleSubjectSelect = (selectedCode) => {
        const selected = subjects.find(
            (subject) => subject.sub_code === selectedCode
        );
        if (selected) {
            setFormData(selected);
        } else {
            resetForm();
        }
    };

    // Filtered and Sorted Subjects
    const processedSubjects = useMemo(() => {
        return subjects
            .filter(
                (subject) =>
                    subject.sub_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    subject.sub_code.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
                const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";
                return sortConfig.direction === "ascending"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            });
    }, [subjects, searchTerm, sortConfig]);

    // Pagination
    const paginatedSubjects = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * itemsPerPage;
        const lastPageIndex = firstPageIndex + itemsPerPage;
        return processedSubjects.slice(firstPageIndex, lastPageIndex);
    }, [processedSubjects, currentPage]);

    // Calculate total pages
    const totalPages = Math.ceil(processedSubjects.length / itemsPerPage);

    return (
        <div className="p-6 bg-white shadow-lg rounded-md">
            <Toaster position="top-right" />

            <h1 className="text-2xl font-bold mb-4">Subject Management</h1>

            {/* Action Selector */}
            <div className="mb-6 flex gap-4">
                {["add", "update", "delete"].map((currentAction) => (
                    <button
                        key={currentAction}
                        onClick={() => {
                            setAction(currentAction);
                            resetForm();
                        }}
                        className={`px-4 py-2 rounded capitalize ${action === currentAction ? "bg-black text-white" : "bg-gray-200"
                            }`}
                    >
                        {currentAction} Subject
                    </button>
                ))}
            </div>

            {/* Form Section */}
            <div className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Subject Selection for Update/Delete */}
                    {(action === "update" || action === "delete") && (
                        <div className="col-span-full">
                            <select
                                onChange={(e) => handleSubjectSelect(e.target.value)}
                                value={formData.sub_code || ""}
                                className="border p-2 rounded w-full"
                            >
                                <option value="" disabled>
                                    Select Subject
                                </option>
                                {subjects.map((subject) => (
                                    <option
                                        key={`subject-select-${subject.sub_code}`}
                                        value={subject.sub_code}
                                    >
                                        {subject.sub_code} - {subject.sub_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Input Fields */}
                    {action !== "delete" && (
                        <>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Subject Code"
                                    value={formData.sub_code}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            sub_code: e.target.value,
                                        }))
                                    }
                                    className={`border p-2 rounded w-full ${validationErrors.sub_code ? "border-red-500" : ""
                                        }`}
                                    maxLength={10}
                                />
                                {validationErrors.sub_code && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {validationErrors.sub_code}
                                    </p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Subject Name"
                                    value={formData.sub_name}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            sub_name: e.target.value,
                                        }))
                                    }
                                    className={`border p-2 rounded w-full ${validationErrors.sub_name ? "border-red-500" : ""
                                        }`}
                                    maxLength={100}
                                />
                                {validationErrors.sub_name && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {validationErrors.sub_name}
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Submit Buttons */}
                <div className="mt-4 flex gap-2">
                    <button
                        onClick={handleSubmit}
                        className={`px-4 py-2 rounded text-white ${action === "delete" ? "bg-red-500 hover:bg-red-600" : "bg-black hover:bg-gray-800"
                            }`}
                    >
                        {action.charAt(0).toUpperCase() + action.slice(1)} Subject
                    </button>
                    <button
                        onClick={resetForm}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Clear
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search subjects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            {/* Subjects Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {[
                                { key: "sub_code", label: "Subject Code" },
                                { key: "sub_name", label: "Subject Name" },
                            ].map(({ key, label }) => (
                                <th
                                    key={key}
                                    onClick={() =>
                                        setSortConfig({
                                            key,
                                            direction:
                                                sortConfig.key === key && sortConfig.direction === "ascending"
                                                    ? "descending"
                                                    : "ascending",
                                        })
                                    }
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                >
                                    {label}
                                    {sortConfig.key === key && (
                                        <span>
                                            {sortConfig.direction === "ascending" ? " ▲" : " ▼"}
                                        </span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedSubjects.map((subject) => (
                            <tr key={subject.sub_code}>
                                <td className="px-6 py-4 whitespace-nowrap">{subject.sub_code}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{subject.sub_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-center items-center gap-2">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                >
                    ←
                </button>

                {currentPage > 2 && (
                    <button
                        onClick={() => setCurrentPage(1)}
                        className="px-3 py-1 rounded bg-gray-200"
                    >
                        1
                    </button>
                )}

                {currentPage > 3 && <span>...</span>}

                {currentPage > 1 && (
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="px-3 py-1 rounded bg-gray-200"
                    >
                        {currentPage - 1}
                    </button>
                )}

                <button className="px-3 py-1 rounded bg-black text-white">
                    {currentPage}
                </button>

                {currentPage < totalPages && (
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="px-3 py-1 rounded bg-gray-200"
                    >
                        {currentPage + 1}
                    </button>
                )}

                {currentPage < totalPages - 2 && <span>...</span>}

                {currentPage < totalPages - 1 && (
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        className="px-3 py-1 rounded bg-gray-200"
                    >
                        {totalPages}
                    </button>
                )}

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default SubjectSetting;