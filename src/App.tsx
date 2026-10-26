import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ParkingAvailability from "./pages/ParkingAvailability";
import CheckAvailability from "./pages/CheckAvailability";

import "./App.css";

function App() {

    const [currentPage, setCurrentPage] =
        useState("dashboard");

    return (
        <>
            <Navbar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            {currentPage === "dashboard" && (
                <Home
                    setCurrentPage={setCurrentPage}
                />
            )}

            {currentPage === "parking" && (
                <ParkingAvailability />
            )}

            {currentPage === "check" && (
                <CheckAvailability />
            )}
        </>
    );
}

export default App;