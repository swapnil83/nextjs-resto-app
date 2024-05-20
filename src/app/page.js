'use client';
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {
    const [ locations, setLocations ] = useState([]);
    const [ restaurants, setRestaurants ] = useState([]);
    const [ selectedLocation, setSelectedLocation ] = useState('');
    const [ showLocationList, setShowLocationList ] = useState( false );
    const router = useRouter();

    useEffect(() => {
        fetchRestaurantsLocations();
        fetchRestaurants();
    }, []);

    const fetchRestaurantsLocations = async () => {
        let response = await fetch('http://localhost:3000/api/customer/locations');
        response = await response.json();
        if(response.success) {
            setLocations(response.result);
        } else {
            alert('Something went wrong, unable to get the list of locations!!');
        }
    };

    const fetchRestaurants = async ( params ) => {
        let url = 'http://localhost:3000/api/customer';
        if(params?.location) {
            url = url+"?location="+params.location;
        } else if(params?.restaurant) {
            url = url+"?restaurant="+params.restaurant;
        }

        let response = await fetch(url);
        response = await response.json();
        if(response.success) {
            setRestaurants(response.result);
        } else {
            alert('Soemthing went wrong, unable to get the list of restaurants')
        }
    };

    const handleListItem = ( location ) => {
        setSelectedLocation(location);
        setShowLocationList(false);
        fetchRestaurants({ location })
    };

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
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Enter food or restaurant name"
                        onChange={(e) => fetchRestaurants({restaurant: e.target.value})}
                    />
                </div>
            </div>
            <div className="restaurant-list-container">
                {
                    restaurants.map((restaurantItem) => (
                        <div 
                            key={restaurantItem._id} 
                            className="restaurant-wrapper"
                            onClick={() => router.push('explore/'+restaurantItem.name+"?id="+restaurantItem._id)}
                        >
                            <div className="heading-wrapper">
                                <h3>{restaurantItem.name}</h3>
                                <h5>Contact: {restaurantItem.contact}</h5>
                            </div>
                            <div className="address-wrapper">
                                <div>{restaurantItem.city}</div>
                                <div className="address">{restaurantItem.address}, Email: {restaurantItem.email}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <Footer />
        </main>
    );
}
