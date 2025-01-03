import { Goal } from "../../types/type";
import { Pencil, Trash } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { useDispatch } from "react-redux";
import { useCompleteGoalMutation, useDeleteGoalMutation } from "../../src/slices/goalApiSlice";
import toast from "react-hot-toast";
import JSConfetti from 'js-confetti'
import { completeAGoal, deleteGoals, editGoal } from "../../src/slices/goalSlice";


const GoalCard = ({ goal }: { goal: Goal}) => {
  const dispatch = useDispatch();
  const [deleteGoal] = useDeleteGoalMutation();
  const [completeGoal] = useCompleteGoalMutation();

  const jsConfetti = new JSConfetti();

  async function handleDeleteGoal(id: string) {
    try {
      await deleteGoal(id);
      dispatch(deleteGoals(id));
      toast.success("Deleted goal");
    } catch (error) {
      console.log(error);
    }
  }

  async function completedGoal(id: string) {
    try {
      const updatedGoal = { ...goal, completed: !goal.completed };

      const res = await completeGoal({ id, data: updatedGoal }).unwrap();
      if (res.completed) {
        jsConfetti.addConfetti();
        toast.success("Completed Goal");
      }

      dispatch(completeAGoal(res));
    } catch (error) {
      console.error("Failed to complete todo:", error);
      toast.error("Failed to mark Todo as completed");
    }
  }


  return (
    <div className="border w-full shadow-md rounded-[.5rem] p-[1rem] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[1rem]">
  <div className="flex items-center gap-[1rem]">
     {goal.completed ? (
          <div className="inline-flex items-center">
            <label className="flex items-center cursor-pointer relative">
              <input
                onClick={() => completedGoal(goal._id)}
                type="checkbox"
                defaultChecked
                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-600 checked:border-green-600"
              />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
          </div>
        ) : (
          <div className="inline-flex items-center">
            <label className="flex items-center cursor-pointer relative">
              <input
                onClick={() => completedGoal(goal._id)}
                type="checkbox"
                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-600 checked:border-green-600"
              />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
          </div>
        )}

    <h1 className="text-[1.2rem]">{goal.name}</h1>
  </div>

  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[1rem] lg:gap-[2rem]">
    <div className="flex items-center gap-[1rem]">
      <Badge className="flex items-center gap-[.3rem]">
      <div className="text-[.8rem]">{goal.projectId.emoji}</div>{" "}
        <div className="text-[.8rem]">{goal.projectId.name}</div>
      </Badge>
    </div>
    <div className="flex items-center gap-[1rem]">
      <button
        type="button"
        onClick={() => dispatch(editGoal(goal))}
        className="text-gray-500"
      >
        <Pencil className="w-[1.4rem]" />
      </button>
      <button
        type="button"
        onClick={() => handleDeleteGoal(goal._id)}
        className="text-red-500"
      >
        <Trash className="w-[1.4rem]" />
      </button>
    </div>
  </div>
   </div>
  );
};

export default GoalCard;
