import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropDownMenu";
import { Button } from "./Button";
import { MoreHorizontal, Eye, Edit2Icon, Trash } from "lucide-react";
import { Category } from "../product/Columns";
import { useDeleteCategoryMutation } from "@/redux/features/auth/productApi";
import { Link } from "react-router-dom";

// import { categories } from "@/pages/dashboard/product/Category";

const CurdDropDown = ({ _id }: Category) => {
  const [categoryDeleteByIdApiCall] = useDeleteCategoryMutation();

  const handelCategoryDelete = async () => {
    console.log(_id);
    await categoryDeleteByIdApiCall(_id).unwrap();
  };

  return (
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
        <DropdownMenuItem onClick={handelCategoryDelete}>
          <Trash className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurdDropDown;
