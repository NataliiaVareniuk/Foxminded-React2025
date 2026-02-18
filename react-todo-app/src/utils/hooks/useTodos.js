
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  postTodoItem,
  getTodoList,
  updateTodoItem,
  deleteTodoItem,
} from '@/shared/assets/api/api';

export function useTodos () {
 const queryClient = useQueryClient();



  const { data, error, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTodoList,
    select: (data) => data.toReversed(),
  });


  const createMutation = useMutation({
     mutationFn: postTodoItem,
     onMutate: async (newTask) => {
       await queryClient.cancelQueries({ queryKey: ['tasks'] });
       const previousTasks = queryClient.getQueryData(['tasks']);
 
       const optimisticTodo = {
         id: Date.now(),
         ...newTask,
       };
       queryClient.setQueryData(['tasks'], (old = []) => [
         optimisticTodo,
         ...old,
       ]);
       return { previousTasks };
     },
 
     onError: (_err, _newTodo, context) => {
       if (context?.previousTasks) {
         queryClient.setQueryData(['tasks'], context.previousTasks);
       }
     },
     onSettled: () => {
    
       queryClient.invalidateQueries({ queryKey: ['tasks'] });
     },
   });


  const updateMutation = useMutation({
    mutationFn: updateTodoItem,
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      const previousTasks = queryClient.getQueryData(['tasks']);

      queryClient.setQueryData(['tasks'], (old = []) =>
        old?.map((task) =>
          task.id === newTask.id ? { ...task, ...newTask } : {...task},
        ),
      );
      return { previousTasks };
    },
    onError: (_err, _newTask, context) => {
      if (context) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodoItem,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData(['tasks']);
      queryClient.setQueryData(['tasks'], (old = []) =>
        old.filter((task) => task.id !== id),
      
      );
      return { previousTasks };
    },
    onError: (_err, _id, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

    
  const editTask = (id, newTitle) => {
    const task = data?.find((el) => el.id === id);
    if (!task) return;
    const editedTask = {
      ...task,
      title: newTitle,
    };
    updateMutation.mutate(editedTask);
  };

   const setDoneTask = (id) => {
    const task = data?.find((el) => el.id === id);
    if (!task) return;
    const updatedTask = {
      ...task,
      done: !task.done,
    };
    updateMutation.mutate(updatedTask);
  };

  const handleDeleteTask = (id) => {
    const task = data?.find((el) => el.id === id);
    if (!task) return;
    deleteMutation.mutate(id);
  };

  const clearAllTasks = async () => {
    if (!data) return;
    const previousTasks = queryClient.getQueryData(['tasks']);
    queryClient.setQueryData(['tasks'], []);

    try {
      for (const task of data) {
        await deleteMutation.mutateAsync(task.id);
      }
    } catch (err) {
      queryClient.setQueryData(['tasks'], previousTasks);
    } finally {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  };

    return{
        isLoading,
        error,
        data,
        createMutation,
        setDoneTask,
        handleDeleteTask,
        clearAllTasks,
        editTask
    }
}