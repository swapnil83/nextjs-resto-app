'use client';
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import './../style.css';
import AddFoodItem from "@/app/_components/AddFoodItem";
import { useState } from "react";

const Dashboard = () => {
    const [ addFoodItem, setAddFoodItem ] = useState( false );

    return(
        <div>
            <RestaurantHeader />
            <button onClick={() => setAddFoodItem(true)}>Add Food</button>
            <button onClick={() => setAddFoodItem(false)}>Go to Dashboard</button>
            {
                addFoodItem ? <AddFoodItem /> : <h3>Welcome to Dashboard</h3>
            }
        </div>
    )
};

export default Dashboard;