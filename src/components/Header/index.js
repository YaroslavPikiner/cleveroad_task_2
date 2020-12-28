import React from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { connect } from "react-redux";
import {SIGNOUT} from '../../store/types'

const Header = ({ isLogged,singOut }) => {
  const history = useHistory();

  function signOut() {
    firebase
      .auth()
      .signOut()
      .then( () => {
        localStorage.setItem('isLogged', 'false')
        singOut();
        history.push("/");
      })
      .catch(function (error) {
        // An error happened.
        console.log(error)
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
            {isLogged === 'true' ? (
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
    singOut: () => dispatch({ type: SIGNOUT}),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Header);
