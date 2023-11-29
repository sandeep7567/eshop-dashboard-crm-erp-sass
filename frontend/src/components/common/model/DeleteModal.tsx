import Modal, { ModalT } from "@/components/common/model/Modal";
import { useDeleteCategoryMutation } from "@/redux/features/auth/productApi";

const DeleteModal = ({ children, title, description, id, }: ModalT) => {
  // const [ deleteCategoryApiCall, { isLoading } ] = useDeleteCategoryMutation(id);
  // return <Modal title="" description="" deleteApiCall={deleteCategoryApiCall} >{children}</Modal>;
};

export default DeleteModal;
