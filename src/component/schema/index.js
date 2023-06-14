import * as yup from "yup";

export const userSchema = yup.object().shape({
  firstName: yup.string().label("Enter your firstname").required("Required"),
  lastName: yup.string().label("Enter your lastname").required("Required"),
  employeeType: yup.string().label("Select Employee type").required("Required"),
  divisionId: yup.string().when("employeeType", {
    is: (val) => val === "Employee",
    then: (schema) => schema.required("Select division"),
    otherwise: (schema) => schema,
  }),
  districeID: yup.string().when("employeeType", {
    is: (val) => val === "Employee",
    then: (schema) => schema.required("Select district"),
    otherwise: (schema) => schema,
  }),
});
