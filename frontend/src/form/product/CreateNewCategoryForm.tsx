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
import { useCreateCategoryMutation } from "@/redux/features/auth/productApi";
import { useNavigate } from "react-router-dom";

interface CreateNewCategoryFormProps {
  children: React.ReactNode;
}

const CreateNewCategoryForm = ({ children }: CreateNewCategoryFormProps) => {

  const navigate = useNavigate();
  const [ createCategoryApi, { isLoading } ]  = useCreateCategoryMutation();

  const form = useForm<z.infer<typeof createCategoryFormSchema>>({
    resolver: zodResolver(createCategoryFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof createCategoryFormSchema>) => {
    // alert(JSON.stringify(data));
    await createCategoryApi(data);
    navigate("/admin/category");
  };

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
                {/* <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select> */}
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
                {/* <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select> */}
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
      </form>
    </Form>
  );
};

export default CreateNewCategoryForm;
