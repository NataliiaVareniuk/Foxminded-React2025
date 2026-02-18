import style from './TodoForm.module.scss';
import { useState } from 'react';
import Button from '@/ui/Button/Button.jsx';
import clsx from 'clsx';
import addIcon from '@/shared/images/icons/plus.svg';
import {useTodos} from '../../utils/hooks/useTodos'

function TodoForm() {
  const [newTask, setNewTask] = useState('');
  const [hasError, setHasError] = useState(false);
  
  const {isLoading, createMutation } = useTodos(); 

  const handleSubmit = (e) => {
     e.preventDefault();
if (!newTask.trim()) {
       setHasError(true);
       return;
     }
      const todo = {
       title: newTask,
       done: false,
     };
     setHasError(false);
     createMutation.mutate(todo);
     setNewTask('');

}
  
return (
    <>
      <form
        className={clsx(style.formToDo, 'container-default')}
        onSubmit={handleSubmit}
      >
        <input
          id="inputForm"
          className={clsx(style.input, 'text-default', hasError && style.error)}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Type here to add a task..."
          value={newTask}
          type="text"
        />
        <Button
          type="submit"
          iconSrc={addIcon}
          variant="primary"
          disabled={isLoading}
        >
          Add
        </Button>
      </form>
    </>
  );
}

export default TodoForm;
