import { useEffect, useState } from "react";

type ParkingArea = {
    id: number;
    name: string;
    totalSlots: number;
    vehiclesParked: number;
};

function CheckAvailability() {

    const [areas, setAreas] = useState<ParkingArea[]>([]);

    const [selectedArea, setSelectedArea] = useState("");
    const [vehicles, setVehicles] = useState("");

    const [availableSlots, setAvailableSlots] =
        useState<number | null>(null);

    const [status, setStatus] = useState("");


    // Get parking data from backend
    useEffect(() => {

        fetch("http://localhost:5000/api/parking")
            .then((response) => response.json())
            .then((data) => {
                setAreas(data.areas);
            })
            .catch((error) => {
                console.error(
                    "Error fetching parking data:",
                    error
                );
            });

    }, []);


    // Check availability
    const checkAvailability = () => {

        if (selectedArea === "") {
            alert("Please select a parking area.");
            return;
        }

        if (vehicles === "") {
            alert("Please enter the number of vehicles.");
            return;
        }

        const vehicleCount = Number(vehicles);

        if (vehicleCount < 0) {
            alert(
                "Number of vehicles cannot be negative."
            );
            return;
        }

        const selectedParkingArea = areas.find(
            (area) => area.name === selectedArea
        );

        if (!selectedParkingArea) {
            return;
        }

        if (
            vehicleCount >
            selectedParkingArea.totalSlots
        ) {
            alert(
                "Number of vehicles cannot be greater than total parking slots."
            );
            return;
        }


        // Available Slots = Total Slots - Vehicles
        const available =
            selectedParkingArea.totalSlots -
            vehicleCount;

        setAvailableSlots(available);


        // Determine parking status
        if (available === 0) {
            setStatus("Full");
        }
        else if (available <= 10) {
            setStatus("Limited");
        }
        else {
            setStatus("Available");
        }
    };


    // Reset
    const resetForm = () => {

        setSelectedArea("");
        setVehicles("");
        setAvailableSlots(null);
        setStatus("");
    };


    const selectedParkingArea = areas.find(
        (area) => area.name === selectedArea
    );


    return (
        <div className="parking-page">

            <div className="parking-header">

                <p className="small-title">
                    CHECK AVAILABILITY
                </p>

                <h1>
                    Check Parking Availability
                </h1>

                <p>
                    Select a parking area and enter the
                    number of vehicles to calculate
                    the available parking spaces.
                </p>

            </div>


            <div className="parking-container">


                {/* Check Form */}

                <div className="check-box">

                    <h2>
                        Enter Parking Details
                    </h2>


                    <label>
                        Select Parking Area
                    </label>


                    <select
                        value={selectedArea}
                        onChange={(event) => {

                            setSelectedArea(
                                event.target.value
                            );

                            setAvailableSlots(null);
                            setStatus("");
                        }}
                    >

                        <option value="">
                            Select an area
                        </option>

                        {areas.map((area) => (

                            <option
                                key={area.id}
                                value={area.name}
                            >
                                {area.name}
                            </option>

                        ))}

                    </select>


                    <label>
                        Number of Vehicles
                    </label>


                    <input
                        type="number"
                        min="0"
                        value={vehicles}
                        onChange={(event) =>
                            setVehicles(
                                event.target.value
                            )
                        }
                        placeholder="Enter number of vehicles"
                    />


                    <div className="button-group">

                        <button
                            className="check-button"
                            onClick={checkAvailability}
                        >
                            Check Availability
                        </button>


                        <button
                            className="reset-button"
                            onClick={resetForm}
                        >
                            Reset
                        </button>

                    </div>

                </div>


                {/* Result */}

                {selectedParkingArea && (

                    <div className="result-card">

                        <h2>
                            {selectedParkingArea.name}
                        </h2>


                        <div className="result-details">

                            <div>

                                <span>
                                    Total Slots
                                </span>

                                <strong>
                                    {
                                        selectedParkingArea
                                            .totalSlots
                                    }
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Vehicles Entered
                                </span>

                                <strong>
                                    {vehicles || 0}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Available Slots
                                </span>

                                <strong>
                                    {
                                        availableSlots !== null
                                            ? availableSlots
                                            : "-"
                                    }
                                </strong>

                            </div>

                        </div>


                        {/* Status */}

                        {status && (

                            <div
                                className={`status-box ${status.toLowerCase()}`}
                            >

                                <span>
                                    Parking Status
                                </span>

                                <strong>
                                    {status}
                                </strong>

                            </div>

                        )}

                    </div>

                )}

            </div>

        </div>
    );
}

export default CheckAvailability;