import { useState } from "react";
import { Button } from "../../controls/Button/Button";
import { TextField } from "../../controls/TextField";
import { BinIcon } from "../../controls/icons/BinIcon";
import { ExcelIcon } from "../../controls/icons/ExcelIcon";
import L18nEs from "../../lib/l18n";
import styles from "./PlantationsFilters.module.css";
import { PlusIcon } from "../../controls/icons/PlusIcon";
import { useAppSelector } from "../../store";
import { selectSelectedPlantations } from "../../redux/reducer/catalogReducer";
import { CloseIcon } from "../../controls/icons/CloseIcon";
import { CloseIconSmall } from "../../controls/icons/CloseIconSmall";
import { PlantationFilters } from "../../lib/types";

interface PlantationsFiltersProps {
  filters: PlantationFilters | null;
  actions: {
    onChange: (data: any) => void;
    onCreateBtnClick: () => void;
    onDeleteBtnClick: () => void;
  };
}

export const PlantationsFilters = ({
  filters,
  actions: { onChange: onFiltersChange, onCreateBtnClick, onDeleteBtnClick },
}: PlantationsFiltersProps) => {
  const selectedPlantations = useAppSelector(selectSelectedPlantations);
  const termsOfPaymentsMap = L18nEs.constants.termsOfPayments;
  const countries = L18nEs.constants.countries;
  const l18n = L18nEs.pages.plantation.filters;

  const [termOfPaymentsOpen, setTermOfPaymentsOpen] = useState(false);

  return (
    <div className={styles.filter_row}>
      <div className={styles.group}>
        <TextField
          select
          label={l18n.fields.termsOfPayment.label}
          placeholder={l18n.fields.termsOfPayment.placeholder}
          options={termsOfPaymentsMap}
          value={filters?.termsOfPayment || []}
          onClick={() => {
            setTermOfPaymentsOpen(!termOfPaymentsOpen);
          }}
          SelectProps={{
            multiple: true,
            open: termOfPaymentsOpen,
            onChange: (event) => {
              onFiltersChange({
                ...(filters || {}),
                termsOfPayment: event.target.value as any[],
              });
            },
            renderValue: (selected) => {
              return (
                <div className={styles.multiselect_value}>
                  {(selected as (keyof typeof termsOfPaymentsMap)[]).map(
                    (value, index) => (
                      <span key={index}>
                        {termsOfPaymentsMap[value]}

                        <CloseIcon
                          width={10}
                          height={10}
                          style={{ cursor: "pointer" }}
                          onMouseDown={(event: any) => {
                            event.stopPropagation();
                            event.preventDefault();

                            onFiltersChange({
                              ...(filters || {}),
                              termsOfPayment: (
                                filters?.termsOfPayment || []
                              ).filter((selected) => selected !== value),
                            });

                            setTermOfPaymentsOpen(false);
                          }}
                        />
                      </span>
                    )
                  )}
                </div>
              );
            },
          }}
        />
        <TextField
          select
          label={l18n.fields.country.label}
          placeholder={l18n.fields.country.placeholder}
          style={{ width: "210px" }}
          options={countries}
          value={filters?.country || ""}
          onChange={(event) => {
            onFiltersChange({
              ...(filters || {}),
              country: event.target.value,
            });
          }}
        />
        {filters && (
          <span
            className={styles.reset_filters}
            onClick={() => onFiltersChange(null)}
          >
            <CloseIconSmall width={16} height={16} /> Eliminar filtros
          </span>
        )}
      </div>

      <div className={styles.group}>
        <Button color="base" onClick={onCreateBtnClick}>
          <PlusIcon width={24} height={24} />
        </Button>
        <Button
          color="red"
          disabled={!selectedPlantations.length}
          onClick={onDeleteBtnClick}
        >
          <BinIcon
            color={
              !selectedPlantations.length
                ? "var(--Gray-400)"
                : "var(--Base-White)"
            }
          />
        </Button>
        <Button color="transparent">
          <ExcelIcon width={24} height={24} color="var(--Primary-800)" />
        </Button>
      </div>
    </div>
  );
};
