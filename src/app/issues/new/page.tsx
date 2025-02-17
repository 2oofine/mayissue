"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const titleRef = useRef(register("title"));

  const handleIssueSubmit = async (data: IssueForm) => {
    await axios.post("/api/issues", data);
    router.push("/issues");
  };
  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(handleIssueSubmit)}>
      <TextField.Root placeholder="Title" {...titleRef.current} />
      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
      />

      <Button className="cursor-pointer">Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
