import Link from 'next/link'
import React from 'react'
import { LuChevronRight } from 'react-icons/lu'

function ReadyToStart() {
  return (
    <>
      <section
    className="call-to-action-section-two"
    style={{ backgroundImage: "url(images/background/3.png)" }}
>
    <div className="auto-container">
        <div className="content">
            <h2>Ready to get started?</h2>
            <div className="text">
                Replenish him third creature and meat blessed void a fruit gathered you’re, they’re two <br /> waters own
                morning gathered greater shall had behold had seed.
            </div>
            <div className="buttons-box">
                <Link href="/course" className="theme-btn btn-style-one">
                    <span className="txt">Get Stared <LuChevronRight  /></span>
                </Link>
                <Link href="/course" className="theme-btn btn-style-two">
                    <span className="txt">All Courses <LuChevronRight  /></span>
                </Link>
            </div>
        </div>
    </div>
</section>
    </>
  )
}

export default ReadyToStart
