import useTheme from '../../hooks/useTheme'
import LightIcon from '../../icons/template/LightIcon'
import MoonIcon from '../../icons/template/MoonIcon'

const ButtonTheme = () => {
  const { handleChangeMode, theme } = useTheme()
  return (
    <button
      aria-label="cambiar-dark"
      onClick={handleChangeMode }
      className='hover:bg-primary cursor-pointer  p-1 rounded-full hover:text-white transition-colors'
    >
      {theme === "light" ? <LightIcon /> : <MoonIcon />}
    </button>
  )
}

export default ButtonTheme
