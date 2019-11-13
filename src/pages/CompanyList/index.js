import React, { useEffect } from 'react';
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks"
import styles from './style.module.css'
import {
	Link
} from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks';

export default function Index() {
	const COMPANIES = gql`
		{
			companies {
				id
				name
				address
				description
			}
		}
	`
	const DELETE_COMPANY = gql`
		mutation DeleteCompany($id: ID!) {
			deleteCompany (input: {
				where: {
					id: $id
				}
			}) {
				company {
					name
					address
					description
				}
			}
		}
	`
	const { loading, data, refetch } = useQuery(COMPANIES)
	const [deleteCompany] = useMutation(DELETE_COMPANY)

	useEffect(() => {
		refetch()
	}, [])

	const onDelete = (id) => {
		deleteCompany({ variables: { id } }).then(res => {
			refetch()
		})
	}

	const mapCompanyData = companies => {
		return companies.map(company => {
			return <div key={company.id + company.name} className={styles.item}>
				<div className={styles.details}>
					<div className={styles.name}>{company.name}</div>
					<div className={styles.address}>{company.address}</div>
					<div className={styles.desc}>{company.description}</div>
				</div>
				<div className={styles.btnGroup}>
					<button className="btn default">View Employees</button>
					<Link to={`/company/${company.id}`}><button className="btn primary">Edit</button></Link>
					<button className="btn danger" onClick={() => { onDelete(company.id) }}>Delete</button>
				</div>
			</div>
		})
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2>Your Companies</h2>
				<Link to="/company"><button className="btn primary">+ Create New Company</button></Link>
			</div>

			<hr className="line" />

			<div className={styles.listContainer}>
				{loading ? null : mapCompanyData(data.companies)}
			</div>

		</div>
	);

}