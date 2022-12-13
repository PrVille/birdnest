import { useState, useEffect } from "react"
import dataService from "../services/data.js"
import Violation from "./Violation.js"
import { checkViolation, parsePilot } from "../support.js"

const Violations = ({ drones, show }) => {
  const [violations, setViolations] = useState([])

  useEffect(() => {
    drones.forEach(async (drone) => {
      if (checkViolation(drone.x, drone.y)) {
        const pilot = await dataService.getPilot(drone.serialNumber)
        const violation = parsePilot(pilot)
        const newViolations = nonExpired
          .filter((pilot) => pilot.pilotId !== violation.pilotId)
          .concat(violation)
        setViolations(
          newViolations.filter((pilot) => Date.now() - pilot.startTime < 60000)
        )
      }
    })
  }, [drones])

  const nonExpired = violations.filter(
    (violation) => Date.now() - violation.startTime < 60000
  )

  if (!show || violations.length === 0) return null

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Pilot name</th>
            <th>Pilot email</th>
            <th>Pilot phonenumber</th>
            <th>Elapsed time since violation</th>
          </tr>
        </thead>
        <tbody>
          {nonExpired.map((violation, index) => {
            return <Violation key={index} violation={violation} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Violations
