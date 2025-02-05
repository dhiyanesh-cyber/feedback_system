import Class from "../models/ClassModel.js"

const getClasses = async (code, year) => {
    const class_details = await Class.getClassDetails(code, year);
    return class_details;
}

const getClassesByYear = async (year) => {
    const class_details = await Class.getClassDetailsByYear(year);
    return class_details;
}


const setLiveStatusService = async (code, year, status_code) => {
    // Convert status_code to 1 if true, or 0 if false
    let status = status_code;
    if (status_code === "true") {
        status = 1;
    } else if (status_code === "false") {
        status = 0;
    }
    console.log(status);

    const class_details = await Class.setLiveStatusByDeptYear(code, year, status);
    return class_details;
}




export {
    getClasses, setLiveStatusService, getClassesByYear
};