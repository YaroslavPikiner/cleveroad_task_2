import React, { useState } from 'react'
import firebase from 'firebase/app'
import firebaseConfig from '../../firebaseConfig'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import 'firebase/database'

function Edit({ match }) {
  const id = match.params.id

  const [form, setForm] = useState({
    name: '',
    image: null,
    description: '',
    price: null,
    sale: null,
    deadlineSale: null,
  })
  const history = useHistory()

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  function handleChange(e) {
    setForm((form) => ({ ...form, [e.target.id]: e.target.value }))
  }

  function imageChange(e) {
    let img = e.target.files[0]
    setForm((form) => ({ ...form.image, image: URL.createObjectURL(img) }))
    console.log(form)
  }

  function onSubmitHandle(e) {
    e.preventDefault()
    saveProduct(form)
    console.log(form)
  }

  function saveProduct(data) {
    firebase
      .database()
      .ref('/data/' + id)
      .update({
        data,
      })
      .then(() => {
        history.push('/product')
      })
  }

  return (
    <div className='container product_form'>
      <h2 className='center'>Edit Card</h2>
      <div className='row'>
        <form className='col s12' onSubmit={onSubmitHandle}>
          <div className='file-field input-field '>
            <div className='btn'>
              <span>File</span>
              <input type='file' id='image' required onChange={imageChange} />
            </div>
            <div className='file-path-wrapper'>
              <input className='file-path validate' type='text' />
            </div>
          </div>

          <div className='row'>
            <div className='input-field col s12'>
              <label htmlFor='name'>Title</label>
              <input id='name' type='text' required onChange={handleChange} />
            </div>
          </div>

          <div className='row'>
            <div className='input-field col s12'>
              <textarea
                id='description'
                maxLength='200'
                className='materialize-textarea'
                onChange={handleChange}
                required></textarea>
              <label htmlFor='description'>Description</label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                id='price'
                type='number'
                className='validate'
                onChange={handleChange}
                placeholder='up to 99999999$'
                required
              />
              <label htmlFor='price'>Price</label>
            </div>
          </div>

          <div className='row'>
            <div className='input-field col s12'>
              <input
                id='sale'
                type='number'
                min='10'
                max='90'
                className='validate'
                onChange={handleChange}
                placeholder='from 10 to 90'
              />
              <label htmlFor='sale'>Sale</label>
            </div>
          </div>

          <div className='row'>
            <div className='input-field col s12'>
              <label htmlFor='deadline_sale'>Deadline Sale</label>
              <input
                type='date'
                id='deadline_sale'
                required
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            className='btn waves-effect waves-light'
            type='submit'
            name='action'>
            Add Product
            <i className='material-icons add'></i>
          </button>
          <Link to='/product' className='btn waves-effect waves-light right'>
            Back to list
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Edit
