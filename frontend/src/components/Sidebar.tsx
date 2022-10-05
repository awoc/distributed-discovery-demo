import '../styles/Sidebar.css';
import {
  models,
  scenarios,
  fileTypesWithBPMN,
  fileTypesWithoutBPMN,
  DropdownInput
} from '../models/DropdownInput';
import Button from './Button';
import Dropdown from './Dropdown';
import { useStore } from './../store';
import shallow from 'zustand/shallow';
import { saveAs } from 'file-saver';
import CheckBox from './Checkbox';
import Slider from './NoiseSlider';
import { useEffect, useMemo, useState } from 'react';

const Sidebar = () => {
  const { model, scenario, setModel, setScenario, fetchDot } = useStore(
    (state) => ({
      model: state.model,
      scenario: state.scenario,
      setModel: state.setModel,
      setScenario: state.setScenario,
      fetchDot: state.fetchDot
    }),
    shallow
  );

  return (
    <div className="m-0 w-full h-full flex flex-col bg-white shadow-md text-black p-4" id="sidebar">
      <Dropdown name="Scenario" inputs={scenarios} selected={scenario} setSelected={setScenario} />
      <Dropdown name="Output Model" inputs={models} selected={model} setSelected={setModel} />
      {model.parameter !== 'dfg_frequency' && model.parameter !== 'dfg_performance' ? (
        <Slider />
      ) : (
        <></>
      )}
      {model.parameter === 'bpmn' ? <BPMNSettings /> : <></>}
      <Button className="mt-2" name="View" click={fetchDot} />
      <hr className="mt-2" />
      <ExportSettings />
    </div>
  );
};

const BPMNSettings = () => {
  const { edgeLabel, colorStartEnd, setEdgeLabel, setColorStartEnd } = useStore(
    (state) => ({
      edgeLabel: state.edgeLabel,
      colorStartEnd: state.colorStartEnd,
      setEdgeLabel: state.setEdgeLabel,
      setColorStartEnd: state.setColorStartEnd
    }),
    shallow
  );

  return (
    <>
      <CheckBox
        id="1"
        setChecked={setEdgeLabel}
        value={1}
        title="Show message flow labels"
        checked={edgeLabel}
      />
      <CheckBox
        id="1"
        setChecked={setColorStartEnd}
        value={1}
        title="Colorize start and end event"
        checked={colorStartEnd}
      />
    </>
  );
};

const ExportSettings = () => {
  const { model, scenario, edgeLabel, colorStartEnd, noise } = useStore((state) => ({
    model: state.model,
    scenario: state.scenario,
    edgeLabel: state.edgeLabel,
    colorStartEnd: state.colorStartEnd,
    noise: state.noise
  }));

  const fileTypes = useMemo(
    () => (model.name === 'BPMN' ? fileTypesWithBPMN : fileTypesWithoutBPMN),
    [model]
  );

  const [fileType, setFileType] = useState<DropdownInput>(fileTypes[0]);

  useEffect(() => {
    setFileType(fileTypes[0]);
  }, [fileTypes]);

  return (
    <>
      <Dropdown
        name="Export File Type"
        inputs={fileTypes}
        selected={fileType}
        setSelected={setFileType}
      />

      <Button
        className="mt-2"
        name="Export"
        click={() => {
          saveAs(
            `api/dot/export?scenario=${scenario.parameter}&model=${model.parameter}&edgelabel=${edgeLabel}&colorstartend=${colorStartEnd}&noise=${noise}&filetype=${fileType.parameter}`,
            `${scenario.parameter}.${fileType.parameter}`
          );
        }}
      />
    </>
  );
};

export default Sidebar;
