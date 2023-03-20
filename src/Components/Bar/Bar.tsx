import React, { Dispatch, SetStateAction } from "react";
import "./Bar.css";
import { IFilter } from "../../../types";

interface IbarProps {
  props: IFilter[];
  name: string;
  value: number;
  max: number;
  min: number;
  setFilter: Dispatch<SetStateAction<IFilter[]>>;
  setSelectedFilter: Dispatch<SetStateAction<number>>;
}
function Bar({ props, name, value, max, min, setFilter }: IbarProps) {
  function handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    const changedFilterValue = props.map((i) =>
      i.name === name ? { ...i, value: value } : i
    );
    setFilter(changedFilterValue);
  }

  return (
    <div className="bar">
      <input
        type="range"
        max={max}
        min={min}
        value={value}
        name="values"
        id="values"
        onChange={handleChangeValue}
      />
    </div>
  );
}

export default Bar;
