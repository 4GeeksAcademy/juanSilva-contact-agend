import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'



export function ContactForm() {
  const { id } = useParams()
  const [isEditing, setIsEditing] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const [form, setForm] = useState({
    agenda_slug: 'juans-agenda',
    full_name: '',
    email: '',
    phone: '',
    address: '',
  })
  console.log(form)

  useEffect(() => {
    if (id) {
      fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al obtener contacto')
          }
          return response.json()
        })
        .then((data) => {
          setForm({
            full_name: data.full_name,
            email: data.email,
            phone: data.phone,
            address: data.address,
          })
          setIsEditing(true)
        })
        .catch((error) => console.error(error))
    }
  }, [id])

  const updateContact = (e) => {
    e.preventDefault()


    if (isEditing) {
      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(form),
        redirect: 'follow',
      }

      fetch(
        `https://assets.breatheco.de/apis/fake/contact/${id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setShowAlert(true)
          console.log(result, 'modo editar')
        })
    } else {

      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(form),
        redirect: 'follow',
      }

      fetch('https://assets.breatheco.de/apis/fake/contact/', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setShowAlert(true)
          console.log(result, 'modo añadir')
        })
        .catch((error) => console.log('error', error))
    }
  }

  return (
    <div className='container text-center vh-100 mt-5'>
      <h1 className='Form-h1'>
        {isEditing ? 'Edit Contact' : 'Add a new contact'}
      </h1>
      <div className='d-flex justify-content-center mt-4'>
      <div className='col-6'>
      <form onSubmit={updateContact}>
        <div className='mb-4'>
          <input
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            value={form.full_name}
            placeholder='Full Name'
            required
            type='text'
            className='form-control'
            id='exampleInputName'
          />
        </div>
        <div className='mb-4'>
          <input
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            value={form.email}
            placeholder='Enter email'
            required
            type='email'
            className='form-control'
            id='exampleInputEmail'
          />
        </div>
        <div className='mb-4'>
          <input
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            value={form.phone}
            placeholder='Enter phone'
            required
            type='text'
            className='form-control'
            id='exampleInputPhone'
          />
        </div>
        <div className='mb-4'>
          <input
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            value={form.address}
            placeholder='Enter address'
            required
            type='text'
            className='form-control'
            id='exampleInputAddress'
          />
        </div>
        <button type='submit' className='Form-btn btn btn-primary  btn-lg mb-3'>
          Save
        </button>
        {showAlert && (
          <div className='alert alert-success' role='alert'>
            Contact saved successfully!
          </div>
        )}
      </form>
      </div>
      </div>
      <Link to='/'>or get back to contacts</Link>
    </div>
  )
}