import React, { useState } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import firebaseConfig from "../../firebaseConfig";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
import "../Login/login.css";

import { ACTION_LOGIN } from "../../store/types";

function Login({ user, signOut, signInWithGoogle, isLogged,setLogged }) {

  const [form, setForm] = useState({ email: "", password: "" });

  function handleChange(e) {
    setForm((form) => ({ ...form, [e.target.id]: e.target.value }));
  }

  function handleSubmit(e) {
  e.preventDefault();
  firebase
    .auth()
    .signInWithEmailAndPassword(form.email, form.password)
    .then(() => {
      localStorage.setItem('isLog',isLogged)
      setLogged()
    })
    .catch((error) => {
      console.log(error.code,error.message)
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
          <button className="btn btn-primary">Login</button> <span>or</span>
        </div>
      </form>
      <header className="App-header">
        {isLogged ? <Redirect to="/"/>: null}
        {user ? <p>Hello, {user.name}</p> : <p>Please sign in.</p>}
        {user ? (
          <button
            onClick={signOut}
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            <i className="material-icons right"></i>
            Sign out
          </button>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Sign in with Google
          </button>
        )}
      </header>
    </div>
  );
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLogged: () => dispatch({ type: ACTION_LOGIN}),
  };
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(connect(mapStateToProps, mapDispatchToProps)(Login));
