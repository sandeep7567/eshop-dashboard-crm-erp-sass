import { Link } from "react-router-dom";

import { useDeleteCategoryMutation } from "@/redux/features/auth/productApi";

import { Category } from "../product/Columns";

import { Button } from "./Button";
import { MoreHorizontal, Eye, Edit2Icon, Trash, BookOpen } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogTitle,
} from "./Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropDownMenu";
import { Input } from "./Input";
import { useState } from "react";

const CurdDropDown = ({ _id }: Category) => {
  const [categoryDeleteByIdApiCall] = useDeleteCategoryMutation();

  const [isOpen, setIsOpen] = useState(false);

  console.log(isOpen);

  const handleDeleteCategoryById = async () => {
    await categoryDeleteByIdApiCall(_id).unwrap();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[45px] absolute top-0 right-52 cursor-pointer"
        >
          <DropdownMenuItem className="">
            <Eye className="mr-2 h-4 w-4" />
            <span>Show</span>
          </DropdownMenuItem>
          <Link to={`/admin/category/${_id}`}>
            <DropdownMenuItem>
              <Edit2Icon className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          {/* delete code from here */}
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
          {/* to here */}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* delete Dialog component */}
      <DialogContent className="sm:max-w-[425px] transition-all duration-200 flex flex-col justify-center items-center gap-8">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            Do you want to delete the entry? Deleting this entry cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input value={_id} readOnly />
        </div>
        <DialogFooter className="max-w-fit ml-auto">
          <DialogClose asChild>
            <Button variant="outline" size={"sm"}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant={"destructive"}
            size={"sm"}
            onClick={handleDeleteCategoryById}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CurdDropDown;
