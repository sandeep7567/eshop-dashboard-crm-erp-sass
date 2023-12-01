import { Edit, PlusIcon, XCircle } from "lucide-react";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Header from "@/components/ui/Header";
import { Separator } from "@/components/ui/Separator";
import CategoryForm from "@/form/product/CategoryForm";
import { Link, useLocation, useParams } from "react-router-dom";

const Category = () => {
  const { search } = useLocation();

  const view = search.slice(1, search.length).includes("view");

  console.log(view);

  const { id } = useParams();

  return (
    <>
      {/* <Card className=""> */}
      <CardHeader className="p-5">
        <CardTitle className="w-full flex justify-around items-center">
          <Header>{view ? "View Category" : id ? "Update" : "Create New Category"}</Header>
          <p className="flex w-fit  justify-center items-center gap-x-2">
            <Button size={"sm"} variant={"outline"} asChild>
              <Link to={"/admin/category"}>
                <XCircle className="mr-2 h-5 w-5 font-bold" />
                <span className="font-bold text-sm">
                  {view ? "Close" : "Cancel"}
                </span>
              </Link>
            </Button>
            <Button size={"sm"} variant={"default"}>
            {view ? (<Edit className="mr-2 h-5 w-5 "/>) : (<PlusIcon className="mr-2 h-5 w-5 " />)}
              <span className="font-bold text-sm ">
                {view ? "Edit" : id ? "Update" : "Save"}
              </span>
            </Button>
          </p>
        </CardTitle>
      </CardHeader>
      <Separator className="my-6 w-[95%] mx-auto" />
      <CardContent>
        <CategoryForm view={view} id={id} />
      </CardContent>
      {/* </Card> */}
    </>
  );
};

export default Category;
