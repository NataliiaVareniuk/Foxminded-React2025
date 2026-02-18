import TodoForm from '../components/TodoForm/TodoForm';
import TodoList from '../components/TodoList/TodoList';
import style from './TodoPage.module.scss';

function TodoPage() {
  return (
    <div className={style.wrapper}>
      <TodoForm />
      <div className={style.divider} />
      <TodoList />
    </div>
  );
}

export default TodoPage;
