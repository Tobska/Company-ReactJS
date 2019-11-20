import { gql } from "apollo-boost";

export const COMPANIES = gql`
  {
    companies {
      id
      name
      address
      description
    }
  }
`

export const COMPANY_DETAILS = gql`
  query Company($id: ID!){
    company(id: $id) {
      name
      address
      description
    }
  }
  `

export const CREATE_COMPANY = gql`
  mutation CreateCompany($name: String!, $address: String!, $description: String!) {
    createCompany(input: {
      data: {
        name: $name,
        address: $address,
        description: $description
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

export const UPDATE_COMPANY = gql`
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
  `

export const DELETE_COMPANY = gql`
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

export const EMPLOYEES = gql`
  query EmployeesOfCompany($id: ID!){
    company(id: $id) {
      id
      name
      employees {
        id
        last_name
        first_name
        position
      }
    }
  }
  `