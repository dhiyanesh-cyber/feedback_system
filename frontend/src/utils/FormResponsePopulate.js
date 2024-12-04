import { fetchForms } from "../services/formApi";
import { getFormResponseStatus } from "../services/responseSubmissionApi";

export const formResponsePopulate = async (userDetails) => {
    const data = await fetchForms(
        userDetails.department,
        userDetails.year,
        userDetails.class
      );

  // Wait for all statuses to be fetched and populated
  const populatedData = await Promise.all(
    data.map(async (d) => {
      const status = await getFormResponseStatus(d.form_id);
      return { ...d, status: status.status };
    })
  );

  console.log(populatedData); // Check the populated data
  return populatedData;
}