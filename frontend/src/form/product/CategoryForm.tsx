import {
  Form,
  FormLabel,
  FormItem,
  // FormDescription,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/Form";
import { Separator } from "@/components/ui/Separator";
import { Input } from "@/components/ui/Input";

import createCategoryFormSchema from "@/helpers/use-create-category-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useCreateCategoryMutation,
  useGetCategoryByIdQuery,
} from "@/redux/features/auth/productApi";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Loader, PlusIcon } from "lucide-react";
import { CardFooter } from "@/components/ui/Card";
import {
  CategoryApi,
  ErrorResponse,
} from "@/pages/dashboard/product/CategoryList";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Spinner from "@/components/ui/Spinner";
import { useEffect, useState } from "react";

interface CreateNewCategoryFormProps {
  children?: React.ReactNode;
  id?: string;
}

const CategoryForm = ({
  children,
  id,
}: CreateNewCategoryFormProps) => {
  const navigate = useNavigate();
  const [createCategoryApi, { isLoading }] = useCreateCategoryMutation();

  const [edit, setEdit] = useState(false);

  const {
    data,
    isLoading: getCategoryByIdLoading,
    error: getCategoryByIdError,
  } = useGetCategoryByIdQuery(id, {
    skip: edit ? false : true,
  });
  
  const updateData: CategoryApi = data?.data;

  useEffect(() => {
    if (id) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [id]);

  const form = useForm<z.infer<typeof createCategoryFormSchema>>({
    resolver: zodResolver(createCategoryFormSchema),
    values: {
      title: updateData ? updateData?.title : "",
      description: updateData ? updateData?.description : "",
    },
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof createCategoryFormSchema>) => {
    // alert(JSON.stringify(data));
    try {
      if (id && updateData) {
        alert(JSON.stringify(data));
      } else {
        await createCategoryApi(data);
      }
      navigate("/admin/category");
    } catch (error) {
      console.log(error);
    }
  };

  // Extract error message from the error object
  const errorMessage = (getCategoryByIdError as ErrorResponse)?.data?.message;

  if (getCategoryByIdLoading) {
    return <Spinner />;
  }

  if (getCategoryByIdError) {
    return <ErrorMessage>{errorMessage}</ErrorMessage>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <sup className="text-red-600 text-sm">*</sup>Title
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="create title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <sup className="text-red-600 text-sm">*</sup>
                  Description
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-sm"
                    placeholder="write short category description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              </FormItem>
            )}
          />
        </div>
        <Separator className="my-6 mx-auto" />
        {children}
        <CardFooter className="w-1/2 flex justify-start mr-auto">
          <Button
            disabled={isLoading}
            size={"sm"}
            type="submit"
            className="w-2/5 -ml-6"
            variant={"default"}
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-5 w-5 animate-spin" />
                <span className="font-bold text-sm w-fit">
                  {id ? "Update" : "Save"}
                </span>
              </>
            ) : (
              <>
                <PlusIcon className="mr-2 h-5 w-5" />
                <span className="font-bold text-sm w-fit">
                  {id ? "Update" : "Save"}
                </span>
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default CategoryForm;