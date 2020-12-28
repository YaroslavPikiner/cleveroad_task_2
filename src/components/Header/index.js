import React from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { connect } from "react-redux";
import {SIGNOUT} from '../../store/types'

const Header = ({ isLogged,setLogged }) => {
  const history = useHistory();

  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setLogged();
        history.push("/");
      })
      .catch(function (error) {
        // An error happened.
      });
  }

  return (
    <div className="header">
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            Catalog-App
          </Link>
          <ul id="nav-mobile" className="right">
            {isLogged ? (
              <>
                <li className="nav-item ">
                  <Link to="/product"> Products </Link>
                </li>
                <li className="nav-item">
                  <Link to="/addProduct"> Add Product </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" onClick={signOut}>
                    Sing out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item ">
                  <Link to="/login"> Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/auth"> Sing Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLogged: () => dispatch({ type: SIGNOUT}),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Header);
