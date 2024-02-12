import { useState } from "react";
import { SortsFilters } from "../../components/SortsFilters/SortsFilters";
import { SortsList } from "../../components/SortsList/SortsList";
import { Category, Group, Sort } from "../../types";
import { Modal } from "../../controls/Modal";
import {  EditGroupForm } from "../../components/forms/EditGroupForm/EditGroupForm";
import { EditCategoryForm } from "../../components/forms/EditCategoryForm/EditCategoryForm";
import { SortListGroup } from "../../lib/constants";

type ModalType = 'create' | 'update' 

const renderForm = ({contentData, ...props}: {
  contentData:  any,
  onSubmit: () => void , 
  onReset: () => void
}, modalType: ModalType, type: SortListGroup) => {
  if (!contentData) {
    return;
  }

  switch(type){
    case SortListGroup.group: {
      return (
        <EditGroupForm
          {...props}
          action={modalType}
          data={contentData}
        />
      );
    }
    case SortListGroup.category: {
      return (
        <EditCategoryForm
          {...props}
          // action={modalType}
          category={contentData}
        />
      );
    }
    case SortListGroup.sort: {
      
    }
  }
};



export const SortsListPage = () => {
  const [open, setOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);

  

  const [modalConfig, setModalConfig] = useState<{modalType: ModalType, type: SortListGroup, data: any } | null>(null);

  const handleOpen = (modalType: ModalType, type: SortListGroup, data: any ) => {
    setModalConfig({
      modalType, 
      type,
      data
    })
    setOpen(true);
  };
  const handleClose = () => {
    setRefetch(true);
    setOpen(false);
  }

  const [sortListGroup, setSortListGroup] = useState(SortListGroup.group)

  return (
    <div className="container">
      <h1>Variedades</h1>
      <SortsFilters 
        onSortListGroupChange={setSortListGroup}
        onCreateBtnClick={(type) => {
          handleOpen('create', type, {})
        }}
      />
      <div className="box">
        <SortsList refetch={refetch} openModal={(data, type) => handleOpen('update', type, data)} group={sortListGroup} />
        <Modal open={open} onClose={handleClose}>
          {modalConfig && renderForm({
             onSubmit:handleClose,
             onReset:handleClose,
             contentData: modalConfig.data
          }, modalConfig.modalType, modalConfig.type)}
        </Modal>
      </div>
    </div>
  );
};
