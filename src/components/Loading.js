import ReactLoading from "react-loading"

const Loading = ({ type, color }) => {
  const center = {
    margin: "0",
    width: "50px",
    height: "50px",
    position: "absolute",
    top: "50%",
    left: "50%",
  }

  return <ReactLoading style={center} type={type} color={color} />
}

export default Loading
