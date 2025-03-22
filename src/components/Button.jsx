const Button = ({title, className='', activeClass, _callback,}) => {
    return (
      <button className={`${className} ${activeClass}`} onClick={_callback}>{title}</button>
    )
  }
  
  export default Button