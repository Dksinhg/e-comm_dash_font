import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./productList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/companylist");
    result = await result.json();
    // console.log(result)
    setProducts(result);
  };

  // console.warn(products);

  const deleteItem = async (id) => {
    console.warn(id);
    let result = fetch(`http://localhost:5000/companylist/${id}`, {
      method: "Delete",
    });
    //  result = await result.json();
    if (result) {
      getProducts();
    }
    navigate("/");
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };
  return (
    <div className="productlist">
      <h1> Product list </h1>
      <input
        type="text"
        className="search-product"
        placeholder="search-product"
        onChange={searchHandle}
      />
      <ul>
        <li> S.Name </li>
        <li> Name </li>
        <li> Price </li>
        <li> Category </li>
        <li> company</li>
        <li> Delete </li>
      </ul>
      {products.length > 0 ? (
        products.map((data, index) => {
          return (
            <ul key={data._id}>
              <li> {index + 1} </li>
              <li>{data.name} </li>
              <li> {data.price} </li>
              <li> {data.category} </li>
              <li>{data.company}</li>
              <li>
                {" "}
                <button onClick={() => deleteItem(data._id)}>Delete</button>
                <Link to={"/update/" + data._id}>Update </Link>
              </li>
            </ul>
          );
        })
      ) : (
        <h1> No data found </h1>
      )}
    </div>
  );
};

export default ProductList;
