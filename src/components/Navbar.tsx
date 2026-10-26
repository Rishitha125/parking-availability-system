type NavbarProps = {
    currentPage: string;
    setCurrentPage: (page: string) => void;
};

function Navbar({ currentPage, setCurrentPage }: NavbarProps) {

    return (
        <nav className="navbar">

            <div className="navbar-logo">
                Parking System
            </div>

            <div className="navbar-links">

                <button
                    className={currentPage === "dashboard" ? "active" : ""}
                    onClick={() => setCurrentPage("dashboard")}
                >
                    Dashboard
                </button>

                <button
                    className={currentPage === "parking" ? "active" : ""}
                    onClick={() => setCurrentPage("parking")}
                >
                    Parking Availability
                </button>

                <button
                    className={currentPage === "check" ? "active" : ""}
                    onClick={() => setCurrentPage("check")}
                >
                    Check Availability
                </button>

            </div>

        </nav>
    );
}

export default Navbar;