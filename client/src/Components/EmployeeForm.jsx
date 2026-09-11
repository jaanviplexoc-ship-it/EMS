import { useState } from 'react';

function Form() {

    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '' ,
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        department: '',
        position: '',
        dateOfJoining: '',
        salary: 0,
        address: '',
        city: '',
        state: '',
        status: true
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(employee);
    }
    
  return (
    <form onSubmit={handleSubmit}>
        <h1>Employee Form</h1>
        <div className="form-feilds">
            <label 
                htmlFor="fname">
                First Name
            </label>
            <input 
            type="text" 
            id="fname" 
            name="fname"
            value={employee.firstName}
            placeholder="First Name"
            autoComplete="on"
            onChange={(e) => 
                setEmployee({...employee, 
                    firstName: e.target.value})
                }
            />

            <label
                htmlFor="lname">
                Last Name
            </label>
            <input
            type="text"
            id="lname"
            name="lname"
            placeholder="Last Name"
            autoComplete="on"
            value={employee.lastName}
            onChange={(e) => 
                setEmployee({...employee, 
                    lastName: e.target.value})
                }
            />

            <label
                htmlFor="email">
                Email
            </label>
            <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            autoComplete="on"
            value={employee.email}
            onChange={(e) => 
                setEmployee({...employee, 
                    email: e.target.value})
                }
            />

            <label
                htmlFor="phone">
                Phone Number
            </label>
            <input
            type="tel"
            id="phone"
            name="phone"
            value={employee.phone}
            placeholder="Phone Number"
            onChange={(e) => 
                setEmployee({...employee, 
                    phone: e.target.value})
                }
            />

            <label
                htmlFor="dob">
                Date of Birth
            </label>
            <input
            type="date"
            id="dob"
            name="dob"
            value={employee.dateOfBirth}
            onChange={(e) => 
                setEmployee({...employee, 
                    dateOfBirth: e.target.value})
                }
            />

            <label
                htmlFor="gender">
                Gender
            </label>
            <select id="gender"
            name="gender"
            value={employee.gender}
            onChange={(e) => 
                setEmployee({...employee, 
                    gender: e.target.value})
                }
            >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>

            <label
                htmlFor="department">
                Department
            </label>
            <select id="department"
            name="department"
            value={employee.department}
            onChange={(e) => 
                setEmployee({...employee, 
                    department: e.target.value})
                }
            >
                <option value="hr">HR</option>
                <option value="it">IT</option>
                <option value="finance">Finance</option>
                <option value="marketing">Marketing</option>
                <option value="management">Management</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>

            </select>

            <label 
                htmlFor="position">
                Position
            </label>
            <input 
            type="text" 
            id="position" 
            name="position"
            value={employee.position}
            placeholder="Position"
            onChange={(e) => 
                setEmployee({...employee, 
                    position: e.target.value})
                }
            />

            <label 
                htmlFor="dateOfJoining">
                Date of Joining
            </label>
            <input 
            type="date" 
            id="dateOfJoining" 
            name="dateOfJoining"
            value={employee.dateOfJoining}
            onChange={(e) => 
                setEmployee({...employee, 
                    dateOfJoining: e.target.value})
                }
            />

            <label
                htmlFor="salary">
                Salary
            </label>
            <input
            type="number"
            id="salary"
            name="salary"
            placeholder="Salary"
            value={employee.salary}
            onChange={(e) => 
                setEmployee({...employee, 
                    salary: e.target.value})
                }
            />
            
            <label
                htmlFor="address">
                Address
            </label>
            <textarea
            id="address"
            name="address"
            placeholder="Address"
            value={employee.address}
            onChange={(e) => 
                setEmployee({...employee, 
                    address: e.target.value})
                }
            ></textarea>

            <label
                htmlFor="city">
                City
            </label>
            <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            value={employee.city}
            onChange={(e) => 
                setEmployee({...employee, 
                    city: e.target.value})
                }
            />

            <label
                htmlFor="state">
                State
            </label>
            <input
            type="text"
            id="state"
            name="state"
            placeholder="State"
            value={employee.state}
            onChange={(e) => 
                setEmployee({...employee, 
                    state: e.target.value})
                }
            />

            <label
                htmlFor="status">
                Status
            </label>
            <select id="status"
            name="status"
            value={employee.status}
            onChange={(e) => 
                setEmployee({...employee, 
                    status: e.target.value})
                }
            >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>

            <button type="submit">Submit</button>
        </div>
    </form>
  )
};
  
export default Form
