import toast from 'react-hot-toast'

// name first/last verification
function firstnameVerify(error = {}, values) {
    const regexPattern = /^\w+\s+\w+\s+\w+$/;
    if (!values.firstname) {
        error.firstname = toast.error('firstname required...!')
    }
    else if (regexPattern.test(values.firstname)) {
        error.firstname = toast.error('firstname cannot have more than one space in them...!')
    }

    return error
}
function lastnameVerify(error = {}, values) {
    const regexPattern = /^\w+\s+\w+\s+\w+$/;
    if (!values.lastname) {
        error.lastname = toast.error('lastname required...!')
    }
    else if (regexPattern.test(values.lastname)) {
        error.lastname = toast.error('lastname cannot have more than one space in them...!')
    }
    return error
}

// username verification
function usernameVerify(error = {}, values) {
    const regexPattern = /^\w+\s+\w+\s+\w+$/;
    if (!values.username) {
        error.username = toast.error('Username required...!')
    }
    else if (regexPattern.test(values.username)) {
        error.username = toast.error('Username cannot have more than one space in them...!')
    }

    return error
}
// email verification 
function emailVerify(error = {}, values) {
    if (!values.email) {
        error.email = toast.error('Email required...!')
    }
    else if (values.email.includes(' ')) {
        error.email = toast.error('Please enter a valid email..! ')
    }
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.email)) {
        error.email = toast.error('Please enter a valid email..! ')
    }
    return error
}
// password verification
function passwordVerify(error = {}, values) {

    const speacialChar = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

    if (!values.password) {
        error.password = toast.error('Password Required...!')
    }
    else if (values.password.includes(" ")) {
        error.password = toast.error("Password cannot have space")
    }
    else if (values.password.length <= 4) {
        error.password = toast.error("Password must have atleast five characters")
    }
    else if (!speacialChar.test(values.password)) {
        error.password = toast.error("Password must have atleast one special characters")
    }
    return error;
}
// confirm verifation
function confirmVerify(error = {}, values) {
    if (!values.confirm) {
        error.confirm = toast.error('Confirm password Required...!')
    }
    else if (values.confirm !== values.password && values.password) {
        error.confirm = toast.error(`Password won't match...!`)
    }

    return error;
}
// Otp verification
function otpVerify(error = {}, values) {
    if (!values.otp) {
        error.otp = toast.error('Enter recieved otp...!')
    }
    else if (values.otp.includes(' ')) {
        error.otp = toast.error('Please enter a valid otp')
    }
    return error;
}

function bioVerify(error = {}, values) {
    if (!values.biography) {
        error.biography = toast.error('bio required...!')
    }
    else if (values.biography.length > 60) error.bio = toast.error('maximum 60 characters only')
    return error;
}


// sign up validation
export async function signUpValidation(values) {
    const error = emailVerify({}, values)
    if (error.email) return error
    usernameVerify(error, values)
    if (error.username) return error
    passwordVerify(error, values)
    if (error.password) return error
    confirmVerify(error, values)
    return error
}
// login validation
export async function loginValidation(values) {
    const error = emailVerify({}, values)
    if (error.email) return error
    passwordVerify(error, values)
    return error
}
// otp validation
export async function otpValidation(values) {
    const error = otpVerify({}, values)
    return error
}
// login validation
export async function adminloginValidation(values) {
    const error = emailVerify({}, values)
    if (error.email) return error
    passwordVerify(error, values)
    return error

}
export async function profileValidation(values) {
    const error = firstnameVerify({}, values)
    if (error.firstname) return error
    lastnameVerify(error, values)
    if (error.lastname) return error
    bioVerify(error, values)
    return error
}