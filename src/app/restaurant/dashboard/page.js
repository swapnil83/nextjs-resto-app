'use client';
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import './../style.css';
import AddFoodItem from "@/app/_components/AddFoodItem";
import { useState } from "react";
import FoodItemList from "@/app/_components/FoodItemList";

const Dashboard = () => {
    const [ addFoodItem, setAddFoodItem ] = useState( false );

    return(
        <div>
            <RestaurantHeader />
            <button onClick={() => setAddFoodItem(true)}>Add Food</button>
            <button onClick={() => setAddFoodItem(false)}>Go to Dashboard</button>
            {
                addFoodItem ? <AddFoodItem setAddFoodItem={setAddFoodItem} /> : <FoodItemList />
            }
        </div>
    )
};

export default Dashboard;