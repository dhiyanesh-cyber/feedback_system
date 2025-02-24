import React, { useState, useEffect, useMemo } from "react";
import { toast, Toaster } from "react-hot-toast";

const TransferPage = () => {
    const [subjects, setSubjects] = useState([]);
    const [formData, setFormData] = useState({ sub_code: "", sub_name: "" });
    const [oldSubCode, setOldSubCode] = useState(""); // Store old subject code for updates
    const [action, setAction] = useState("add");
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownSearchTerm, setDropdownSearchTerm] = useState(""); // For searching within the dropdown
    const [sortConfig, setSortConfig] = useState({ key: "sub_code", direction: "ascending" });
    const [currentPage, setCurrentPage] = useState(1);
    const [validationErrors, setValidationErrors] = useState({});
    const [dropdownOpen, setDropdownOpen] = useState(false); // Track if dropdown is open

    const endpoint = `${import.meta.env.VITE_API_BASE_URL}/subjectsettings`;
    const itemsPerPage = 10;

    // Fetch subjects
    useEffect(() => {
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
        fetchSubjects();
    }, []);

    // Validate form
    const validateForm = () => {
        const errors = {};
        if (!formData.sub_code.trim()) errors.sub_code = "Subject code is required";
        if (!formData.sub_name.trim()) errors.sub_name = "Subject name is required";
        return errors;
    };

    // Handle subject selection
    const handleSubjectSelect = (selectedCode) => {
        const selected = subjects.find(subject => subject.sub_code === selectedCode);
        if (selected) {
            setOldSubCode(selected.sub_code); // Store previous code
            setFormData(selected);
        } else {
            resetForm();
        }
    };

    // Handle submit
    const handleSubmit = async () => {
        if (action !== "delete") {
            const errors = validateForm();
            if (Object.keys(errors).length > 0) {
                setValidationErrors(errors);
                toast.error("Please fix validation errors");
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
                response = await fetch(`${endpoint}/${oldSubCode}`, { // Use oldSubCode
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            } else if (action === "delete") {
                if (window.confirm(`Are you sure you want to delete subject ${formData.sub_name}?`)) {
                    response = await fetch(`${endpoint}/${formData.sub_code}`, { method: "DELETE" });
                } else {
                    return;
                }
            }

            if (response) {
                const data = await response.json();
                if (response.ok) {
                    setSubjects(prev => {
                        if (action === "add") return [...prev, formData];
                        if (action === "update") return prev.map(s => s.sub_code === oldSubCode ? formData : s);
                        if (action === "delete") return prev.filter(s => s.sub_code !== formData.sub_code);
                        return prev;
                    });
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

    // Reset form
    const resetForm = () => {
        setFormData({ sub_code: "", sub_name: "" });
        setOldSubCode("");
        setValidationErrors({});
        setDropdownOpen(false); // Close the dropdown after reset
    };

    // Filtered & sorted subjects
    const processedSubjects = useMemo(() => {
        return subjects
            .filter(subject =>
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

    // Filter subjects based on dropdown search term
    const filteredSubjectsForDropdown = useMemo(() => {
        return subjects.filter(subject =>
            subject.sub_name.toLowerCase().includes(dropdownSearchTerm.toLowerCase()) ||
            subject.sub_code.toLowerCase().includes(dropdownSearchTerm.toLowerCase())
        );
    }, [subjects, dropdownSearchTerm]);

    // Pagination
    const paginatedSubjects = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * itemsPerPage;
        return processedSubjects.slice(firstPageIndex, firstPageIndex + itemsPerPage);
    }, [processedSubjects, currentPage]);

    const totalPages = Math.ceil(processedSubjects.length / itemsPerPage);

    return (
        <div className="p-6 bg-white shadow-lg rounded-md">
            <Toaster position="top-right" />

            <h1 className="text-2xl font-bold mb-4">Subject Management</h1>

            {/* Action Buttons */}
            <div className="mb-6 flex gap-4">
                {["add", "update", "delete"].map(currentAction => (
                    <button
                        key={currentAction}
                        onClick={() => { setAction(currentAction); resetForm(); }}
                        className={`px-4 py-2 rounded capitalize ${action === currentAction ? "bg-black text-white" : "bg-gray-200"}`}
                    >
                        {currentAction} Subject
                    </button>
                ))}
            </div>

            {/* Form */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(action === "update" || action === "delete") && (
                    <div className="relative">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search Subjects"
                                value={dropdownSearchTerm}
                                onChange={(e) => setDropdownSearchTerm(e.target.value)}
                                onClick={() => setDropdownOpen(true)} // Open dropdown when clicked
                                className="border p-2 rounded w-full mb-2"
                            />
                            {dropdownOpen && (
                                <div className="absolute top-full left-0 right-0 bg-white border mt-1 rounded-md shadow-lg max-h-60 overflow-auto">
                                    <ul>
                                        {filteredSubjectsForDropdown.map(subject => (
                                            <li
                                                key={subject.sub_code}
                                                onClick={() => { handleSubjectSelect(subject.sub_code); setDropdownOpen(false); }}
                                                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                            >
                                                {subject.sub_code} - {subject.sub_name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {action !== "delete" && (
                    <>
                        <input type="text" placeholder="Subject Code" value={formData.sub_code}
                            onChange={(e) => setFormData(prev => ({ ...prev, sub_code: e.target.value }))}
                            className={`border p-2 rounded w-full ${validationErrors.sub_code ? "border-red-500" : ""}`} />
                        <input type="text" placeholder="Subject Name" value={formData.sub_name}
                            onChange={(e) => setFormData(prev => ({ ...prev, sub_name: e.target.value }))}
                            className={`border p-2 rounded w-full ${validationErrors.sub_name ? "border-red-500" : ""}`} />
                    </>
                )}
            </div>

            {/* Submit & Clear Buttons */}
            <div className="mt-4 flex gap-2">
                <button onClick={handleSubmit} className={`px-4 py-2 rounded text-white ${action === "delete" ? "bg-red-500" : "bg-black"}`}>
                    {action.charAt(0).toUpperCase() + action.slice(1)} Subject
                </button>
                <button onClick={resetForm} className="bg-gray-200 px-4 py-2 rounded">Clear</button>
            </div>

            {/* Subjects Table */}
            <div className="overflow-x-auto mt-6">
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

export default TransferPage;
