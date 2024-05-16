/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { GroupCard } from "../components/GroupCard/GroupCard"
import GroupCard from "@/components/ui/group-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddQuiz from "../components/AddQuiz";

export const NoActiveGroupView = () => {
  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.teachers);

  if (!groups.length) {
    return (
      <div className="flex justify-center items-center h-[80vh] flex-col gap-2">
        <p className="text-3xl font-semibold text-center text-gray-400">
          Create an active group to start teaching!
        </p>
      </div>
    );
  }

  return (
    <div className="py-5 px-16 flex gap-y-2 gap-x-4 flex-wrap">
      {groups.map((group, key) => (
        <GroupCard key={key} {...group} />
      ))}

      {/*             {groups.map((group, key) => (
                <GroupCard key={key} {...group} />
            ))} */}
    </div>
  );
};
