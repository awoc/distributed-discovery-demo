import '../styles/Sidebar.css';
import { models, scenarios } from '../models/DropdownInput';
import Button from './Button';
import Dropdown from './Dropdown';
import { useStore } from './../store';
import shallow from 'zustand/shallow';

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
      <Button className="mt-2" name="View" click={fetchDot} />
    </div>
  );
};

export default Sidebar;
