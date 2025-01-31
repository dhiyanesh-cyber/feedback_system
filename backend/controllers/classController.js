import { getClasses as _getClasses } from "../services/classServices.js";
import { setLiveStatusService } from "../services/classServices.js";
const getClasses = async(req, res) => {
    const {code, year} = req.params;
    try {
        const class_details = await _getClasses(code, year);
        res.status(200).json(class_details);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "internal server error"});
    }
}


const setLiveStatusController = async(req, res) => {
    const {code, year, status_code} = req.params;
    try {
        const class_details = await setLiveStatusService(code, year, status_code);
        res.status(200).json(class_details);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "internal server error"});
    }
}

export {setLiveStatusController, getClasses} ;