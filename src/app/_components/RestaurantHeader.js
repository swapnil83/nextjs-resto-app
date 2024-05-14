'use client';
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const RestaurantHeader = () => {
    const [ details, setDetails ] = useState();
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        let data = localStorage.getItem('restaurantUser');
        if(!data && pathName == '/restaurant/dashboard') {
            router.push('/restaurant');
        } else if(data && pathName == '/restaurant') {
            router.push('/restaurant/dashboard');
        } else {
            setDetails(JSON.parse(data));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('restaurantUser');
        router.push('/restaurant');
    };

    return(
        <div className="header-wrapper">
            <div className="logo">
                <img style={{width: 100}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQdsh3OMeQDzadFC6lD4GCI9Lh75-PzNqWd8J8vTqUOg&s" />
            </div>
            <ul>
                <li><Link href={'/'}>Home</Link></li>
                {
                    details && details.name ?
                    <>
                        <li><Link href={'/'}>Profile</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                    :
                    <li><Link href={'/'}>Login/Sign Up</Link></li>
                }
            </ul>
        </div>
    )
};

export default RestaurantHeader;