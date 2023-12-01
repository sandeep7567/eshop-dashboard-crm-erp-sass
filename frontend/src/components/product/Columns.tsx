import { ColumnDef } from "@tanstack/react-table";
import CurdDropDown from "../ui/CrudDropDown";
import { CategoryApi } from "@/pages/dashboard/product/CategoryList";
import { Button } from "../ui/Button";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Category = {
  _id: string;
  title: string;
  description: string;
  userId: string;
};

const categoryColumns: ColumnDef<CategoryApi>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="max-w-fit"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "description",
    cell: ({ row }) => {
      const description: string = row.getValue("description");
      // const desc = description.slice(0, 4);
      return <div className="w-[26rem]">{description}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toLocaleDateString();
      return <div className="text-left w-52">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({row}) => {
      const _id = row.original._id;
      return <CurdDropDown route="category" _id={_id} />;
    },
  },
];

export { categoryColumns };
