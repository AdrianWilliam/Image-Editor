import { EventHandler, SetStateAction, SyntheticEvent, useState } from "react";
import "./App.css";
import Bar from "./Components/Bar/Bar";
import Filter from "./Components/Filters/Filter";
import { IFilter } from "../types";
const INITIAL_STATE: IFilter[] = [
  {
    property: "brightness",
    name: "Brightness",
    value: 100,
    max: 200,
    min: 0,
    unit: "%",
  },
  {
    property: "contrast",
    name: "Contrast",
    value: 100,
    max: 200,
    min: 0,
    unit: "%",
  },
  {
    property: "grayscale",
    name: "Grayscale",
    value: 0,
    max: 100,
    min: 0,
    unit: "%",
  },
  {
    property: "hue-rotate",
    name: "Hue",
    value: 0,
    max: 100,
    min: 0,
    unit: "deg",
  },
  {
    property: "blur",
    name: "Blur",
    value: 0,
    max: 50,
    min: 0,
    unit: "px",
  },
  {
    property: "saturate",
    name: "Saturation",
    value: 100,
    max: 200,
    min: 0,
    unit: "%",
  },
];
const imageSizeDefault = {
  small: {
    width: 500,
    height: 500,
  },
  medium: {
    width: 1200,
    height: 1200,
  },
  large: {
    width: 2000,
    height: 2000,
  },
};
function App() {
  const [filter, setFilter] = useState<IFilter[]>(INITIAL_STATE);
  const [imageActual, setImageActual] = useState<CanvasImageSource>();
  const [image, setImage] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(0);
  const filterSelected = filter[selectedFilter];

  function getImageStyles() {
    const filters = filter.map((filter) => {
      return `${filter.property}(${filter.value}${filter.unit})`;
    });
    return { filter: filters.join("  ") };
  }

  function getImg(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(INITIAL_STATE);
    if (e.target.files?.length != 0) {
      const reader: any = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(e.target.files?.item(0));
    }
  }

  function reset() {
    setFilter(INITIAL_STATE);
  }

  const saveImage = () => {
    const styles = getImageStyles().filter;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = imageSizeDefault.medium.width;
    canvas.height = imageSizeDefault.medium.height;

    ctx!.filter = styles;
    ctx?.drawImage(imageActual!, 0, 0, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    link.remove();
  };
  return (
    <>
      <div className="container">
        <div className="content">
          <div className="header">
            <label htmlFor="select-img">Select Image</label>
            <input
              type="file"
              name="select-img"
              id="select-img"
              accept=".png, .jpg, .jpeg"
              onChange={getImg}
            />
            {image && (
              <button onClick={saveImage} className="saveButton">
                SAVE
              </button>
            )}
          </div>
          <div className="image">
            {image && (
              <img
                onLoad={(e: any) => setImageActual(e.target)}
                style={getImageStyles()}
                src={image}
                alt="image selected come here"
              />
            )}
          </div>
          {image && (
            <Bar
              props={filter}
              setFilter={setFilter}
              name={filterSelected.name}
              value={filterSelected.value}
              max={filterSelected.max}
              min={filterSelected.min}
              setSelectedFilter={setSelectedFilter}
            />
          )}
        </div>
        <div className="filters">
          {filter.map((i, index) => {
            return (
              <Filter
                key={i.name}
                indexFilter={index}
                typeFilter={i.name}
                setSelectedFilter={setSelectedFilter}
                active={index === selectedFilter}
              />
            );
          })}
          <div className="reset" onClick={reset}>
            RESET
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
