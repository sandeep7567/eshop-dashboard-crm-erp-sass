import { PlusIcon, XCircle } from "lucide-react";

import Spinner from "@/components/ui/Spinner";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Header from "@/components/ui/Header";
import { Separator } from "@/components/ui/Separator";
import CreateNewCategoryForm from "@/form/product/CreateNewCategoryForm";

const CreateNewCategory = () => {
  const loading = false;
  const error = false;

  if (loading || error) {
    return <Spinner />;
  }

  return (
    <>
      {/* <Card className=""> */}
      <CardHeader className="p-5">
        <CardTitle className="w-full flex justify-around items-center">
          <Header>Create New Category</Header>
          <p className="flex w-fit  justify-center items-center gap-x-2">
            <Button size={"sm"} variant={"outline"}>
              <XCircle className="mr-2 h-5 w-5 font-bold" />
              <span className="font-bold text-sm">Cancel</span>
            </Button>
            <Button size={"sm"} variant={"default"}>
              <PlusIcon className="mr-2 h-5 w-5 " />
              <span className="font-bold text-sm ">Save</span>
            </Button>
          </p>
        </CardTitle>
      </CardHeader>
      <Separator className="my-6 w-[95%] mx-auto" />
      <CardContent className="">
        <CreateNewCategoryForm>
          {/* form category button component */}
          <CardFooter className="w-1/2 flex justify-start mr-auto">
            <Button size={"sm"} type="submit" className="w-2/5 -ml-6" variant={"default"}>
              <PlusIcon className="mr-2 h-5 w-5" />
              <span className="font-bold text-sm w-fit">Save</span>
            </Button>
          </CardFooter>
        </CreateNewCategoryForm>
      </CardContent>
      {/* </Card> */}
    </>
  );
};

export default CreateNewCategory;
