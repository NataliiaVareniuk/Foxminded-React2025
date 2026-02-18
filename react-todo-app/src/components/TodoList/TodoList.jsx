import { useRef, useEffect } from 'react';
import style from './TodoList.module.scss';
import clsx from 'clsx';
import TodoItem from '../TodoItem/TodoItem';
import Button from '@/ui/Button/Button';
import deleteIcon from '@/shared/images/icons/delete.svg';
import {useTodos} from '../../utils/hooks/useTodos'

function TodoList() {
 
  const listRef = useRef(null);
  const  {  isLoading,
        error,
        data,
        setDoneTask,
        handleDeleteTask,
        clearAllTasks,
        editTask} = useTodos();
  
  useEffect(() => {
    if (!listRef.current) return;
    requestAnimationFrame(() => {
      listRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, [data]);

  return (
    <div className={style.wrapper}>
      <div  ref={listRef} className={clsx(style.listToDo)}>
        {isLoading && <div className="loading">Loading...</div>}
        {error && <div className="error">Error: {error.message}</div>}
        {!isLoading && !error && (
          <ul className={style.items}>
            {data?.map((task) => (
              <li key={task.id} className={style.item}>
                <TodoItem
                  value={task.title}
                  id={task.id}
                  checked={task.done}
                  onToggle={() => setDoneTask(task.id)}
                  onDelete={() => handleDeleteTask(task.id)}
                  onSave={editTask}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={style.buttonClear}>
        <Button
          iconSrc={deleteIcon}
          variant="secondary"
          disabled={!data?.length || isLoading}
          size="wide"
          onClick={clearAllTasks}
        >
          Clear all tasks
        </Button>
      </div>
    </div>
  );
}

export default TodoList;
