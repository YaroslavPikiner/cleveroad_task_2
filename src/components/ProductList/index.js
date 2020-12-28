import React, { useState, useEffect } from 'react'
import Product from '../Product'
import firebase from 'firebase/app'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import './productList.css'
import 'firebase/database'

function ProductList() {
  const [data, setData] = useState({})
  const history = useHistory()

  function fetchData() {
    fetch('https://cleveroad-d326e-default-rtdb.firebaseio.com/data.json')
      .then((res) => res.json())
      .then((data) => {
        setData(data || {})
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  function deleteProductCard(id) {
    firebase
      .database()
      .ref('/data/' + id)
      .remove()
      .then(() => {
        fetchData()
      })
  }

  function editProductCard(id) {
    history.push({
      pathname: `/edit/${id}`,
    })
  }

  function renderProd(state) {
    const arr = []
    for (let key in state) {
      arr.push(
        <Product
          key={key}
          item={state[key]}
          editProductCard={() => editProductCard(key)}
          deleteProductCard={() => deleteProductCard(key)}
        />
      )
    }
    return arr
  }

  return (
    <div className='product__list'>
      <div className='item__area'>
        {Object.keys(data).length === 0 ? (
          <>
            <h1>No goods</h1>
            <Link to='/addProduct' className='btn waves-effect waves-light right'>
              Back to list
            </Link>
          </>
        ) : (
          renderProd(data)
        )}
      </div>
    </div>
  )
}

export default ProductList
