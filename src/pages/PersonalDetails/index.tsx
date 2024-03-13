import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextFieldCustom from '../../components/TextField';

export default function PersonalDetails() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const handleSaveAndContinue = () => {
        console.log("First Name:", firstName);
        console.log("Last Name:", lastName);
        console.log("Email:", email);
        navigate('/aadhaar');
    };

    return (
        <div className="flex px-16 pt-20 gap-10">
            <div className='w-1/2'>
                <img src="/assets/images/Rafiki.png" alt="logo" />
            </div>
            <div className="w-1/2">
                <h1 className="text-4xl font-bold mb-16">Personal Details</h1>
                <div className="grid grid-cols-2 gap-4">
                    <TextFieldCustom
                        heading="Enter your first name"
                        variableName="firstName"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        placeholder="John"
                    />
                    <TextFieldCustom
                        heading="Enter your last name"
                        variableName="lastName"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        placeholder="Doe"
                    />
                    <TextFieldCustom
                        heading="Enter your email"
                        variableName="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="johndoe72@gmail.com"
                    />
                    <TextFieldCustom
  heading="Enter your phone number"
  variableName="phoneNumber"
  value={phoneNumber}
  onChange={e => setPhoneNumber(e.target.value)}
  placeholder="123-456-7890"
/>
                </div>
                <button
                    type="button"
                    className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={handleSaveAndContinue}
                >
                    Save & Continue
                </button>
            </div>
        </div>
    );
}
