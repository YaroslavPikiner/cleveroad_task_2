import React from "react";
import "./product.css";

const Product = ({ item, deleteProductCard, editProductCard }) => {
  const { name, description, image, price, sale, deadline_sale,id } = item.data;
  return (
    <div className="card">
      <div className="card-image waves-effect waves-block waves-light">
        <img className="activator" src={image} alt="prod" />
      </div>
      <div className="card-content">
        <span className="card-title activator grey-text text-darken-4">
          {name}
          <i className="material-icons right">more_vert</i>
        </span>
        <p>Price: {price}$ </p>
        <p>Sale:{sale ? `${sale}%` : " Without discount"}</p>
        <p>
          Price on sale:
          {sale ? `${price}` - (price / 100) * sale : "Without discount"}$
        </p>
        <p>End sale: {deadline_sale}</p>
        <div className="row">
          <div className="col">
            <button
              onClick={() => deleteProductCard(id)}
              className="btn waves-effect waves-light"
            >
              Delete
            </button>
          </div>
          <div className="col">
            <button
              onClick={() => editProductCard(id)}
              className="btn waves-effect waves-light"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">
          {name}
          <i className="material-icons right">close</i>
        </span>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Product;
