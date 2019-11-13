import React, { useState, useEffect } from 'react'
import apollo from '../../helpers/ApolloInstance'
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks"
import {
  Link,
  useParams
} from 'react-router-dom'
import styles from './style.module.css'

export default function Index() {

  const { id } = useParams();

  const COMPANY_DETAILS = gql`
  query Company($id: ID!){
    company(id: $id) {
      name
      address
      description
    }
  }
  `
  const UPDATE_COMPANY = gql`
      mutation UpdateCompany($id: ID!, $name: String!, $address: String!, $description: String!) {
        updateCompany(input: {
          where: {
            id: $id
          },
          data: {
            name: $name,
            address: $address,
            description: $description,
          }
        }) {
          company {
            name
            address
            description
          }
        }
      }
    `;

  const { loading, data, refetch } = useQuery(COMPANY_DETAILS, {
    variables: { id },
  })

  const [updateCompany] = useMutation(UPDATE_COMPANY)

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [desc, setDesc] = useState('')


  useEffect(() => {

    if (id !== undefined && !loading) {
      const { company } = data

      setName(company.name)
      setAddress(company.address)
      setDesc(company.description)
    }

  }, [data])

  useEffect(() => {
    refetch()
  }, [])

  const onTextChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value)
        break
      case 'address':
        setAddress(value)
        break
      case 'desc':
        setDesc(value)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.leftSide}>
          <Link to="/"><button className="btn default">Back</button></Link>
          {id !== undefined ? <h2>Edit a Company</h2> : <h2>Create a Company</h2>}
        </div>

        <div>
          <button className="btn primary" onClick={() => { updateCompany({ variables: { id, name, address, description: desc } }) }}>Submit</button>
        </div>
      </div>

      <hr className="line" />

      <div className={styles.formContainer}>
        <h3>Name</h3>
        <input onChange={onTextChange} className={styles.input} name="name" value={name} />
        <h3>Address</h3>
        <input onChange={onTextChange} className={styles.input} name="address" value={address} />
        <h3>Description</h3>
        <textarea onChange={onTextChange} rows="6" value={desc} name="desc" className={styles.textarea} />
      </div>
    </div>
  )
}
