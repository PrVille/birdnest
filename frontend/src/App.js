import { useState, useEffect } from "react"
import dataService from "./services/data.js"
import Loading from "./components/Loading.js"
import Violations from "./components/Violations.js"
import Radar from "./components/Radar.js"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Stack from "react-bootstrap/Stack"

const App = () => {
  const [drones, setDrones] = useState([])
  const [violations, setViolations] = useState([])
  const [page, setPage] = useState("violations")

  useEffect(() => {
    let interval = setInterval(async () => {
      const drones = await dataService.getDrones()
      const violations = await dataService.getViolations()
      setViolations(violations)
      setDrones(drones)
    }, 2000)
    return () => {
      clearInterval(interval)
    }
  }, [drones])

  if (drones.length === 0) return <Loading type={"spokes"} color={"black"} />

  return (
    <div className="container">
      <Stack gap={3} className="text-center">
        <div>
          <ButtonGroup>
            <Button
              variant="outline-dark"
              onClick={() => setPage("violations")}
            >
              Violations
            </Button>
            <Button variant="outline-dark" onClick={() => setPage("radar")}>
              Radar
            </Button>
            <Button variant="outline-dark" onClick={() => setPage("all")}>
              All
            </Button>
          </ButtonGroup>
        </div>
        <Radar show={page === "radar" || page === "all"} drones={drones} />
        <Violations
          show={page === "violations" || page === "all"}
          violations={violations}
        />
      </Stack>
    </div>
  )
}

export default App
