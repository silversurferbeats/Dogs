import React from "react";
import { Link } from "react-router-dom";
import videoBg from '../Assets/backgroundDog.mp4'
import imgLanding from '../Assets/imgLandingPage.png';
import imgLanding2 from '../Assets/imgLandingPage2.png';
import imgLanding3 from '../Assets/imgLandingPage3.png';
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
                        <p className="textLanding">
                        Find your favorite dog, 
                        check its characteristics and create the one you like best.
                        </p>
                    </div>
                    <div className="btns">
                        <Link to='/home' className="btns">
                            <button className="btns_more">see more</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container_outer_img">
                {/* <div className="img-inner">
                    <img
                        src={imgLanding}
                        alt=""
                        className="container_img"
                    />
                </div> */}

                <div className="container__slider">

                    <div className="container__content">
                        <input className="input__content" type="radio" name="slider" id="item-1" checked />
                        <input className="input__content" type="radio" name="slider" id="item-2"/>
                        <input className="input__content" type="radio" name="slider" id="item-3"/>

                        <div class="cards__slider">
                            <label className="card__slider" for="item-1" id="selector-1" >
                                <img className="img__slider" src={imgLanding2} alt="" />
                            </label>
                            <label className="card__slider" for="item-2" id="selector-2">
                                <img className="img__slider" src={imgLanding} alt="" />
                            </label>
                            <label className="card__slider" for="item-3" id="selector-3">
                                <img className="img__slider" src={imgLanding3} alt="" />
                            </label>

                        </div>
                    </div>

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