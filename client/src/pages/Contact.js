import React from 'react'
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import MapComponent from '../components/MapComponent';

const Contact = () => {
    return (
        <div className='contactPage'>
            <div className='contactDiv'>
                <h1>Kontakt</h1>

                <div className='contactInfo'>
                    <h3>Telefon:</h3>
                    <p>32424242</p>
                    <h3>E-mail:</h3>
                    <p>speakAndSpell@gmail.com</p>
                    <h3>Adresa:</h3>
                    <p>9 Josipa Sladea, Niksic 81400, Crna Gora</p>
                    <h3>Broj žiro računa:</h3>
                    <p>32424242</p>
                </div>

                <div>
                    <h3>Društvene mreže:</h3>
                    <a href='https://www.facebook.com/speakandspellnk/?locale=sr_RS' target="_blank"> <FaFacebook size={40} color="#3b5998" /> </a>
                    <a href='https://www.instagram.com/speakandspellnk/'> <FaInstagram size={40} color="#E1306C" /> </a>
                </div>
            </div>
            <div className='map'>
                <h3>Naša lokacija:</h3>
                <MapComponent />
            </div>
        </div>
    )
}

export default Contact
