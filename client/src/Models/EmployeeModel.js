function EmployeeModel(firstName, lastName, email, phone, dateOfBirth, gender, department, position, city, state, status) {
    return {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        dateOfBirth: dateOfBirth,
        gender: gender,
        department: department,
        position: position,
        city: city,
        state: state,
        status: status
    };
}

export default EmployeeModel;