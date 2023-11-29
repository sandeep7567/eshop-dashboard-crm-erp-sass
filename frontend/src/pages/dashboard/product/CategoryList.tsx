import { Link } from "react-router-dom";
import { PlusIcon, RefreshCcw } from "lucide-react";
import { useGetAllCategoryQuery } from "@/redux/features/auth/productApi";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Header from "@/components/ui/Header";
import { DataTable } from "@/components/table/DataTable";
import { categoryColumns } from "@/components/product/Columns";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Spinner from "@/components/ui/Spinner";
export interface CategoryApi {
  _id: string;
  title: string;
  description: string;
  userId: string;
  product: string[];
  createdAt: Date;
  updatedAt: Date;
}
export interface ErrorResponse {
  data: {
    data: null;
    errors: [];
    jwtExpired: boolean;
    message: string;
    stack: string;
    statusCode: number;
    success: boolean;
  };
}

const CategoryList = () => {
  // Fetch category data using a custom hook
  const { data, isLoading, error } = useGetAllCategoryQuery(undefined);

  // Extract category data from the fetched data
  const categories: CategoryApi[] = data?.data;

  // Extract error message from the error object
  const errorMessage = (error as ErrorResponse)?.data?.message;

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage>{errorMessage}</ErrorMessage>;
  }

  return (
    <>
      {/* Display header with buttons for refreshing and adding a new category */}
      <CardHeader className="">
        <CardTitle className="w-full flex justify-around items-center">
          <Header>Category List</Header>
          <p className="flex w-fit justify-center items-center gap-x-2">
            {/* Button for refreshing the category list */}
            <Button size={"sm"} variant={"outline"}>
              <RefreshCcw className="mr-2 h-5 w-5 font-bold" />
              <span className="font-bold text-sm">Refresh</span>
            </Button>
            {/* Button for adding a new category */}
            <Button size={"sm"} variant={"default"} asChild>
              <Link to={"/admin/category/create"}>
                <PlusIcon className="mr-2 h-5 w-5" />
                <span className="font-bold text-sm ">Add New Category</span>
              </Link>
            </Button>
          </p>
        </CardTitle>
      </CardHeader>
      {/* Display category data in a table */}
      <CardContent className="">
        <DataTable
          filter={"title"}
          columns={categoryColumns}
          data={categories}
        />
      </CardContent>
    </>
  );
};

export default CategoryList;
