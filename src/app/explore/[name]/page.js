'use client';
import CustomerHeader from "@/app/_components/CustomerHeader";
import Footer from "@/app/_components/Footer";
import { useEffect, useState } from "react";

const RestaurantDetails = (props) => {
    const name = props.params.name;
    const [ restaurantDetails, setRestaurantDetails ] = useState( {} );
    const [ foodItems, setFoodItems ] = useState( [] );
    const [ cartData, setCartData ] = useState();
    const [ cartStorage, setCartStorage ] = useState(JSON.parse(localStorage.getItem('cart')));
    const [ cartIds, setCartIds ] = useState(cartStorage ? () => cartStorage.map(item => item._id) : []);
    const [ removeCartItemId, setRemoveCartItemId ] = useState();

    useEffect(() => {
        fetchRestaurantDetails();
    }, []);

    const fetchRestaurantDetails = async () => {
        const id = props.searchParams.id;

        let response = await fetch('http://localhost:3000/api/customer/'+id);
        response = await response.json();
        if(response.success) {
            setRestaurantDetails(response.restaurantDetails);
            setFoodItems(response.foodItems);
        } else {
            alert('Something went wromg, not able to fetch details!!');
        }
    };

    const addToCart = ( item ) => {
        let localCartIds = cartIds;
        localCartIds.push(item._id);
        setCartIds(localCartIds);
        setCartData( item );
        setRemoveCartItemId();
    };

    const removeFromCart = ( itemId ) => {
        setRemoveCartItemId(itemId);
        let localCartIds = cartIds.filter(item => item !== itemId );
        setCartData();
        setCartIds(localCartIds);
    };

    return (
        <div>
            <CustomerHeader cartData={cartData} removeCartItemId={removeCartItemId} />
            <div className="restaurant-page-banner">
                <h1>{decodeURI(name)}</h1>
            </div>
            <div className="detail-wrapper">
                <h4>Contact: {restaurantDetails?.contact}</h4>
                <h4>City: {restaurantDetails?.city}</h4>
                <h4>Address: {restaurantDetails?.address}</h4>
                <h4>Email: {restaurantDetails?.email}</h4>
            </div>
            <div className="food-item-wrapper">
                {
                    foodItems.length > 0 ? foodItems.map((item) => (
                        <div key={item._id} className="list-item">
                            <div>
                                <img style={{width: 100}} src={item.img_path} />
                            </div>
                            <div>
                                <div>{item.name}</div>
                                <div>{item.price}</div>
                                <div className="description">{item.description}</div>
                                {
                                    cartIds.includes(item._id) ?
                                    <button onClick={() => removeFromCart(item._id)}>Remove from Cart</button>
                                    :
                                    <button onClick={() => addToCart(item)}>Add to Cart</button>
                                }
                            </div>
                        </div>
                    )) :
                    <h1>No Food Items are available!!</h1>
                }
            </div>
            <Footer />
        </div>

    )
}

export default RestaurantDetails;