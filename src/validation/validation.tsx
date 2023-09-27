import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    RoleId: Yup.number().required("RoleId is required"),
    Username: Yup.string().required("Username is required"),
    EmailId: Yup.string()
      .email("Invalid email")
      .required("EmailId is required"),
    Gender: Yup.string().required("Gender is required"),
    Age: Yup.number().required("Age is required"),
    Salary: Yup.number().required("Salary is required"),
    City: Yup.string().required("City is required"),
  });