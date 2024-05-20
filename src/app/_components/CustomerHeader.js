'use client';
import Link from "next/link";
import { useEffect, useState } from "react";

const CustomerHeader = ( props ) => {

    const cartStorage = JSON.parse(localStorage.getItem('cart'));
    const [ cartNumber, setCartNumber ] = useState( cartStorage?.length || 0 );
    const [ cartItems, setCartItems ] = useState( cartStorage );

    useEffect(() => {
        if(props.cartData) {
            if(cartNumber) {
                if(cartItems[0].resto_id !== props.cartData.resto_id) {
                    localStorage.removeItem('cart');
                    setCartNumber(1);
                    setCartItems([props.cartData]);
                    localStorage.setItem('cart', JSON.stringify([props.cartData]));
                } else {
                    let localCartItem = cartItems;
                    localCartItem.push(JSON.parse(JSON.stringify(localCartItem)));
                    setCartNumber(localCartItem.length);
                    setCartItems(localCartItem);
                    localStorage.setItem('cart', JSON.stringify(localCartItem));
                }
            } else {
                setCartNumber(1);
                setCartItems([props.cartData]);
                localStorage.setItem('cart', JSON.stringify([props.cartData]));
            }
        }
    }, [ props.cartData ]);

    return(
        <div className="header-wrapper">
            <div className="logo">
                <img style={{width: 100}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQdsh3OMeQDzadFC6lD4GCI9Lh75-PzNqWd8J8vTqUOg&s" />
            </div>
            <ul>
                <li><Link href={'/'}>Login</Link></li>
                <li><Link href={'/'}>SignUp</Link></li>
                <li><Link href={'/'}>Cart({cartNumber})</Link></li>
                <li><Link href={'/'}>Add</Link></li>
                <li><Link href={'/'}>Restaurant</Link></li>
            </ul>
        </div>
    )
};

export default CustomerHeader;