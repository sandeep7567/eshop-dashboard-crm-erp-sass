import { Link } from "react-router-dom";

import { PlusIcon, RefreshCcw } from "lucide-react";

import { useGetAllCategoryQuery } from "@/redux/features/auth/productApi";

import Spinner from "@/components/ui/Spinner";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Header from "@/components/ui/Header";

import { DataTable } from "@/components/table/DataTable";
import { categoryColumns } from "@/components/product/Columns";

export type categories = {
  _id: string;
  title: string;
  description: string;
  userId: string;
  product: string[];
  createdAt: Date;
  updatedAt: Date;
};

const Category = () => {
  const { data, isLoading, error } = useGetAllCategoryQuery(undefined);

  const categories: categories[] = data?.data;

  return isLoading ? (
    <Spinner />
  ) : error ? (
    <>{error}</>
  ) : (
    <>
      {/* <Card className=""> */}
      <CardHeader className="">
        <CardTitle className="w-full flex justify-around items-center">
          <Header>Category List</Header>
          <p className="flex w-fit  justify-center items-center gap-x-2">
            <Button size={"sm"} variant={"outline"}>
              <RefreshCcw className="mr-2 h-5 w-5 font-bold" />
              <span className="font-bold text-sm">Refresh</span>
            </Button>
            <Button size={"sm"} variant={"default"} asChild>
              <Link to={"/admin/category/create"}>
                <PlusIcon className="mr-2 h-5 w-5" />
                <span className="font-bold text-sm ">Add New Category</span>
              </Link>
            </Button>
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        {/* put your table compnenet here */}
        <DataTable filter={"title"} columns={categoryColumns} data={categories} />
      </CardContent>
    </>
  );
};

export default Category;
