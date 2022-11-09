import * as yup from "yup";
export const SignUpSchema = yup.object().shape({
    username: yup.string().required("Enter Username").max(16, "Only 16 charactors allowed").matches(/^\S*$/, 'White Space not allowed'),
    email: yup.string().required("Enter Email"),
    bio: yup.string().max(256, "Maximum 256 charactors are allowed.")

});
// .matches(/^'?\p{L}+(?:[' ]\p{L}+)*'?$/u, "Special characters are not allowed")