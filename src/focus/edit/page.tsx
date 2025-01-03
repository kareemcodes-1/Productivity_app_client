import { useEffect, useRef, useState } from "react";
import Layout from "../../layout";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import {useUpdateFocusMutation } from "../../../src/slices/focusApiSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "../../../store/store";
import { useNavigate } from "react-router";
import { updatedFocusNote } from "../../slices/focusSlice";

const EditFocusPage = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);
  const [value, setValue] = useState<string>('');
  const {editingFocus} = useSelector((state: RootState) => state.focus);
  const [updateFocus] = useUpdateFocusMutation();
  const [today, setToday] = useState<boolean>(false);
  const [tomorrow, setTomorrow] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (editorRef.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow", 
        placeholder: "Write your focus for the day...",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
          ],
        },
      });

      if (editingFocus?.content) {
        quillInstance.current.root.innerHTML = editingFocus.content;
        setValue(editingFocus?.content);
      }

      quillInstance.current.on("text-change", () => {
        setValue(quillInstance.current?.root.innerHTML as string);
      });
    }
    

    return () => {
      quillInstance.current = null;
      editorRef.current = null;
    }
  }, []);

  const handleSubmit = async () => {
    const date = today ? new Date().toISOString() : tomorrow ? new Date(new Date().setDate(new Date().getDate() + 1)).toISOString() : null
     if(editingFocus){
        const note = {
            _id: editingFocus._id,
            content: value,
            date
        }
  
        try {
          const res = await updateFocus({id: editingFocus._id, data: note}).unwrap();
          if(res){
              toast.success('Updated focus note');
              dispatch(updatedFocusNote(res));
              navigate('/focus');
          }
        } catch (error) {
          console.log(error);
        }
     }
  }

  return (
    <Layout>
      <div className="flex lg:tems-center items-start lg:flex-row flex-col justify-between w-full">
      <h1 className="text-[2.5rem]">Edit Focus</h1>
      <div className="flex items-center gap-[.5rem] relative">
      <button type="button" className="yena-btn" onClick={handleSubmit}>Save Note</button>
      <button type="button" className={`yena-btn ${today ? '--black' : ''} !h-[2rem]`} onClick={() => {setToday(true); setTomorrow(false)}}>Today</button>
      <button type="button" className={`yena-btn ${tomorrow ? '--black' : ''} !h-[2rem]`} onClick={() => {setTomorrow(true); setToday(false)}}>Tomorrow</button>
      </div>
      </div>
      <div className="border rounded-[.5rem] mt-[1.5rem]">
        {/* Editor container */}
        <div ref={editorRef} className="rounded-[.5rem] w-full" style={{height: "60vh"}}/>
      </div>
    </Layout>
  );
};

export default EditFocusPage;
