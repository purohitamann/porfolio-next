'use client';
import React from 'react';
import { motion } from "framer-motion";
import ProjectBanner from '../components/ProjectBanner';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
export default function Home() {




    return (
        <>



            <div className="h-screen w-screen bg-white overflow-y-scroll">


                <div className="h-auto w-full mt-20 flex flex-col justify-center items-center ">
                    <ProjectBanner />
                    <ProjectBanner />
                    <ProjectBanner />
                    <ProjectBanner />
                    <ProjectBanner />
                    <ProjectBanner />
                </div>






            </div>
            {/* <div className="w-screen ">
                <Footer className='bottom-0 relative' />
            </div> */}

        </>
    );
}
