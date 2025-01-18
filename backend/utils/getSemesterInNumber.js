export const getSemesterInNumber = (year, semester) => {
    // Convert semester string to lowercase to make it case-insensitive
   
    
    semester = semester.toLowerCase();

    // Validate inputs
    if (year < 1 || (semester !== "odd" && semester !== "even")) {
        throw new Error("Invalid input: year must be >= 1 and semester must be 'odd' or 'even'.");
    }

    // Calculate semester number
    return (year - 1) * 2 + (semester === "odd" ? 1 : 2);
}