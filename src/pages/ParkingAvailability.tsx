import { useEffect, useState } from "react";

type ParkingArea = {
    id: number;
    name: string;
    totalSlots: number;
    vehiclesParked: number;
};

type XmlArea = {
    id: string[];
    name: string[];
    openingTime: string[];
    closingTime: string[];
};

function ParkingAvailability() {

    const [areas, setAreas] = useState<ParkingArea[]>([]);
    const [xmlAreas, setXmlAreas] = useState<XmlArea[]>([]);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");


    // Get parking data from JSON
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


        // Get timing data from XML
        fetch("http://localhost:5000/api/parking/xml")
            .then((response) => response.json())
            .then((data) => {
                setXmlAreas(
                    data.parkingInformation.area
                );
            })
            .catch((error) => {
                console.error(
                    "Error fetching XML data:",
                    error
                );
            });

    }, []);


    // Calculate status
    const getStatus = (area: ParkingArea) => {

        const available =
            area.totalSlots - area.vehiclesParked;

        if (available === 0) {
            return "Full";
        }

        if (available <= 10) {
            return "Limited";
        }

        return "Available";
    };


    // Search and filter
    const filteredAreas = areas.filter((area) => {

        const matchesSearch =
            area.name
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesFilter =
            filter === "All" ||
            getStatus(area) === filter;

        return matchesSearch && matchesFilter;
    });


    // Find XML information
    const getXmlArea = (areaId: number) => {

        return xmlAreas.find(
            (xmlArea) =>
                xmlArea.id[0] === areaId.toString()
        );
    };


    return (
        <div className="parking-page">


            {/* Header */}

            <div className="parking-header">

                <p className="small-title">
                    PARKING AVAILABILITY
                </p>

                <h1>
                    Parking Availability
                </h1>

                <p>
                    View the current parking information
                    for different parking areas.
                </p>

            </div>


            <div className="parking-container">


                {/* Search and Filter */}

                <div className="search-filter">

                    <input
                        type="text"
                        placeholder="Search parking area..."
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                    />


                    <select
                        value={filter}
                        onChange={(event) =>
                            setFilter(event.target.value)
                        }
                    >

                        <option value="All">
                            All
                        </option>

                        <option value="Available">
                            Available
                        </option>

                        <option value="Limited">
                            Limited
                        </option>

                        <option value="Full">
                            Full
                        </option>

                    </select>

                </div>


                {/* Parking Cards */}

                <div className="parking-list">

                    {filteredAreas.map((area) => {

                        const available =
                            area.totalSlots -
                            area.vehiclesParked;

                        const areaStatus =
                            getStatus(area);

                        const xmlArea =
                            getXmlArea(area.id);


                        return (

                            <div
                                className="parking-card"
                                key={area.id}
                            >

                                <h3>
                                    {area.name}
                                </h3>


                                <p>
                                    Total Slots:{" "}
                                    {area.totalSlots}
                                </p>


                                <p>
                                    Vehicles Parked:{" "}
                                    {area.vehiclesParked}
                                </p>


                                <p>
                                    Available Slots:{" "}
                                    {available}
                                </p>


                                {xmlArea && (
                                    <>
                                        <p>
                                            Opening Time:{" "}
                                            {xmlArea.openingTime[0]}
                                        </p>

                                        <p>
                                            Closing Time:{" "}
                                            {xmlArea.closingTime[0]}
                                        </p>
                                    </>
                                )}


                                <span
                                    className={`card-status ${areaStatus.toLowerCase()}`}
                                >
                                    {areaStatus}
                                </span>

                            </div>

                        );

                    })}


                    {filteredAreas.length === 0 && (

                        <p>
                            No parking areas found.
                        </p>

                    )}

                </div>

            </div>

        </div>
    );
}

export default ParkingAvailability;