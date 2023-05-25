import toast from 'react-hot-toast'




// username verification
function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error('Username required...!')
    }
    else if (values.username.includes(' ')) {
        error.username = toast.error('Username cannot have space in them...!')
    }

    return
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
// login validation
export async function otpValidation(values) {
    const error = otpVerify({}, values)
    return error
}
