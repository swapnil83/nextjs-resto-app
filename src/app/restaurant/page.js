'use client';
import { useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignUp from "../_components/RestaurantSignUp";
import RestaurantHeader from "../_components/RestaurantHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import './style.css';

const Restaurant = () => {
    const [ login, setLogin ] = useState( true );

    return(
        <>
            <div className="container">
                <RestaurantHeader />
                <h1>Restaurant Login/SignUp Page</h1>
                {
                    login ? <RestaurantLogin /> : <RestaurantSignUp />
                }
                <div>
                    <button className="button-link" onClick={() => setLogin(!login)}>
                        { login ? "Don't have Account? SignUp" : "Already have Account? Login"}
                    </button>
                </div>
            </div>
            <RestaurantFooter />
        </>
    )
};

export default Restaurant;