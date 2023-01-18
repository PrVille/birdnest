const express = require("express")
const app = express()
const axios = require("axios")
const { convertXML } = require("simple-xml-to-json")

app.use(express.static("build"))
app.use(express.json())

let drones = []
let violations = []

const noFlyZoneCenterX = 250000
const noFlyZoneCenterY = 250000
const noFlyZoneRadius = 100000

const getDistBetweenPoints = (x, y) => {
  const distX = x - noFlyZoneCenterX
  const distY = y - noFlyZoneCenterY
  return Math.sqrt(distX * distX + distY * distY)
}

const checkViolation = (x, y) => {
  const dist = getDistBetweenPoints(x, y)
  return dist <= noFlyZoneRadius
}

const parsePilot = (pilot, dist) => {
  return {
    pilotId: pilot.pilotId,
    firstName: pilot.firstName,
    lastName: pilot.lastName,
    email: pilot.email,
    phoneNumber: pilot.phoneNumber,
    distanceToNest: dist,
    startTime: Date.now(),
  }
}

const parseDrone = (drone) => {
  const x = drone.drone.children[8].positionX.content
  const y = drone.drone.children[7].positionY.content
  const serialNumber = drone.drone.children[0].serialNumber.content
  return {
    serialNumber, 
    x, 
    y,
    violation: checkViolation(x, y)
  }
}

const updateDrones = async (data) => {
  const res = await axios.get(`http://assignments.reaktor.com/birdnest/drones`)
  const myJson = convertXML(res.data)
  const droneObjs = []
  myJson.report.children[1].capture.children.forEach((drone) => {
    droneObjs.push(parseDrone(drone))
  })
  drones = droneObjs
}

const updateViolations = () => {
  const newViolations = violations.filter(
    (violation) => Date.now() - violation.startTime < 600000
  )
    
  drones.forEach(async (drone) => {
    if (checkViolation(drone.x, drone.y)) {      
      const pilot = await axios.get(
        `http://assignments.reaktor.com/birdnest/pilots/${drone.serialNumber}`
      )      
      const distanceToNest = getDistBetweenPoints(drone.x, drone.y)
      //check for existing pilot
      const pilotIndex = newViolations.findIndex(
        (obj) => obj.pilotId === pilot.data.pilotId
      )
      //new pilot
      if (pilotIndex === -1) {
        const violation = parsePilot(pilot.data, distanceToNest)
        newViolations.push(violation)
      } else {
        //existing pilot
        newViolations[pilotIndex].startTime = Date.now()
        if (distanceToNest < newViolations[pilotIndex].distanceToNest) { 
          newViolations[pilotIndex].distanceToNest = distanceToNest 
        }
      }
    }
  })
  
  violations = newViolations
}


app.get("/api/drones", async (request, response) => {  
  response.send(drones)
})

app.get("/api/violations", async (request, response) => {
  response.send(violations)
})

setInterval(() => {
  updateDrones()
  updateViolations()
}, 2000)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
