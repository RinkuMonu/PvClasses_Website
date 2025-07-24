import React from 'react'
import { FiSearch } from 'react-icons/fi'

export default function CallToAction() {
    return (
        <>
            <section className="call-to-action-section">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="title-column col-lg-6 col-md-12 col-sm-12">
                            <div className="inner-column">
                                <div className="sec-title">
                                    <h2>
                                        Live the experience <br /> learn at your own pace
                                    </h2>
                                    <div className="text">
                                        Replenish him third creature and meat blessed void a fruit
                                        gathered you’re, they’re two waters.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-column col-lg-6 col-md-12 col-sm-12">
                            <div className="inner-column">
                                <div className="help">For Help?</div>
                                <div className="search-box">
                                    <form method="post" action="/contact">
                                        <div className="form-group">
                                            <input
                                                type="search"
                                                name="search-field"
                                                placeholder="What do you want to learn?"
                                                required
                                            />
                                            <button type="submit">
                                                <span className="icon ">
                                                    <FiSearch />
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
