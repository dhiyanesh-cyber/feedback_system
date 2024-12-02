import Class from "../models/ClassModel.js"

const getClasses = async (code, year) => {
    const class_details = await Class.getClassDetails(code, year);
    return class_details;
}

export {
    getClasses
} ;