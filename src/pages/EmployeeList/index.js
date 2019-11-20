import React from 'react';
import { EMPLOYEES } from '../../helpers/GraphQLConsts'
import styles from './style.module.css'
import {
	Link,
	useParams
} from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks';

import EmployeeListItem from './components/EmployeeListItem'
import NotFoundPage from '../404NotFound'

export default function Index() {

	const { id } = useParams();

	const { loading, data } = useQuery(EMPLOYEES, {
		variables: { id }
	})

	const mapEmployeesData = employees => {
		if (employees.length > 0) {
			return employees.map(employee => {
				return <EmployeeListItem key={employee.id + employee.name} employee={employee} />
			})
		} else {
			return <div className={styles.messageText}>This company has no employees.</div>
		}
	}

	if (loading) {
		return null
	}

	if (data.company === null) {
		return <NotFoundPage />
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.leftSide}>
					<Link to="/"><button className="btn default">Back</button></Link>
					<h2>Employees of <i>{data.company.name}</i></h2>
				</div>
				<Link to={`/createEmployee/${id}`}><button className="btn primary">+ Create New Employee</button></Link>
			</div>

			<hr className="line" />

			<div className={styles.listContainer}>
				{loading ? <div className={styles.messageText}>Loading. Please wait...</div> : null}
				{(loading || (data === undefined)) ? null : mapEmployeesData(data.company.employees)}
			</div>

		</div>
	);

}