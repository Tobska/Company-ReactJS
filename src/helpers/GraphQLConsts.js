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
    deleteCompanyEmployees( id: $id ) 
    { employees {
        first_name
        last_name
      }
    }
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

export const EMPLOYEE_DETAILS = gql`
  query Employee($id: ID!){
    employee(id: $id) {
      last_name
      first_name
      position
      company {
        id
      }
    }
  }
  `

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($companyId: ID!, $lastName: String!, $firstName: String!, $position: String!) {
    createEmployee(input: {
      data: {
        last_name: $lastName,
        first_name: $firstName,
        position: $position,
        company: $companyId
      }
    }) {
      employee {
        last_name
        first_name
        position
      }
    }
  }
  `

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $lastName: String!, $firstName: String!, $position: String!) {
    updateEmployee(input: {
      where: {
        id: $id
      },
      data: {
        last_name: $lastName,
        first_name: $firstName,
        position: $position
      }
    }) {
      employee {
        last_name
        first_name
        position
      }
    }
  }
  `

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee (input: {
      where: {
        id: $id
      }
    }) {
      employee {
        last_name
        first_name
        position
      }
    }
  }
  `