import "./spinner.css"

const Spinner = ({ size = "1em" }) => {
  return (
    <div className="loader" style={{ width: size, height: size }}></div>
  )
}

export default Spinner

