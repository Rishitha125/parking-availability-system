type HomeProps = {
    setCurrentPage: (page: string) => void;
};

function Home({ setCurrentPage }: HomeProps) {

    return (
        <div className="home-page">

            {/* Hero Section */}

            <section className="hero-section">

                <div className="hero-content">

                    <p className="small-title">
                        SMART PARKING SOLUTION
                    </p>

                    <h1>
                        Parking Availability System
                    </h1>

                    <p className="hero-text">
                        Find available parking spaces quickly
                        and easily. Check parking availability
                        across different areas and plan your
                        parking without unnecessary searching.
                    </p>

                    <button
                        className="check-button"
                        onClick={() =>
                            setCurrentPage("check")
                        }
                    >
                        Check Parking Availability
                    </button>

                </div>

            </section>


            {/* About Section */}

            <section className="about-section">

                <h2>
                    About the System
                </h2>

                <p>
                    The Parking Availability System helps users
                    check the availability of parking spaces in
                    different parking areas. Each parking area
                    has its own total slots and number of
                    vehicles parked.
                </p>


                <div className="info-cards">

                    <div className="info-card">

                        <h3>
                            Easy to Check
                        </h3>

                        <p>
                            Quickly view the current parking
                            availability of different areas.
                        </p>

                    </div>


                    <div className="info-card">

                        <h3>
                            Independent Areas
                        </h3>

                        <p>
                            Each parking area maintains its own
                            parking information.
                        </p>

                    </div>


                    <div className="info-card">

                        <h3>
                            Live Calculation
                        </h3>

                        <p>
                            Available slots are calculated using
                            total slots and vehicles entered.
                        </p>

                    </div>

                </div>


                {/* Navigation Buttons */}

                <div className="dashboard-buttons">

                    <button
                        className="check-button"
                        onClick={() =>
                            setCurrentPage("parking")
                        }
                    >
                        View Parking Areas
                    </button>


                    <button
                        className="reset-button"
                        onClick={() =>
                            setCurrentPage("check")
                        }
                    >
                        Check Availability
                    </button>

                </div>

            </section>

        </div>
    );
}

export default Home;