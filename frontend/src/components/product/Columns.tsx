import { ColumnDef } from "@tanstack/react-table";
import CurdDropDown from "../ui/CrudDropDown";
import { categories } from "@/pages/dashboard/product/Category";
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

const categoryColumns: ColumnDef<categories>[] = [
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
      return <div className="w-[25rem]">{description}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toLocaleDateString();
      return <div className="text-left w-48">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

      return <CurdDropDown {...category} />;
    },
  },
];

export { categoryColumns };
