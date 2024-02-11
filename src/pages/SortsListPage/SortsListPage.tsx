import { useState } from "react";
import { SortsFilters } from "../../components/SortsFilters/SortsFilters";
import { SortListGroup, SortsList } from "../../components/SortsList/SortsList";
import { Category, Group, Sort } from "../../types";
import { Modal } from "../../controls/Modal";
import {  EditGroupForm } from "../../components/forms/EditGroupForm/EditGroupForm";
import { EditCategoryForm } from "../../components/forms/EditCategoryForm/EditCategoryForm";


const renderForm = ({contentData, ...props}: {
  contentData:  Group | Category | Sort | null,
  onSubmit: () => void , 
  onReset: () => void
}) => {
  if (!contentData) {
    return;
  }

  if ("categories" in contentData) {
    return (
      <EditGroupForm
        {...props}
        group={contentData as Group}
      />
    );
  }
  if ("sorts" in contentData) {
    return (
      <EditCategoryForm
        {...props}
        category={contentData as Category}
      />
    );
  }
};




export const SortsListPage = () => {
  const [open, setOpen] = useState(false);
  const [contentData, setContentData] = useState<
    Group | Category | Sort | null
  >(null);

  const handleOpen = (data: Group | Category | Sort) => {
    setContentData(data);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }

  const [sortListGroup, setSortListGroup] = useState(SortListGroup.group)
  const [search, setSearch] = useState<{search: string, type: SortListGroup}>({
    search: '',
    type: SortListGroup.group
  })

  return (
    <div className="container">
      <h1>Variedades</h1>
      <SortsFilters 
        onSortListGroupChange={setSortListGroup}
        onSearchChange={setSearch}
      />
      <div className="box">
        <SortsList openModal={handleOpen} group={sortListGroup} search={search} />
        <Modal open={open} onClose={handleClose}>
          {renderForm({
             onSubmit:handleClose,
             onReset:handleClose,
             contentData
          })}
        </Modal>
      </div>
    </div>
  );
};
