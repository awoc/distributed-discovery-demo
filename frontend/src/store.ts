import create from 'zustand';
import { DropdownInput, models, scenarios } from './models/DropdownInput';
import { getProcessModel } from './process-models';

interface Store {
  model: DropdownInput;
  scenario: DropdownInput;
  dot: string;
  setModel: (model: DropdownInput) => void;
  setScenario: (scenario: DropdownInput) => void;
  fetchDot: () => void;
}

export const useStore = create<Store>((set, get) => ({
  model: models[0],
  scenario: scenarios[0],
  dot: 'Graph { }',
  setModel: (model) => set((state) => ({ ...state, model: model })),
  setScenario: (scenario) => set((state) => ({ ...state, scenario: scenario })),
  fetchDot: () => {
    const data = getProcessModel(get().scenario, get().model);
    set((state) => ({ ...state, dot: data }));
  }
}));

// Fetch default image on start up
useStore.getState().fetchDot();
