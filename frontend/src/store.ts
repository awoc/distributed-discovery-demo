import create from 'zustand';
import { DropdownInput, models, scenarios } from './models/DropdownInput';

interface Store {
  model: DropdownInput;
  scenario: DropdownInput;
  edgeLabel: boolean;
  colorStartEnd: boolean;
  noise: number;
  dot: string;
  setModel: (model: DropdownInput) => void;
  setScenario: (scenario: DropdownInput) => void;
  setEdgeLabel: (edgeLabel: boolean) => void;
  setColorStartEnd: (colorStartEnd: boolean) => void;
  setNoise: (noise: number) => void;
  fetchDot: () => void;
}

export const useStore = create<Store>((set, get) => ({
  model: models[0],
  scenario: scenarios[0],
  edgeLabel: false,
  colorStartEnd: true,
  noise: 0,
  dot: 'Graph { }',
  setModel: (model) => set((state) => ({ ...state, model: model })),
  setScenario: (scenario) => set((state) => ({ ...state, scenario: scenario })),
  setEdgeLabel: (edgeLabel) => set((state) => ({ ...state, edgeLabel: edgeLabel })),
  setColorStartEnd: (colorStartEnd) => set((state) => ({ ...state, colorStartEnd: colorStartEnd })),
  setNoise: (noise) => set((state) => ({ ...state, noise: noise })),
  fetchDot: async () => {
    const response = await fetch(
      `api/dot?scenario=${get().scenario.parameter}&model=${get().model.parameter}&edgelabel=${
        get().edgeLabel
      }&colorstartend=${get().colorStartEnd}&noise=${get().noise}`
    );

    const data = await response.json();
    set((state) => ({ ...state, dot: data.dot }));
  }
}));

// Fetch default image on start up
useStore.getState().fetchDot();
