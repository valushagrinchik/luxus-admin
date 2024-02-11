import React, { useState } from "react";
import { SortsFilters } from "../../components/SortsFilters/SortsFilters";
import { SortListGroup, SortsList } from "../../components/SortsList/SortsList";
import { Category, Group, Sort } from "../../types";
import { Modal } from "../../controls/Modal";
import {  EditGroupForm } from "../../components/forms/EditGroupForm/EditGroupForm";
import { EditCategoryForm } from "../../components/forms/EditCategoryForm/EditCategoryForm";

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

  const renderForm = () => {
    if (!contentData) {
      return;
    }

    if ("categories" in contentData) {
      return (
        <EditGroupForm
          onSubmit={handleClose}
          onReset={handleClose}
          group={contentData as Group}
        />
      );
    }
    if ("sorts" in contentData) {
      return (
        <EditCategoryForm
          onSubmit={handleClose}
          onReset={handleClose}
          category={contentData as Category}
        />
      );
    }
    
  };

  const [sortListGroup, setSortListGroup] = useState(SortListGroup.group)

  return (
    <div className="container">
      <h1>Variedades</h1>
      <SortsFilters onSortListGroupChange={setSortListGroup}/>
      <div className="box">
        <SortsList openModal={handleOpen} group={sortListGroup} />
        <Modal open={open} onClose={handleClose}>
          {renderForm()}
        </Modal>
      </div>
    </div>
  );
};
