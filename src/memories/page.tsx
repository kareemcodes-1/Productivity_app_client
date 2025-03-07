
import Layout from '../layout'
import AllMemories from '../components/all-memories'
import { setEditing, setOpenMemoryModal } from '../../src/slices/memorySlice'
import { useDispatch } from 'react-redux'
import MemoryModal from '../modal/memory-modal'

const Memories = () => {

    const dispatch = useDispatch();

  return (
    <Layout>
          <div className='mt-[1.2rem]'>
          <div className='flex lg:items-center items-start justify-between w-full lg:flex-row flex-col mb-[2rem]'>
               <h1 className='lg:text-[3rem] text-[2.5rem]'>Memories</h1>
               <button type='button' className='yena-btn-black dark:yena-btn' onClick={() => {dispatch(setOpenMemoryModal(true)); dispatch(setEditing())}}>Create new</button>
          </div>

          <AllMemories />
          </div>
          <MemoryModal closeModal={() => dispatch(setOpenMemoryModal(false))}/>
    </Layout>
  )
}

export default Memories