import React from "react";
import { Link } from 'react-router-dom'
import Logo from '../assets/freetogame-logo.png'

export function Header() {
    return (
        <header className="py-6 mb-12 bg-[#64748b]">
            <div className="container mx-auto flex justify-center">
                <Link to='/'>
                    <img src={Logo} />
                </Link>
            </div>
        </header>
    )
}