import { fetchForms, fetchFormsByStudentId } from "../services/formApi";
import { getFormResponseStatus } from "../services/responseSubmissionApi";

export const formResponsePopulate = async (userDetails) => {

  const data = await fetchFormsByStudentId(
    userDetails.registrationNumber,
  );

  // const data = await fetchForms(
  //   userDetails.department,
  //   userDetails.year,
  //   userDetails.class
  // );

  // Wait for all statuses to be fetched and populated
  const populatedData = await Promise.all(
    data.map(async (d) => {
      const status = await getFormResponseStatus(d.form_id);
      return { ...d, status: status.status };
    })
  );

  return populatedData;
}