import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Memory } from "../../types/type";
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { useDeleteMemoryMutation } from "../slices/memoryApiSlice";
import toast from "react-hot-toast";
import { deleteMemories, editMemory } from "../slices/memorySlice";
import { useState } from "react";
import { createPortal } from "react-dom";

const MemoryCard = ({ memory }: { memory: Memory }) => {
  const dispatch = useDispatch();
  const [deleteMemory] = useDeleteMemoryMutation();
  const [showImagePreview, setShowImagePreview] = useState<string>('');
  const [, setOpenImageModal] = useState<boolean>(false);

  async function handleDeleteMemory(id: string) {
    try {
      const res = await deleteMemory(id).unwrap();
      if (res) {
        dispatch(deleteMemories(id));
        toast.success("Deleted goal");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const showImage = (img: string) => {
      setShowImagePreview(img)
      setOpenImageModal(true);
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img onClick={() => showImage(memory.image)}
        className="w-full h-[15rem] object-cover cursor-pointer"
        src={memory.image}
        alt={memory.name}
      />

      {showImagePreview && (
        createPortal(
            <div className="fixed top-0 right-0 left-0 z-[100] h-screen">
                <div className="bg-[#000000c7] backdrop-blur-sm w-full h-full absolute cursor-pointer" onClick={() => {setShowImagePreview(''); setOpenImageModal(false);}}/>
                <div className=" flex items-center justify-center">
                <img src={showImagePreview} className="lg:w-[30rem] w-[20rem] lg:h-screen h-[20rem] lg:mt-0 mt-[10rem] z-[100] rounded-[.5rem] object-cover" alt="" />
                </div>
            </div>, document.body
        )
      )}

      <div className="flex items-center justify-between px-[1rem] py-[1rem]">
        <div className="font-semibold">{memory.name}</div>
        <div className="flex items-center gap-[1rem]">
          <button
            type="button"
            onClick={() => dispatch(editMemory(memory))}
            className="text-gray-500"
          >
            <PencilIcon className="w-[1.4rem]" />
          </button>
          <button
            type="button"
            onClick={() => handleDeleteMemory(memory._id)}
            className="text-red-500"
          >
            <TrashIcon className="w-[1.4rem]" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-[.5rem] p-[1rem]">
        <Badge className="flex items-center gap-[.3rem]">
          <div>{memory.projectId.emoji}</div> <div>{memory.projectId.name}</div>
        </Badge>
        <Badge>
          {format(new Date(memory.createdAt).toISOString(), "dd-MM-yyyy")}
        </Badge>
      </div>
    </div>
  );
};

export default MemoryCard;
