export const validateDateOfBirth = (dob) => {
    // Regular expression to validate yyyy-mm-dd format
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  
    if (!regex.test(dob)) {
      return { valid: false, message: "Date of Birth must be in yyyy-mm-dd format" };
    }
  
    // Check if it's a valid date
    const date = new Date(dob);
    const [year, month, day] = dob.split("-").map(Number);
    if (
      date.getFullYear() !== year ||
      date.getMonth() + 1 !== month ||
      date.getDate() !== day
    ) {
      return { valid: false, message: "Invalid Date of Birth" };
    }
  
    return { valid: true };
  };
  