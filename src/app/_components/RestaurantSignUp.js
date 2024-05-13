const RestaurantSignUp = () => {
    return (
        <>
            <h3>Signup</h3>
            <div>
                <div className="input-wrapper">
                    <input className="input-field" type="text" placeholder="Enter email id" />
                </div>
                <div className="input-wrapper">
                    <input className="input-field" type="password" placeholder="Enter password" />
                </div>
                <div className="input-wrapper">
                    <input className="input-field" type="password" placeholder="Conform password" />
                </div>
                <div className="input-wrapper">
                    <input className="input-field" type="text" placeholder="Enter Restaurant name" />
                </div>
                <div className="input-wrapper">
                    <input className="input-field" type="text" placeholder="Enter Address" />
                </div>
                <div className="input-wrapper">
                    <input className="input-field" type="text" placeholder="Enter City" />
                </div>
                <div className="input-wrapper">
                    <input className="input-field" type="text" placeholder="Enter Contact No." />
                </div>
                <div className="input-wrapper">
                    <button className="button">Sign Up</button>
                </div>
            </div>
        </>
    )
};

export default RestaurantSignUp;
