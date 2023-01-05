import { useState } from "react"
import Select from "react-dropdown-select"
import Violation from "./Violation.js"
import Table from "react-bootstrap/Table"

const Violations = ({ violations, show }) => {
  const [sort, setSort] = useState("startTime")

  if (!show) return null

  const compare = (key) => {
    let order = 1
    if (key[0] === "-") {
      order = -1
      key = key.substr(1)
    }

    return (a, b) => {
      const result = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0
      return result * order
    }
  }

  const getOrderValue = (value) => {
    return sort === value ? "-" + value : value
  }

  const options = [
    {
      value: getOrderValue("startTime"),
      label: "Violation time",
    },
    {
      value: getOrderValue("firstName"),
      label: "First name",
    },
    {
      value: getOrderValue("lastName"),
      label: "Last name",
    },
    {
      value: getOrderValue("distanceToNest"),
      label: "Distance",
    },
  ]

  return (
    <div>
      <Select
        options={options}
        placeholder={"Sort by..."}
        onChange={(selected) => setSort(selected[0].value)}
      />
      <br />
      <Table striped bordered>
        <thead>
          <tr>
            <th>Pilot name</th>
            <th>Pilot email</th>
            <th>Pilot phone number</th>
            <th>Violation timestamp</th>
            <th>Closest confirmed distance (m)</th>
          </tr>
        </thead>
        <tbody>
          {violations.sort(compare(sort)).map((violation, index) => {
            return <Violation key={index} violation={violation} />
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Violations
