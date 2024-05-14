
import { useRouter } from "next/navigation";
import { useState } from "react";


const RestaurantSignUp = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ conformPassword, setConformPassword ] = useState('');
    const [ name, setName ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ city, setCity ] = useState('');
    const [ contact, setContact ] = useState('');
    const [ passwordError, setPasswordError ] = useState( false );
    const [ error, setError ] = useState( false );
    const router = useRouter();

    const handleSignUp = async () => {
        if(password !== conformPassword) {
            setPasswordError(true);
            return false;
        } else {
            setPasswordError(false);
        }

        if(!email || !password || !conformPassword || !name || !address || !city || !contact) {
            setError( true );
            return false;
        } else {
            setError( false );
        }

        let response = await fetch('http://localhost:3000/api/restaurant', {
            method: 'POST',
            body: JSON.stringify({email, password, name, address, city, contact})
        });
        response = await response.json();
        if(response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem('restaurantUser', JSON.stringify(result));
            router.push('/restaurant/dashboard');
            setEmail('');
            setPassword('');
            setConformPassword('');
            setName('');
            setAddress('');
            setCity('');
            setContact('');
            alert('Restaurant Registered Successfully!!');
        } else {
            alert('Not registered please try again!');
        }
    };

    return (
        <>
            <h3>Signup</h3>
            <div>
                <div className="input-wrapper">
                    <input 
                        className="input-field"
                        type="text"
                        placeholder="Enter email id"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    {
                        error && !email &&
                        <span className="input-error">Please enter valid Email</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input 
                        className="input-field"
                        type="password"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {
                        passwordError &&
                        <span className="input-error">Password and Conform Password does not match</span>
                    }
                    {
                        error && !password &&
                        <span className="input-error">Please enter valid Password</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input 
                        className="input-field"
                        type="password"
                        placeholder="Conform password"
                        onChange={(e) => setConformPassword(e.target.value)}
                        value={conformPassword}
                    />
                    {
                        passwordError &&
                        <span className="input-error">Password and Conform Password does not match</span>
                    }
                    {
                        error && !conformPassword &&
                        <span className="input-error">Please enter valid Conform Password</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input 
                        className="input-field"
                        type="text"
                        placeholder="Enter Restaurant name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    {
                        error && !name &&
                        <span className="input-error">Please enter valid Name</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input 
                        className="input-field"
                        type="text"
                        placeholder="Enter Address"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                    />
                    {
                        error && !address &&
                        <span className="input-error">Please enter valid Address</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input 
                        className="input-field"
                        type="text"
                        placeholder="Enter City"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                    />
                    {
                        error && !city &&
                        <span className="input-error">Please enter valid City</span>
                    }
                </div>
                <div className="input-wrapper">
                    <input 
                        className="input-field"
                        type="text"
                        placeholder="Enter Contact No."
                        onChange={(e) => setContact(e.target.value)}
                        value={contact}
                    />
                    {
                        error && !contact &&
                        <span className="input-error">Please enter valid Contact</span>
                    }
                </div>
                <div className="input-wrapper">
                    <button 
                        className="button"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </>
    )
};

export default RestaurantSignUp;
