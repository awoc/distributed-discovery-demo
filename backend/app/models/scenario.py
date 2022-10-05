from enum import Enum


class Scenario(str, Enum):
    send_receive = "send_receive"
    choice = "choice"
    one_from_many = "one_from_many"
    one_to_many = "one_to_many"
    one_to_many_send = "one_to_many_send"
    stream = "stream"
    supply_chain = "supply_chain"
    healthcare = "healthcare"
    thermostat = "thermostat"
    travel_agency = "travel_agency"
    zoo = "zoo"
