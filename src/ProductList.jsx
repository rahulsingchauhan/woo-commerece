import { useState, useEffect } from "react";
import "./Product.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.category.toLowerCase().includes(category.toLowerCase()) &&
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container">
      <div className="header">
        <div className="menu-icon">
          {/* Hamburger menu icon */}
          <i className="fas fa-bars"></i>
        </div>
        <div className="category">
          {/* Category dropdown */}
          <label htmlFor="category">Select Category:</label>
          <select
            id="category"
            className="form-control"
            onChange={handleCategoryChange}
          >
            <option value="">All Category</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men Clothing</option>
            <option value="women's clothing">Women Clothing</option>
          </select>
        </div>
        <div className="search">
          {/* Search input */}
          <label htmlFor="search"></label>
          <input
            type="text"
            id="search"
            className="form-control"
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="language">
          {/* Language selection */}
          <span>English<i className="fa-solid fa-language"></i></span>
        </div>
        <div className="cart">
          {/* Cart */}
          <span><i className="fa-solid fa-cart-shopping"></i></span>
        </div>
        <div className="login">
          {/* Login */}
          <span><i className="fa-regular fa-user"></i></span>
        </div>
      </div>
      <div className="row mt-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-3 mb-3">
            <div className="card">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.title}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.category}</p>
                <p className="card-text">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
