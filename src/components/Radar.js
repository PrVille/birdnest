import React, { useRef, useEffect } from "react"
import { checkViolation } from "../support"

const Radar = ({ show, drones }) => {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      const context = ref.current.getContext("2d")
      context.clearRect(0, 0, context.canvas.width, context.canvas.height)
      context.strokeStyle = "black"
      context.strokeRect(0, 0, context.canvas.width, context.canvas.height)

      context.strokeStyle = "red"
      context.beginPath()
      context.arc(
        context.canvas.width / 2,
        context.canvas.height / 2,
        100,
        0,
        2 * Math.PI
      )
      context.stroke()

      context.fillStyle = "red"
      context.beginPath()
      context.arc(
        context.canvas.width / 2,
        context.canvas.height / 2,
        2,
        0,
        2 * Math.PI
      )
      context.fill()

      drones.forEach((drone) => {
        const x = drone.x / 1000        
        const y = drone.y / 1000
        context.fillStyle = checkViolation(drone.x, drone.y) ? "red" : 'black'
        context.beginPath()
        context.arc(x, y, 5, 0, 2 * Math.PI)
        context.fill()
        context.font = "10px impact"
        context.fontStyle = "black"
        context.fillText(drone.serialNumber, x - 30, y - 10)
      })
    }
  }, [drones, show])

  if (!show) return null

  return <canvas ref={ref} width={500} height={500} />
}

export default Radar
