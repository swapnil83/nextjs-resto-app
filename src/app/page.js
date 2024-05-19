'use client';
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";

export default function Home() {
    const [ locations, setLocations ] = useState([]);
    const [ selectedLocation, setSelectedLocation ] = useState('');
    const [ showLocationList, setShowLocationList ] = useState( false );

    useEffect(() => {
        fetchReaturantsLocations();
    }, []);

    const fetchReaturantsLocations = async () => {
        let response = await fetch('http://localhost:3000/api/customer/locations');
        response = await response.json();
        if(response.success) {
            setLocations(response.result);
        } else {
            alert('Something went wrong, not able to fetch locations!!');
        }
    };

    const handleListItem = (location) => {
        setSelectedLocation(location);
        setShowLocationList(false);
    }

    return (
        <main>
            <CustomerHeader />
            <div className="main-page-banner">
                <h1>Food Delivery App</h1>
                <div className="input-wrapper">
                    <input 
                        type="text" 
                        defaultValue={selectedLocation} 
                        className="select-input" 
                        placeholder="Select place" 
                        onClick={() => setShowLocationList(true)}
                    />
                    <ul className="location-list">
                        {
                            showLocationList &&
                            locations.map((location) => (
                                <li 
                                    key={location}
                                    onClick={() => handleListItem(location)}
                                >
                                    {location}
                                </li>
                            ))
                        }
                    </ul>
                    <input type="text" className="search-input" placeholder="Enter food or restaurant name" />
                </div>
            </div>
            <Footer />
        </main>
    );
}
