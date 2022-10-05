import pathlib
from graphviz import Digraph, Graph

from app.models.model import Model
from app.models.scenario import Scenario

from distributed_discovery.util.read import read_xes
from distributed_discovery.objects.log import DistributedEventLog
from distributed_discovery.discovery.im import discover_process_tree
from distributed_discovery.conversion.petri_net import process_tree_to_petri_net
from distributed_discovery.visualization.petri_net import visualize_petri_net
from distributed_discovery.visualization.dfg import visualize_dfg
from distributed_discovery.discovery.dfg import discover_dfg, discover_performance_dfg
from distributed_discovery.conversion.bpmn import process_tree_to_bpmn
from distributed_discovery.visualization.bpmn import visualize_bpmn
from distributed_discovery.visualization.process_tree import visualize_process_tree
from distributed_discovery.export.bpmn import write_bpmn

resource_folder = f"{pathlib.Path(__file__).parent.resolve()}/../resources"

send_receive_log = read_xes(f"{resource_folder}/send-receive.xes")
choice = read_xes(f"{resource_folder}/choice.xes")
one_from_many = read_xes(f"{resource_folder}/one-from-many.xes")
one_to_many = read_xes(f"{resource_folder}/one-to-many.xes")
one_to_many_send = read_xes(f"{resource_folder}/one-to-many-send.xes")
stream = read_xes(f"{resource_folder}/stream.xes")
supply_chain = read_xes(f"{resource_folder}/supply-chain.xes")
# Colliery datasets
healthcare = read_xes(f"{resource_folder}/healthcare.xes")
thermostat = read_xes(f"{resource_folder}/thermostat.xes")
travel_agency = read_xes(f"{resource_folder}/travel-agency.xes")
zoo = read_xes(f"{resource_folder}/zoo.xes")


def generate_petri_net(log: DistributedEventLog, noise: float) -> Digraph:
    """
    Discovers a petri net as a Graphviz Digraph from a distributed event log.

    Parameters
    ----------
    log
        A distributed event log.
    noise
        Noise threshold.

    Returns
    -------
    dot
        Discovered petri net.
    """
    process_tree, sent_messages_per_participant = discover_process_tree(log, noise)
    petri_nets, message_petri_net_per_participant = process_tree_to_petri_net(
        process_tree
    )

    return visualize_petri_net(
        petri_nets,
        message_petri_net_per_participant,
        sent_messages_per_participant,
        background_color="transparent",
    )


def generate_dfg_frequency(log: DistributedEventLog) -> Digraph:
    """
    Discovers a frequency directly-follows graph as a Graphviz Digraph from a distributed event log.

    Parameters
    ----------
    log
        A distributed event log.

    Returns
    -------
    dot
        Discovered directly-follows graph.
    """
    dfg = discover_dfg(log)

    return visualize_dfg(dfg, background_color="transparent")


def generate_dfg_performance(log: DistributedEventLog) -> Digraph:
    """
    Discovers a directly-follows graph as a Graphviz Digraph from a distributed event log.

    Parameters
    ----------
    log
        A distributed event log.

    Returns
    -------
    dot
        Discovered directly-follows graph.
    """
    dfg = discover_performance_dfg(log)

    return visualize_dfg(dfg, background_color="transparent")


def generate_bpmn(
    log: DistributedEventLog,
    show_message_label: bool,
    color_start_end_events: bool,
    noise: float,
    is_export: bool,
) -> Digraph:
    """
    Discovers a BPMN models as a Graphviz Digraph from a distributed event log.

    Parameters
    ----------
    log
        A distributed event log.
    show_message_label
        Displays edge labels for message activities.
    color_start_end_events
        Colorizes start and end events in BPMN graphs.
    noise
        Noise threshold.
    is_export
        Signals if model is used for export for correct asset directory path.

    Returns
    -------
    dot
        Discovered BPMN models.
    """
    process_tree, sent_messages_per_participant = discover_process_tree(log, noise)
    bpmns, message_bpmn = process_tree_to_bpmn(process_tree)

    # Location in Docker container
    asset_dir = None if is_export else "/api/static"

    return visualize_bpmn(
        bpmns,
        message_bpmn,
        sent_messages_per_participant,
        background_color="transparent",
        assets_dir=asset_dir,
        show_message_label=show_message_label,
        color_start_end_events=color_start_end_events,
    )


