import { useState, useEffect } from "react"
import dataService from "./services/data.js"
import Violations from "./components/Violations.js"
import Radar from './components/Radar.js'
import Stats from './components/Stats.js'
import { parseDrone } from "./support.js"
const { convertXML } = require("simple-xml-to-json")




const App = () => {
  const [drones, setDrones] = useState([])
  const [page, setPage] = useState('violations')

  useEffect(() => {
    let interval = setInterval(async () => {
      const res = await dataService.getAll()
      const myJson = convertXML(res)
      const timesStamp = myJson.report.children[1].capture.snapshotTimestamp
      const droneObjs = []
      myJson.report.children[1].capture.children.forEach((drone) => {
        droneObjs.push(parseDrone(drone, timesStamp))
      })
      setDrones(droneObjs)
    }, 2000)
    return () => {
      clearInterval(interval)
    }
  }, [drones])

  if (!drones) return null

  return (
    <div>
      <div>
        <button onClick={() => setPage('violations')}>violations</button>
        <button onClick={() => setPage('radar')}>radar</button>
        <button onClick={() => setPage('stats')}>stats</button>
        <button onClick={() => setPage('all')}>all</button>
      </div>
      <Stats show={page === 'stats' || page === "all"} drones={drones} />
      <Radar show={page === 'radar' || page === "all"} drones={drones} />
      <Violations show={page === 'violations' || page === "all"} drones={drones} />
    </div>
  )
}

export default App
