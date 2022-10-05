from enum import Enum


class FileType(str, Enum):
    BPMN = "bpmn"
    PNG = "png"
    SVG = "svg"
    PDF = "pdf"

    def __str__(self):
        return self.value
