import * as yup from "yup";

export const schema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .min(3, "Minimum 3 characters")
    .max(30, "Maximum 30 characters")
    .required("First name is required"),

  lastName: yup
    .string()
    .trim()
    .min(3, "Minimum 3 characters")
    .max(30, "Maximum 30 characters")
    .required("Last name is required"),

  email: yup
  .string()
  .email("Incorrect email")
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
  .required("Email is required"),

  phone: yup
    .string()
    .nullable()
    .matches(/^\(\d{3}\)\s\d{3}-\d{4}$/, "Phone must be in format (555) 123-4567")
    .required("Please enter telephone number"),
 
    address: yup
    .string()
    .min(5, "Minimum 5 characters")
    .max(100, "Maximum 100 characters")
    .matches(/^[a-zA-Z0-9\s,.'-]{5,}$/, "Incorrect address")
    .required("Please enter your address"),


    extraAddress: yup.string().nullable(),
    
    city: yup
    .string()
    .required("Please enter your city")
    .min(2, "Minimum 2 characters")
    .matches(/^[a-zA-Z\s-]+$/, "Incorrect city"),

    zipCode: yup
    .string()
    .required("Please enter your ZIP code")
    .min(4, "Minimum 4 characters")
    .max(10, "Maximum 10 characters")
    .matches(/^[A-Za-z0-9\s-]+$/, "Incorrect ZIP code"),

     country: yup
     .string()
     .required("Please select your country/region"),

    state: yup
    .string()
    .required("Please select your state")

});
