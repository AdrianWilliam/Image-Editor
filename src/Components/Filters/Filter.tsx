import { Dispatch, SetStateAction } from "react";
import "./Filter.css";
interface IFilterProps {
  typeFilter: string;
  indexFilter: number;
  active: boolean;
  setSelectedFilter: Dispatch<SetStateAction<number>>;
}
function handleFilter(
  index: number,
  setSelectedFilter: Dispatch<SetStateAction<number>>
) {
  setSelectedFilter(index);
}
function filter({
  typeFilter,
  setSelectedFilter,
  indexFilter,
  active,
}: IFilterProps) {
  return (
    <div
      className={`filter ${active ? "active" : ""}`}
      onClick={() => handleFilter(indexFilter, setSelectedFilter)}
    >
      {typeFilter}
    </div>
  );
}

export default filter;
