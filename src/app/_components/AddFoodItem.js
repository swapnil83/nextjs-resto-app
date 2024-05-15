import { useState } from "react";

const AddFoodItem = () => {
    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ path, setPath ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ error, setError ] = useState( false );

    const handleAddFoodItem = async () => {

        if(!name || !price || !path || !description) {
            setError( true );
            return false;
        } else {
            setError(true);
        }

        const restaurantData = JSON.parse(localStorage.getItem('restaurantUser'));
        let resto_id;
        if(restaurantData) {
            resto_id = restaurantData._id;
        }
        let response = await fetch('http://localhost:3000/api/restaurant/foods', {
            method: 'POST',
            body: JSON.stringify({name, price, img_path: path, description, resto_id })
        } );
        response = await response.json();

        if(response.success) {
            alert('Food Item added!!');
            setName('');
            setPrice('');
            setPath('');
            setDescription('');
            setError(false);
        } else {
            alert('Please try to add food item!');
        }
    }

    return(
        <div className="container">
            <h3>Add New Food Item</h3>
            <div className="input-wrapper">
                <input 
                    className="input-field"
                    type="text"
                    placeholder="Enter food name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {
                    error && !name &&
                    <span className="input-error">Please enter valid Food Item name</span>
                }
            </div>
            <div className="input-wrapper">
                <input 
                    className="input-field"
                    type="text"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                {
                    error && !price &&
                    <span className="input-error">Please enter valid Price</span>
                }
            </div>
            <div className="input-wrapper">
                <input 
                    className="input-field"
                    type="text"
                    placeholder="Enter image path"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                />
                {
                    error && !path &&
                    <span className="input-error">Please enter valid Food Image path</span>
                }
            </div>
            <div className="input-wrapper">
                <input 
                    className="input-field"
                    type="text"
                    placeholder="Enter food description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {
                    error && !description &&
                    <span className="input-error">Please enter valid Food description</span>
                }
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={handleAddFoodItem}>Add Food Item</button>
            </div>
        </div>
    )
};

export default AddFoodItem;