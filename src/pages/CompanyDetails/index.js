import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from "@apollo/react-hooks"
import { COMPANIES, COMPANY_DETAILS, CREATE_COMPANY, UPDATE_COMPANY, DELETE_COMPANY } from '../../helpers/GraphQLConsts'
import { useHistory } from "react-router-dom";
import {
  Link,
  useParams
} from 'react-router-dom'
import styles from './style.module.css'

import Popup from '../components/Popup'
import PopupConfirm from '../components/PopupConfirm'

export default function Index() {

  const { id } = useParams();

  // GRAPHQL QUERY
  const { loading, data } = useQuery(COMPANY_DETAILS, {
    variables: { id },
  })

  // GRAPHQL MUTATIONS  
  const [updateCompany] = useMutation(UPDATE_COMPANY)
  const [createCompany] = useMutation(CREATE_COMPANY)
  const [deleteCompany] = useMutation(DELETE_COMPANY)

  // STATES
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [desc, setDesc] = useState('')
  const [popupMsg, setPopupMsg] = useState('')
  const [isPopupVisible, setPopupVisible] = useState(false)

  // STATE FOR POPUP CONFIRM
  const [saveConfirmMsg, setSaveConfirmMsg] = useState('')
  const [isSaveConfirmVisible, setSaveConfirmVisible] = useState(false)

  const [deleteConfirmMsg, setDeleteConfirmMsg] = useState('')
  const [isDeleteConfirmVisible, setDeleteConfirmVisible] = useState(false)

  let history = useHistory() // used for redirecting

  useEffect(() => {

    if (id !== undefined && !loading) {
      const { company } = data

      setName(company.name)
      setAddress(company.address)
      setDesc(company.description)
    }

  }, [data])

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

  const goBackToList = () => {
    history.push('/')
  }

  const onDelete = (id) => {
    deleteCompany({ variables: { id }, refetchQueries: [{ query: COMPANIES }] }).then(res => {
      setPopupMsg('Successfully deleted company!')
      setPopupVisible(true)
      setTimeout(goBackToList, 2000)
    })
  }

  const submitForm = () => {
    if (id === undefined) {
      createCompany({ variables: { name, address, description: desc }, refetchQueries: [{ query: COMPANIES }] }).then(res => {
        setPopupMsg('Successfully created company!')
        setPopupVisible(true)
        setTimeout(goBackToList, 2000)
      })
    } else {
      updateCompany({ variables: { id, name, address, description: desc }, refetchQueries: [{ query: COMPANY_DETAILS, variables: { id } }, { query: COMPANIES }] }).then(res => {
        setPopupMsg('Successfully updated company details!')
        setPopupVisible(true)
        setTimeout(goBackToList, 2000)
      })
    }
  }

  const displaySaveConfirmPopup = (message) => {
    setSaveConfirmMsg(message)
    setSaveConfirmVisible(true)
  }

  const displayDeleteConfirmPopup = () => {
    setDeleteConfirmMsg("Are you sure you want to delete this company?")
    setDeleteConfirmVisible(true)
  }

  return (
    <div className={styles.container}>
      <Popup message={popupMsg} visible={isPopupVisible} subMessage={"Redirecting back to list..."} />

      <PopupConfirm
        message={saveConfirmMsg}
        confirmFunc={() => {
          setSaveConfirmVisible(false)
          submitForm()
        }}
        cancelFunc={() => { setSaveConfirmVisible(false) }}
        visible={isSaveConfirmVisible} />

      <PopupConfirm
        message={deleteConfirmMsg}
        confirmFunc={() => {
          setDeleteConfirmVisible(false)
          onDelete(id)
        }}
        cancelFunc={() => { setDeleteConfirmVisible(false) }}
        visible={isDeleteConfirmVisible} />

      <div className={styles.header}>
        <div className={styles.leftSide}>
          <Link to="/"><button className="btn default">Back</button></Link>
          {id !== undefined ? <h2>Edit a Company</h2> : <h2>Create a Company</h2>}
        </div>

        <div>
          <button className="btn primary" onClick={() => {
            displaySaveConfirmPopup(id !== undefined ? "Are you sure to overwrite the  existing data of this company?" : "Are you sure you want to create this company?")
          }}>
            {id !== undefined ? <>Save Changes</> : <>Create Company</>}
          </button>
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
        {id !== undefined ? <button className={`${styles.deleteBtn} btn`} onClick={() => {
          displayDeleteConfirmPopup()
        }}>Delete Company</button> : null}
      </div>
    </div >
  )
}
