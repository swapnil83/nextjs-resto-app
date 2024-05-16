import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const FoodItemList = () => {
    const [ foodItems, setFoodItems ] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchFoodItemsList();
    }, []);

    const fetchFoodItemsList = async () => {
        const restaurantData = JSON.parse(localStorage.getItem('restaurantUser'));
        const resto_id = restaurantData._id;

        let response = await fetch('http://localhost:3000/api/restaurant/foods/'+resto_id);
        response = await response.json();

        if(response.success) {
            setFoodItems(response.result)
        } else {
            alert('List is not loaded please check in some time!');
        }
    };

    const handleDeleteFoodItem = async ( id ) => {
        let response = await fetch('http://localhost:3000/api/restaurant/foods/'+id, {
            method: 'DELETE'
        });
        response = await response.json();

        if(response.success) {
            fetchFoodItemsList();
            alert('Item removed successfully!!');
        } else {
            alert('Unable to remove item from the list, please try again!');
        }
    };

    return(
        <div>
            <h3>Food Items</h3>
            <table>
                <thead>
                    <tr>
                        <td>S.N.</td>
                        <td>Food Item</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Image</td>
                        <td>Operations</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        foodItems && foodItems.map((item, key) => {
                            return(
                                <tr key={key}>
                                    <td>{key+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>
                                    <td><img src={item.img_path} /></td>
                                    <td>
                                        <button onClick={() => handleDeleteFoodItem( item._id )}>Delete</button>
                                        <button onClick={() => router.push('dashboard/'+item._id)}>Edit</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
};

export default FoodItemList;