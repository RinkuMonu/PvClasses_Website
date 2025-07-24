"use client";
import React from "react";
import "@/app/styles/bootstrap.css";
import "@/app/styles/main.css";
import "@/app/styles/responsive.css";
import "@/app/styles/font-awesome.css";

function PageNotFound() {
  return (
    <div>
      <>
        <section className="page-title">
          <div className="auto-container">
            <h1>OOPS...!</h1>
          </div>
        </section>

        <div className="page404 my-5">
          <iframe src="https://lottie.host/embed/d139d2d7-2d65-44ac-9409-9904601aebf0/0e1Irr5PPN.lottie"></iframe>
        </div>
      </>
    </div>
  );
}

export default PageNotFound;
