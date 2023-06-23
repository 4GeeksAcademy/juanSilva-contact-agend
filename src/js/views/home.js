import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/home.css'
import {
  BsPencilFill,
  BsTrash3Fill,
} from 'react-icons/bs'

export function Home() {
  const [contacts, setContacts] = useState([])
  const getUrl =
    'https://assets.breatheco.de/apis/fake/contact/agenda/juans-agenda'


  const getAllContacts = async () => {
    const res = await fetch(getUrl)
    const data = await res.json()
    console.log(data)
    setContacts(data)
  }



  const deleteContact = (id) => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const updatedContacts = contacts.filter((contact) => contact.id !== id)

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: JSON.stringify(updatedContacts),
      redirect: 'follow',
    }

    fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => getAllContacts())
      .catch((error) => console.log('error', error))
  }

  useEffect(() => {
    getAllContacts()
  }, [])

  return (
    <div className="container">
      <div className='text-center m-4 '>
      <Link className="Contact-add" to="/newcontact">
        <button className="btn btn-success btn-lg rounded-pill">Add new contact</button>
      </Link>
      </div>
      {contacts.map((contact) => (
        <div className="card card-default" key={contact.id} id="card_contacts">
          <div
            id="contacts"
            className="panel-collapse collapse show"
            aria-expanded="true"
            style={{}}
          >
            <ul className="list-group pull-down" id="contact-list">
              <li className="list-group-item">
                <div className="row align-items-center">
                  <div className="col-12 col-sm-6 col-md-3 px-0">
                    <img
                      src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                      alt="Image Contact"
                      className="rounded-circle mx-auto d-block img-fluid"
                    />
                  </div>
                  <div className="col-12 col-sm-6 col-md-9 text-sm-left">
                    <div className='d-flex justify-content-between'>
                      <div>
                        <span
                          className="fa fa-mobile fa-2x text-muted float-right pulse p-3"
                          title="online now"
                        />
                        <label className="name lead fs-1 p-4">{contact.full_name}</label>
                        <br />
                        <span
                          className="fa fa-map-marker fa-2x text-muted float-right pulse p-3"
                          data-toggle="tooltip"
                          title=""
                          data-original-title="5842 Hillcrest Rd"
                        />
                        <span className="text-muted fs-3 p-3">{contact.address}</span>
                        <br />
                        <span
                          className="fa fa-phone fa-2x text-muted float-right pulse p-3"
                          data-toggle="tooltip"
                          title=""
                          data-original-title="(870) 288-4149"
                        />
                        <span className="text-muted fs-3 p-2">{contact.phone}</span>
                        <br />
                        <span
                          className="fa fa-envelope fa-2x text-muted float-right pulse p-3"
                          data-toggle="tooltip"
                          data-original-title=""
                          title=""
                        />
                        <span className="text-muted  text-truncate fs-3 p-2">
                          {contact.email}
                        </span>
                      </div>
                      <div className='d-flex align-items-end'>
                      <Link className="Contact-link" to={`/edit/${contact.id}`}>
                        <button className='btn btn-lg btn-warning m-1'>
                        <span className="Contact-change">
                          <BsPencilFill className='fs-5'/>
                        </span>
                        </button>
                      </Link>
                      <button className='btn btn-lg btn-danger m-1'>
                      <span
                        className="Contact-change"
                        onClick={() => deleteContact(contact.id)}
                      >
                        <BsTrash3Fill />
                      </span>
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

          </div>
        </div>
      ))}
    </div>
  )
}