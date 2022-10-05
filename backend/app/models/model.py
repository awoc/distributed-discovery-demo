from enum import Enum


class Model(str, Enum):
    petri_net = "petri_net"
    bpmn = "bpmn"
    process_tree = "pt"
    dfg_frequency = "dfg_frequency"
    dfg_performance = "dfg_performance"
