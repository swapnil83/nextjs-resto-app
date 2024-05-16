'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import './../../style.css';

const EditFoodItem = ( props ) => {
    const itemId = props.params.id;
    const [ name, setName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ path, setPath ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ error, setError ] = useState( false );
    const router = useRouter();

    useEffect(() => {
        fetchFoodItem();
    }, []);

    const fetchFoodItem = async () => {
        let response = await fetch('http://localhost:3000/api/restaurant/foods/edit/'+itemId);
        response = await response.json();

        if(response.success) {
            setName(response.result.name);
            setPrice(response.result.price);
            setDescription(response.result.description);
            setPath(response.result.img_path);
        } else {
            alert('Something is wrong, please try after some time!');
        }
    };

    const handleEditFoodItem = async () => {
        
        if(!name || !price || !path || !description) {
            setError( true );
            return false;
        } else {
            setError(true);
        }

        let response = await fetch('http://localhost:3000/api/restaurant/foods/edit/'+itemId, {
            method: 'PUT',
            body: JSON.stringify({ name, price, img_path: path, description })
        });
        response = await response.json();

        if(response.success) {
            router.push('../dashboard')
        } else {
            alert('Item is not updated, please try again after some time!')
        }
    };

    return(
        <div className="container">
            <h3>Update Food Item</h3>
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
                <button className="button" onClick={handleEditFoodItem}>Update Food Item</button>
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={() => router.push('../dashboard')}>Back to Food Item List</button>
            </div>
        </div>
    )
};

export default EditFoodItem;