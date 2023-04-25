import React from "react"

const Navbar = () => {
    return (
        <nav class="navbar">
        <a href="#" class="toggle-button">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </a>
        <div class="navbar-links">
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="recycle.html">Recycle</a></li>
            <li><a href="contact.html">Contact us</a></li>
            <li><a href="faq.html">FAQ</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="products.html">Products</a></li>
            <li><a href="cart.html">Shopping cart</a></li>
        </ul>
        </div>
    </nav>
    )
}

export default Navbar;