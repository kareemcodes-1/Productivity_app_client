
import Layout from '../layout'
import TodoModal from '../modal/todo-modal';
import { Dialog } from '../components/ui/dialog';
import Todos from '../components/todos';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { handleTodosFilter, setEditing, setOpenTodoModal } from '../../src/slices/todoSlice';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { PlusIcon } from '@heroicons/react/24/outline';
   

const TodosPage = () => {
  const dispatch = useDispatch();
    const {openTodoModal} = useSelector((state: RootState) => state.todo);

  return (
    <Layout>
        <div className='mt-[1.2rem]'>
        <div className='flex items-center justify-between mb-[1rem]'>
             <h1 className='lg:text-[3rem] text-[2rem]'>Todos</h1>

             <div className='flex items-center gap-[.5rem] relative'>
             <button type="button" className='dark:yena-btn yena-btn-black ' onClick={() => {dispatch(setOpenTodoModal(true)); dispatch(setEditing())}}><span className='lg:block hidden'>Create Todo</span><PlusIcon className='lg:hidden block w-[1.3rem]'/><span></span></button>

          <Select onValueChange={(value) => dispatch(handleTodosFilter(value))}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Today" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Todos</SelectItem>
              <SelectItem value={'today'}>Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
            </SelectContent>
          </Select>
             </div>
        </div>

        
        <Todos />
        </div>

        <Dialog open={openTodoModal} onOpenChange={(isOpen) => dispatch(setOpenTodoModal(isOpen))}>
             <TodoModal closeModal={() => dispatch(setOpenTodoModal(false))}/>
        </Dialog>

        
    </Layout>
  )
}

export default TodosPage