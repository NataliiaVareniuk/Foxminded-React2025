import style from './FormContainer.module.scss'

export default function FormContainer ({ children }) {

      return (<div className={style.container} >
        {children}
        </div>)
   
}
