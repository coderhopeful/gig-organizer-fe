import React from 'react'
import { useState, useEffect } from 'react';
import { Row,Col } from 'react-bootstrap'
import "./home.css"
import Dropdown from 'react-bootstrap/Dropdown';
import logo from "../images/logo.png"
import clock from "../images/clock.png"
import dashboard from "../images/dashboard.png"
import user from "../images/user.png"
import gigs from "../images/gigs.png"
import training from "../images/training.png"
import bell from "../images/bell.png"
import profile from "../images/profile.png"
import grid from "../images/grid.png"
import name from "../images/name.png"
import budget from "../images/budget.png"
import calender from "../images/calender.png"
import axios from 'axios'


const Home = () => {

    const[display,setDisplay]= useState([])
    const[card,setCard]= useState([])
   
    useEffect(() => {
        const gigsList = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/gigs')
                
            
                setCard(res.data)
            } catch (err) {
                console.log(err);
            }

            
        }
        gigsList();
    }, [])



   

    const openGigs = () => {
        const arr= card.filter((i)=>i.status=="Open")
        setDisplay(arr)
    }
    const allGigs = () => {
       
        setDisplay(card)
    }
    const completeGigs = () => {
        const arr= card.filter((i)=>i.status=="Complete")
        setDisplay(arr)
    }
    const cancelledGigs = () => {
        const arr= card.filter((i)=>i.status=="Cancelled")
        setDisplay(arr)
    }

    const searchGig=(e)=> {

        handleSearch(e.target.value)

    }

    const handleSearch=(e)=>{
        const arr= card.filter((i)=>i.name==e)
        setDisplay(arr)
    }

    return (
        
        <>
            <div className="wrapper">
                <div className="sidebar">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="icons">
                        <img src={dashboard} alt="dashboard-icon" />
                        <img src={gigs} alt="gig-icon" />
                        <img src={training} alt="training-icon" />
                        <img src={clock} alt="clock-icon" />
                        <img src={user} alt="user-icon" />
                    </div>

                </div>
                <div className="main">
                    <div className="header">
                        <img src={bell} alt="notification" className='notification' />
                        <img src={profile} alt="profile-picture" className='profile' />
                        <Dropdown className='profileName ps-0 ms-0 me-3'>
                            <Dropdown.Toggle variant="light" id="dropdown-basic" className='ps-0 ms-0'>
                                Santhosh
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>
                    <div className="main-content">
                        <div className="title">
                            <h5>Organization Gigs</h5>
                            <p>Manage your organization gigs here</p>
                        </div>
                        <div className="navbar">
                            <div className="status">
                                <span onClick={()=>allGigs()}>All</span>
                                <span onClick={()=>openGigs()}>Open</span>
                                <span onClick={()=>completeGigs()}>Completed</span>
                                <span onClick={()=>cancelledGigs()}>Cancelled</span>
                            </div>
                            <div className="search">
                                <select>
                                    <option value="#">Sort By</option>
                                </select>
                                <input type="text" placeholder='  Search by Gig name' onChange={searchGig}/>
                                <img src={grid} alt="grid-icon" />
                            </div>
                        </div>
                        <Row>
                        {display.map((i)=>
                        <Col sm={12} md={8} lg={6} xl={4}>
                        <div className="cards">
                            <div className="card">
                                <div className="gig">
                                    <img src={name} alt="gigname-icon" />
                                    <div className="gig-name">
                                        <h6>Gig Name</h6>
                                        <p>{i.name}</p>
                                    </div>
                                </div>
                                <div className="date">
                                    <img src={calender} alt="date-icon" />
                                    <div className="date-details">
                                        <h6>Required Date</h6>
                                        <p>{i.date}</p>
                                    </div>
                                </div>
                                <div className="budget">
                                    <img src={budget} alt="budget-icon" />
                                    <div className="budget-details">
                                        <h6>Total Budget</h6>
                                        <p>{i.budget}</p>
                                    </div>
                                </div>
                                <div className="status"></div>
                                <div className="resources">
                                    <h5>Total Resources</h5>
                                    <div className="res-status">
                                        <div className='required'>
                                            <span>Required</span>
                                            <p>{i.required}</p>
                                        </div>
                                        <div className='Hired'>
                                            <span>Hired</span>
                                            <p>{i.hired}</p>
                                        </div>
                                        <div className="Applicants">
                                            <span>Applicants</span>
                                            <p>{i.applicants}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        </Col>
)}
</Row>
                    </div>
                </div>
            </div>



        </>
        
    )
}

export default Home