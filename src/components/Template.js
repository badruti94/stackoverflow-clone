import React from 'react'
import { Container } from 'reactstrap'
import Navbar from './CustomNavbar'
import Footer from './Footer'

const Template = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main style={{ backgroundColor: 'grey' }} >
                <Container className='pt-4 pb-4' >
                    {children}
                </Container>
            </main>
            <Footer />
        </div>
    )
}

export default Template