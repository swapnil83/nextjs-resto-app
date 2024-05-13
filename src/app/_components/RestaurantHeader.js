import Link from "next/link";

const RestaurantHeader = () => {
    return(
        <div className="header-wrapper">
            <div className="logo">
                <img style={{width: 100}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQdsh3OMeQDzadFC6lD4GCI9Lh75-PzNqWd8J8vTqUOg&s" />
            </div>
            <ul>
                <li>
                    <Link href={'/'}>Home</Link>
                </li>
                <li>
                    <Link href={'/'}>Login/Sign Up</Link>
                </li>
                <li>
                    <Link href={'/'}>Profile</Link>
                </li>
            </ul>
        </div>
    )
};

export default RestaurantHeader;