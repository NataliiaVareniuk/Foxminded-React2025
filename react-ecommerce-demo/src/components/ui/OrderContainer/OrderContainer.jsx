import style from './OrderContainer.module.scss'

export default function OrderContainer ({ children, width }) {

      return (
      <div className={style.container}  style={{width}}>
        {children}
      </div>)
   
}
