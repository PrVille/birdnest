const Violation = ({ violation }) => {
  return (
    <tr>
      <td>
        {violation.firstName} {violation.lastName}
      </td>
      <td>{violation.email}</td>
      <td>{violation.phoneNumber}</td>
      <td>{Math.floor((Date.now() - violation.startTime) / 1000)}</td>
    </tr>
  )
}

export default Violation
