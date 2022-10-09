export interface DropdownInput {
  id: number;
  name: string;
  parameter: string;
}

export const scenarios: DropdownInput[] = [
  {
    id: 1,
    name: 'Send/Receive',
    parameter: 'send_receive'
  },
  {
    id: 2,
    name: 'Choice',
    parameter: 'choice'
  },
  {
    id: 3,
    name: 'One-to-Many',
    parameter: 'one_to_many_send'
  },
  {
    id: 4,
    name: 'One-to-Many Send/Receive',
    parameter: 'one_to_many'
  },
  {
    id: 5,
    name: 'One-from-Many',
    parameter: 'one_from_many'
  },
  {
    id: 6,
    name: 'Stream',
    parameter: 'stream'
  },
  {
    id: 7,
    name: 'Supply Chain',
    parameter: 'supply_chain'
  },
  {
    id: 8,
    name: 'Healthcare',
    parameter: 'healthcare'
  },
  {
    id: 9,
    name: 'Travel Agency',
    parameter: 'travel_agency'
  },
  {
    id: 10,
    name: 'Thermostat',
    parameter: 'thermostat'
  },
  {
    id: 11,
    name: 'Zoo',
    parameter: 'zoo'
  }
];

export const models: DropdownInput[] = [
  {
    id: 1,
    name: 'Petri Net',
    parameter: 'petri_net'
  },
  {
    id: 2,
    name: 'Process Tree',
    parameter: 'pt'
  },
  {
    id: 3,
    name: 'DFG Frequency',
    parameter: 'dfg_frequency'
  },
  {
    id: 4,
    name: 'DFG Performance',
    parameter: 'dfg_performance'
  },
  {
    id: 5,
    name: 'BPMN',
    parameter: 'bpmn'
  }
];

export const fileTypesWithoutBPMN: DropdownInput[] = [
  {
    id: 1,
    name: 'PNG',
    parameter: 'png'
  },
  {
    id: 2,
    name: 'SVG',
    parameter: 'svg'
  },
  {
    id: 3,
    name: 'PDF',
    parameter: 'pdf'
  }
];

export const fileTypesWithBPMN: DropdownInput[] = [
  {
    id: 1,
    name: 'BPMN',
    parameter: 'bpmn'
  },
  {
    id: 2,
    name: 'PNG',
    parameter: 'png'
  },
  {
    id: 3,
    name: 'SVG',
    parameter: 'svg'
  },
  {
    id: 4,
    name: 'PDF',
    parameter: 'pdf'
  }
];
