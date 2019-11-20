import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from "@apollo/react-hooks"
import { EMPLOYEES, EMPLOYEE_DETAILS, CREATE_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from '../../helpers/GraphQLConsts'
import { useHistory } from "react-router-dom";
import {
  Link,
  useParams
} from 'react-router-dom'
import styles from './style.module.css'

import Popup from '../components/Popup'
import PopupConfirm from '../components/PopupConfirm'
import ErrorBox from './components/ErrorBox'

export default function Index() {

  const { id, companyId } = useParams();

  // GRAPHQL QUERY
  const { loading, data } = useQuery(EMPLOYEE_DETAILS, {
    variables: { id },
  })

  // GRAPHQL MUTATIONS  
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE)
  const [createEmployee] = useMutation(CREATE_EMPLOYEE)
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE)

  // STATES
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [position, setPosition] = useState('')
  const [errors, setErrors] = useState([])

  // STATES FOR POPUP
  const [popupMsg, setPopupMsg] = useState('')
  const [popupSubMsg, setPopupSubMsg] = useState('')
  const [isPopupVisible, setPopupVisible] = useState(false)

  // STATES FOR POPUP CONFIRM
  const [saveConfirmMsg, setSaveConfirmMsg] = useState('')
  const [isSaveConfirmVisible, setSaveConfirmVisible] = useState(false)
  const [deleteConfirmMsg, setDeleteConfirmMsg] = useState('')
  const [isDeleteConfirmVisible, setDeleteConfirmVisible] = useState(false)

  let history = useHistory() // used for redirecting

  useEffect(() => {

    if (id !== undefined && !loading) {
      const { employee } = data

      setLastName(employee.last_name)
      setFirstName(employee.first_name)
      setPosition(employee.position)
    }

  }, [data])

  const onTextChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'lastName':
        setLastName(value)
        break
      case 'firstName':
        setFirstName(value)
        break
      case 'position':
        setPosition(value)
    }
  }

  const goBackToList = () => {
    history.push(companyId === undefined ? `/employees/${data.employee.company.id}` : `/employees/${companyId}`)
  }

  const onDelete = (id) => {
    deleteEmployee({ variables: { id }, refetchQueries: [{ query: EMPLOYEES, variables: { id: data.employee.company.id } }] }).then(res => {
      setPopupMsg('Successfully deleted employee!')
      setPopupSubMsg("Redirecting back to list...")
      setPopupVisible(true)
      setTimeout(goBackToList, 2000)
    })
  }

  const submitForm = () => {
    setPopupSubMsg("Redirecting back to list...")
    if (id === undefined) {
      createEmployee({ variables: { lastName, firstName, position, companyId }, refetchQueries: [{ query: EMPLOYEES, variables: { id: companyId } }] }).then(res => {
        setPopupMsg('Successfully created employee!')
        setPopupVisible(true)
        setTimeout(goBackToList, 2000)
      })
    } else {
      updateEmployee({ variables: { id, lastName, firstName, position }, refetchQueries: [{ query: EMPLOYEE_DETAILS, variables: { id } }, { query: EMPLOYEES, variables: { id: data.employee.company.id } }] }).then(res => {
        setPopupMsg('Successfully updated employee details!')
        setPopupVisible(true)
        setTimeout(goBackToList, 2000)
      })
    }
  }

  const displaySaveConfirmPopup = (message) => {
    const errors = checkErrors()

    setErrors(errors)

    if (errors.length === 0) {
      setSaveConfirmMsg(message)
      setSaveConfirmVisible(true)
    }
  }

  const displayDeleteConfirmPopup = () => {
    setDeleteConfirmMsg("Are you sure you want to delete this employee?")
    setDeleteConfirmVisible(true)
  }

  const checkErrors = () => {
    const errors = []

    if (lastName === '') {
      errors.push("Last Name can't be blank.")
    }

    if (firstName === '') {
      errors.push("First Name can't be blank.")
    }

    if (position === '') {
      errors.push("Position can't be blank.")
    }

    return errors
  }

  const mapErrors = () => {
    if (errors.length > 0) {
      return errors.map(error => {
        return <ErrorBox key={error} errorString={error} />
      })
    } else {
      return null
    }
  }

  if (loading) {
    return null
  }

  return (
    <div className={styles.container}>
      <Popup
        message={popupMsg}
        visible={isPopupVisible}
        subMessage={popupSubMsg} />

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
          <Link to={companyId === undefined ? `/employees/${data.employee.company.id}` : `/employees/${companyId}`}><button className="btn default">Back</button></Link>
          {id !== undefined ? <h2>Edit an Employee</h2> : <h2>Create an Employee</h2>}
        </div>

        <div>
          <button className="btn primary" onClick={() => {
            displaySaveConfirmPopup(id !== undefined ? "Are you sure to overwrite the existing data of this employee?" : "Are you sure you want to create this employee?")
          }}>
            {id !== undefined ? <>Save Changes</> : <>Create Employee</>}
          </button>
        </div>
      </div>

      <hr className="line" />

      <div className={styles.formContainer}>
        <div className={styles.errorContainer}>
          {errors.length > 0 ? mapErrors() : null}
        </div>
        <div className={styles.errorBox}></div>
        <h3>Last Name</h3>
        <input onChange={onTextChange} className={styles.input} name="lastName" value={lastName} />
        <h3>First Name</h3>
        <input onChange={onTextChange} className={styles.input} name="firstName" value={firstName} />
        <h3>Position</h3>
        <input onChange={onTextChange} className={styles.input} name="position" value={position} />
        {id !== undefined ? <button className={`${styles.deleteBtn} btn`} onClick={() => {
          displayDeleteConfirmPopup()
        }}>Remove Employee</button> : null}
      </div>
    </div >
  )
}
