import React from 'react';
import Sidebar from "../../components/Sidebar/index.jsx";
import { Breadcrumbs, Typography, Link } from "@mui/material";


const ProductListing = () => {
    return (
        <section className="py-5">
            <div role="container " >
                <Breadcrumbs aria-label="breadcrumbs">

                    <Link underline="hover" color="inherit" href="/"
                        className="link transition">
                        Home
                    </Link>

                    <Link underline="hover"
                          color="inherit"
                          href="/material-ui/getting-started/installation/"
                          className="link">
                        Fashion
                    </Link>

                </Breadcrumbs>
            </div>

            <div className="bg-white py-2 mt-4">
                <div className="container flex gap-3">
                    <div className="sidebarWrapper w-[20%] h-full bg-white p-3">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductListing;