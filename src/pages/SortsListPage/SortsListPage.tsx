import React, { useState } from "react";
import { SortsFilters } from "../../components/SortsFilters/SortsFilters";
import { SortsList } from "../../components/SortsList/SortsList";
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
  const handleClose = () => setOpen(false);

  const renderForm = () => {
    console.log(contentData);
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

  return (
    <div className="container">
      <h1>Variedades</h1>
      <SortsFilters />
      <div className="box">
        <SortsList openModal={handleOpen} />
        <Modal open={open} onClose={handleClose}>
          <div>
            {JSON.stringify(contentData)}
            {renderForm()}
          </div>
        </Modal>
      </div>
    </div>
  );
};
