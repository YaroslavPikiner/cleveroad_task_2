import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
import { ACTION_REG } from "../../store/types";

function Registration({ isLogged, setLogged }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  let history = useHistory();

  function handleChange(e) {
    setForm((form) => ({ ...form, [e.target.id]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(() => {
        history.push("/");
        setLogged();
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h5 className="grey-text text-darken">Sign In</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="firstName">First name</label>
          <input type="text" id="firstName" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="lastName">Last name</label>
          <input type="text" id="lastName" onChange={handleChange} />
        </div>
        <div className="input-field">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {
    setLogged: () => dispatch({ type: ACTION_REG }),
  };
};

export default connect(mapDispatchToProps)(Registration);
