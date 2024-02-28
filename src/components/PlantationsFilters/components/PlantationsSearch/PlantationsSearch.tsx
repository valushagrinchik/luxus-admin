import { useState } from "react";
import { useAppDispatch } from "../../../../redux/store";
import { TextField } from "../../../../controls/TextField";
import { setPlantationsSearch } from "../../../../redux/reducer/catalogReducer";
import { SearchIcon } from "../../../../controls/icons/SearchIcon";
import { PlantationsFiltersSearchByMap } from "../../../../lib/constants";

export const PlantationsSearch = () => {
  const appDispatch = useAppDispatch();

  // workaround to display text field select placeholder
  const [searchBy, setSearchBy] = useState("name");
  return (
    <div style={{ display: "flex", marginRight: "4px" }}>
      <TextField
        style={{ width: "200px" }}
        placeholder="Encontrar..."
        defaultValue=""
        onChange={(e) => {
          appDispatch(setPlantationsSearch({ search: e.target.value }));
        }}
        icon={<SearchIcon color="var(--Gray-400)" />}
      />

      <TextField
        value={searchBy}
        select
        style={{ width: "160px" }}
        options={PlantationsFiltersSearchByMap}
        onChange={(event) => {
          setSearchBy(event.target.value);
          appDispatch(
            setPlantationsSearch({
              type: event.target
                .value as keyof typeof PlantationsFiltersSearchByMap,
            })
          );
        }}
      />
    </div>
  );
};