def generate_process_tree(log: DistributedEventLog, noise: float) -> Graph:
    """
    Discovers a process tree as a Graphviz Graph from a distributed event log.

    Parameters
    ----------
    log
        A distributed event log.
    noise
        Noise threshold.

    Returns
    -------
    dot
        Discovered process tree.
    """
    process_tree, _ = discover_process_tree(log, noise)

    return visualize_process_tree(process_tree, background_color="transparent")


def get_log(scenario: Scenario) -> DistributedEventLog:
    """
    Matches a scenario to the DistributedEventLog object.

    Parameters
    ----------
    scenario
        Pre-defined scenario.

    Returns
    -------
    log
        A distributed event log.
    """
    match scenario:
        case Scenario.send_receive:
            return send_receive_log
        case Scenario.stream:
            return stream
        case Scenario.one_to_many_send:
            return one_to_many_send
        case Scenario.one_to_many:
            return one_to_many
        case Scenario.one_from_many:
            return one_from_many
        case Scenario.choice:
            return choice
        case Scenario.supply_chain:
            return supply_chain
        case Scenario.healthcare:
            return healthcare
        case Scenario.thermostat:
            return thermostat
        case Scenario.travel_agency:
            return travel_agency
        case Scenario.zoo:
            return zoo


def generate_dot(
    log: DistributedEventLog,
    model: Model,
    bpmn_edge_label: bool,
    bpmn_start_end: bool,
    noise: float,
    is_export: bool,
) -> Digraph | Graph:
    """
    Delegates process discovery.

    Parameters
    ----------
    log
        A distributed event log.
    model
        The models type that is discovered.
    bpmn_edge_label
        Displays edge labels for message activities in BPMN graphs.
    bpmn_start_end
        Colorizes start and end events in BPMN graphs.
    noise
        Noise threshold.
    is_export
        Signals if model is used for export.

    Returns
    -------
    dot
        Discovered Graphviz object.
    """
    match model:
        case Model.petri_net:
            return generate_petri_net(log, noise)
        case Model.dfg_frequency:
            return generate_dfg_frequency(log)
        case Model.dfg_performance:
            return generate_dfg_performance(log)
        case Model.bpmn:
            return generate_bpmn(log, bpmn_edge_label, bpmn_start_end, noise, is_export)
        case Model.process_tree:
            return generate_process_tree(log, noise)


def discover_model(
    scenario: Scenario,
    model: Model,
    bpmn_edge_label: bool,
    bpmn_start_end: bool,
    noise: float,
    is_export: bool,
) -> Digraph | Graph:
    """
    Discovers a process models from a scenario.

    Parameters
    ----------
    scenario
        Pre-defined scenario.
    model
        The models type that is discovered.
    bpmn_edge_label
        Displays edge labels for message activities in BPMN graphs.
    bpmn_start_end
        Colorizes start and end events in BPMN graphs.
    noise
        The noise threshold.
    is_export
        Signals if model is used for export.

    Returns
    -------
    source
        The generated Graph.
    """
    log = get_log(scenario)
    return generate_dot(log, model, bpmn_edge_label, bpmn_start_end, noise, is_export)


def generate_bpmn_file(
    scenario: Scenario,
    noise: float,
    file_path: str,
) -> None:
    """
    Writes a collaboration diagram to a BPMN file.

    Parameters
    ----------
    scenario
        Pre-defined scenario.
    noise
        The noise threshold.
    file_path
        File path of the BPMN file.
    Returns
    -------

    """
    log = get_log(scenario)
    process_tree, sent_messages_per_participant = discover_process_tree(log, noise)
    bpmns, message_bpmn = process_tree_to_bpmn(process_tree)

    write_bpmn(file_path, bpmns, message_bpmn, sent_messages_per_participant)
