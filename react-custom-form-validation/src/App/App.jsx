import Main from '../components/Main/Main';
import MainUncontrolled from '../components/Main/MainUncontrolled';
import '../assets/styles/variables.scss';
import '../assets/styles/reset.scss';
import css from './App.module.scss';

function App() {
  return (
    <div className={css.container} >
    <div  className={css.forms}>
    
     <Main />
    </div>
     
    <div className={css.forms}>
    
     <MainUncontrolled />
    </div>
    </div>
  );
}

export default App;
