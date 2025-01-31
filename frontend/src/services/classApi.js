export const updateYearStatus = async (departmentId, yearId, isActive) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/class/${departmentId}/${yearId}/${isActive}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error updating year status:', error);
        throw error;
    }
};

// Filters the class data to find the live status of the class
export const checkLiveStatus = async (departmentCode, year, classNumber) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/class/${departmentCode}/${year}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log("Class number:", classNumber);


        // Find the matching class from the response
        const classData = data.find(c => c.class === classNumber);

        console.log("Class data:", classData);


        return classData?.live_status === 1;
    } catch (error) {
        console.error('Error checking live status:', error);
        throw error;
    }
};



// fetches all the status of the year
export const fetchYearStatus = async (departmentCode, year) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/class/${departmentCode}/${year}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }



        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching year status:', error);
        throw error;
    }
};