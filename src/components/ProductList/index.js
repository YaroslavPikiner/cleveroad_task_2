import React, { useState, useEffect } from "react";
import Product from "../Product";
import firebase from "firebase/app";
import { useHistory } from "react-router";
import "./productList.css";
import "firebase/database";
import Edit from "../edit";

function ProductList() {
  const [data, setData] = useState();
  const history = useHistory();

  function fetchData() {
    fetch("https://cleveroad-d326e-default-rtdb.firebaseio.com/data.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function deleteProductCard(id) {
    firebase
      .database()
      .ref("/data/" + id)
      .remove()
      .then(() => {
        fetchData();
      });
  }

  function editProductCard(id) {
    console.log(id);
    <Edit id={id} />;
    history.push(`edit/`);
  }

  function renderProd(state) {
    const arr = [];
    for (let key in state) {
      arr.push(
        <Product
          key={key}
          item={state[key]}
          editProductCard={() => editProductCard(key)}
          deleteProductCard={() => deleteProductCard(key)}
        />
      );
    }
    return arr;
  }

  // <div>
  //   <h3>There are no products</h3>
  //   <button><Link to="/addProduct">add products</Link></button>
  // </div>

  return (
    <div className="product__list">
      <div className="item__area">{renderProd(data)}</div>
    </div>
  );
}

export default ProductList;
