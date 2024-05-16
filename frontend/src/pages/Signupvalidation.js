function validation(values) {
    let errors = {};
    const name_pattern = /^[a-zA-Z ]+$/;
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*[A-Z])(?=.*\d).{9,}$/;

    if (!values.name.trim()) {
        errors.name = "Name should not be empty";
    } else if (!name_pattern.test(values.name.trim())) {
        errors.name = "Invalid name format";
    } else {
        errors.name = "";
    }

    if (!values.email.trim()) {
        errors.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email.trim())) {
        errors.email = "Invalid email format";
    } else {
        errors.email = "";
    }

    if (!values.password.trim()) {
        errors.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password.trim())) {
        errors.password = "Password should contain at least one capital letter, one digit, and be at least 9 characters long";
    } else {
        errors.password = "";
    }

    return errors;
}

export default validation;
