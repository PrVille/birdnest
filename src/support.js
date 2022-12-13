const noFlyZoneCenterX = 250000
const noFlyZoneCenterY = 250000
const noFlyZoneRadius = 100000

export const getDistBetweenPoints = (x, y) => {
  const distX = x - noFlyZoneCenterX
  const distY = y - noFlyZoneCenterY
  return Math.sqrt(distX * distX + distY * distY)
}

export const checkViolation = (x, y) => {
  const dist = getDistBetweenPoints(x, y)

  if (dist <= noFlyZoneRadius) {
    return true
  }
  return false
}

export const parsePilot = (pilot) => {
  return {
    pilotId: pilot.pilotId,
    firstName: pilot.firstName,
    lastName: pilot.lastName,
    email: pilot.email,
    phoneNumber: pilot.phoneNumber,
    startTime: Date.now(),
  }
}

export const parseDrone = (drone, time) => {
  const x = drone.drone.children[8].positionX.content
  const y = drone.drone.children[7].positionY.content
  const serialNumber = drone.drone.children[0].serialNumber.content
  const timeStamp = new Date(time)
  return {
    timeStamp,
    serialNumber,
    x,
    y,
  }
}
