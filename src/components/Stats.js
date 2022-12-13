import { useState, useEffect } from "react"
import { getDistBetweenPoints } from "../support"

const Stats = ({ show, drones }) => {
  const [closestDist, setClosestDist] = useState(null)

  useEffect(() => {
    drones.forEach (drone => {
      const dist = getDistBetweenPoints(drone.x, drone.y)
      if (dist < closestDist || !closestDist) {
        setClosestDist(dist)
      }
    })
  }, [drones])

  if (!show || !closestDist) return null

  return (
    <div>
        <br/>
      <div>Closest confirmed distance: {(closestDist / 1000).toFixed(2)}m</div>
    </div>
  )
}

export default Stats
