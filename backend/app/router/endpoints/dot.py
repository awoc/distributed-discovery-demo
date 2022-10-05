import os
from tempfile import NamedTemporaryFile

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from starlette.background import BackgroundTask, BackgroundTasks

from app.models.file_type import FileType
from app.models.model import Model
from app.models.scenario import Scenario
from app.services.discovery import discover_model, generate_bpmn_file


router = APIRouter()


@router.get("")
async def discover_scenario(
    scenario: Scenario, model: Model, edgelabel: bool, colorstartend: bool, noise: float
) -> dict[str, str]:
    """
    Discovers a scenario of a distributed event log as a process model
    and returns the DOT representation.

    Parameters
    ----------
    scenario
        The Event log scenario.
    model
        A process model representation.
    edgelabel
        Displays edge labels for message activities in BPMN graphs.
    colorstartend
        Colorizes start and end events in BPMN graphs.
    noise
        Noise threshold.

    Returns
    -------
    dot
        The DOT code.
    """
    return {
        "dot": discover_model(
            scenario, model, edgelabel, colorstartend, noise, False
        ).source
    }


def cleanup(file_path: str):
    os.unlink(file_path)


@router.get("/export")
async def export_scenario(
    scenario: Scenario,
    model: Model,
    edgelabel: bool,
    colorstartend: bool,
    noise: float,
    filetype: FileType,
    background_tasks: BackgroundTasks,
):
    """
    Discovers a scenario of a distributed event log as a process model
    and returns a file.

    Parameters
    ----------
    scenario
        The Event log scenario.
    model
        A process model representation.
    edgelabel
        Displays edge labels for message activities in BPMN graphs.
    colorstartend
        Colorizes start and end events in BPMN graphs.
    noise
        The noise threshold.
    filetype
        The file type of the output file.
    background_tasks
        Used to delete temporary files.

    Returns
    -------
    dot
        The DOT code.
    """
    if filetype == FileType.BPMN and model == Model.bpmn:
        with NamedTemporaryFile(suffix=".bpmn", delete=False) as file:
            generate_bpmn_file(scenario, noise, file.name)

            background_tasks.add_task(cleanup, file.name)
            return FileResponse(
                file.name,
            )

    elif filetype == FileType.BPMN:
        raise HTTPException(status_code=404, detail="BPMN output only for BPMN models")

    dot = discover_model(scenario, model, edgelabel, colorstartend, noise, True)

    with NamedTemporaryFile() as file:
        file_path = dot.render(filename=file.name, format=filetype)

        return FileResponse(file_path)
