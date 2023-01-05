const Violation = ({ violation }) => {
  return (
    <tr>
      <td>
        {violation.firstName} {violation.lastName}
      </td>
      <td>{violation.email}</td>
      <td>{violation.phoneNumber}</td>
      <td>{new Date(violation.startTime).toUTCString()}</td>
      <td>{(violation.distanceToNest / 1000).toFixed(1)}</td>
    </tr>
  )
}

export default Violation
