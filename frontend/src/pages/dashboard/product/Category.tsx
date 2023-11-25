import { PlusIcon, RefreshCcw } from "lucide-react";

import Spinner from "@/components/ui/Spinner";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Link } from "react-router-dom";
import Header from "@/components/ui/Header";

const Category = () => {
  const loading = false;
  const error = false;

  if (loading || error) {
    return <Spinner />;
  }

  return (
    <>
      {/* <Card className=""> */}
      <CardHeader className="">
        <CardTitle className="w-full flex justify-around items-center">
          <Header>
            Category List
          </Header>
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
        <Table className="">
          <TableCaption className="">
            A list of your recent invoices.
          </TableCaption>
          <TableHeader className="">
            <TableRow className="">
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            <TableRow className="">
              <TableCell className="font-medium ">INV001</TableCell>
              <TableCell className="">Paid</TableCell>
              <TableCell className="">Credit Card</TableCell>
              <TableCell className="text-right ">$250.00</TableCell>
            </TableRow>
            <TableRow className="">
              <TableCell className="font-medium ">INV001</TableCell>
              <TableCell className="">Paid</TableCell>
              <TableCell className="">Credit Card</TableCell>
              <TableCell className="text-right ">$250.00</TableCell>
            </TableRow>
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableFooter> */}
        </Table>
      </CardContent>
      {/* <CardFooter></CardFooter> */}
      {/* <section className="text-black">
          <h1>{user && user?.userName}</h1>
          <p>{user && user?.email}</p>
          <p>{user && user?.role}</p>
          <p>`{user && user?.active}`</p>
        </section> */}
      {/* </Card> */}
    </>
  );
};

export default Category;