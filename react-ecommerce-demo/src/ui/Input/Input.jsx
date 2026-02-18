import style from './Input.module.scss'

const Input = ({ label, error, width, ...rest }) => {
  return (
    <div className={style.field}>
    <div className={style.inputField} >
     
     <label className={style.label}>{label}</label>
     
      <input
        {...rest}
        className={error ?  style.inputError : style.input}
        style={{width}}
      />
 
      
    </div>
    
        <div className={error ? style.errorVisible :  style.error}>
          {error}
        </div>

       </div>
  )
   
    
}

export default Input


