import React, { useEffect} from "react";
import LandImg from "../../images/landimage2.jpg"
import {useNavigate} from 'react-router-dom'

export default function LandingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login'); // replace '/nextPage' with your target route
        }, 4000);

        return () => clearTimeout(timer); // Cleanup the timeout if the component unmounts
    }, [navigate]);
    return (
        <>
            <div className="w-screen h-screen relative"
            style={{
                backgroundImage: `url(${LandImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div className="absolute insert-0 flex justify-center items-center">
                    <div>
                        <h1 className="text-white font-serif font-bold text-9xl text-center mt-32 ml-20">MS<br/> Portal</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
