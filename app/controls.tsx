import { type } from "os";
import Select from "react-select";

type ControlsType= {
  srtd: () => void,
  srtf: () => void,
  sortDirection: any,
  sortField: any
}

const Controls = ({srtd, srtf, sortDirection, sortField}: ControlsType) => {
  const fieldOptions = [
    { label: "Name", value: "name" },
    { label: "Company", value: "company" },
    { label: "Email", value: "email" },
  ];
  const directionOptions = [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ];

  return (
    <div className="gallery-controls controls">
      <div className="form-group group">
        <label htmlFor="sort-field" className="label">
          Sort Field
        </label>
        <Select options={fieldOptions} inputId="sort-field" className="input" onChange={srtf}/>
      </div>
      <div className="form-group group">
        <label htmlFor="sort-direction" className="label">
          Sort Direction
        </label>
        <Select
          options={directionOptions}
          inputId="sort-direction"
          className="input"
          onChange={srtd}
        />
      </div>
    </div>
  );
};

export default Controls;
