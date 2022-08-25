import React from "react";
import { Link } from "react-router-dom";
import videoBg from '../Assets/backgroundDog.mp4'
import imgLanding from '../Assets/imgLandingPage.png';
import './LandingPage.css'

function LandingPage(){
    return (
        <>
        <div className="container">
            <div className="container_content"> 
                <div className="container_content_inner">
                    <div className="title">
                        <h1>Dogs</h1>
                    </div>
                    <div className="par">
                        <p>
                        Find your favorite dog, 
                        observe its characteristics and create the one you like best.
                        </p>
                    </div>
                    <div className="btns">
                    <Link to='/home'>
                        <button className="btns">see more</button>
                    </Link>
                    </div>
                </div>
            </div>
            <div className="container_outer_img">
                <div className="img-inner">
                    <img
                        src={imgLanding}
                        alt=""
                        className="container_img"
                    />
                </div>
            </div>
        </div>
        <div className="overlay">
            <video src={videoBg} muted loop autoPlay></video>
        </div>
        </>
    )
}

export default LandingPage;



{/* <div className='conteiner'>
            <video src={videoBg} muted loop autoPlay></video>
            <div className='content'>
                <img src={imgLogo} alt='logoPokemon' />
                <h1>Dogs</h1>
                <Link to='/home'>
                    <button>ingresar</button>
                </Link>
            </div>
        </div> */}