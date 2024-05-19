import Link from "next/link";

const CustomerHeader = () => {
    return(
        <div className="header-wrapper">
            <div className="logo">
                <img style={{width: 100}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQdsh3OMeQDzadFC6lD4GCI9Lh75-PzNqWd8J8vTqUOg&s" />
            </div>
            <ul>
                <li><Link href={'/'}>Login</Link></li>
                <li><Link href={'/'}>SignUp</Link></li>
                <li><Link href={'/'}>Cart(0)</Link></li>
                <li><Link href={'/'}>Add</Link></li>
                <li><Link href={'/'}>Restaurant</Link></li>
            </ul>
        </div>
    )
};

export default CustomerHeader;