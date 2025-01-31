export const Alert = ({ alert }) => {

  return (
    <div className="dark:text-red-500 text-red-700  p-1 uppercase text-center  text-sm">
      <p>{alert.msg}</p>
    </div>

  )
}
