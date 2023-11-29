import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setIsModalClose } from "@/redux/features/modal/modalSlice";

export type ModalT = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const Modal = ({ title, description, children}: ModalT) => {
  
  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector((state) => state.modal);
  console.log(isModalOpen);

  const handelDeleteConfirmation = async () => {};
  
  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() => dispatch(setIsModalClose())}
    >
      <DialogContent className="sm:max-w-[425px] transition-all duration-200 flex flex-col justify-center items-center gap-8">
        <DialogHeader>
          <DialogTitle>{title}Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            {description}
            This action cannot be undone. Are you sure you want to permanently
            delete this file from our servers?
          </DialogDescription>
        </DialogHeader>
        {children}
        {/* <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Team name</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
          </div>
        </div> */}
        <DialogFooter className="max-w-fit ml-auto">
          <Button
            variant="outline"
            size={"sm"}
            onClick={() => dispatch(setIsModalClose())}
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handelDeleteConfirmation} variant={"destructive"} size={"sm"}>confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
