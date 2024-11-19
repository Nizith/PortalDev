import React from "react";
import SLT_Logo from './logo.svg';

export default function LoadingAnimation() {
    return (
        <div className="bg-slate-800 h-screen flex items-center justify-center">
            <img src={SLT_Logo} alt="" />
            <div className="animate-spin rounded-full size-10 mt-7 ml-5 border-8 border-t-indigo-500">
            </div>
        </div>
    );
}


// const [loading, setLoading] = useState(true);

//         // Simulate minimum 2-second loading time
//         const delay = new Promise((resolve) => setTimeout(resolve, 1000));

//         // Wait for both data fetch and 2 seconds delay
//         await Promise.all([delay, response]);

//         finally {
//             setLoading(false); // Stop the loading animation after both conditions are met
//           }

//           {loading ? (
//             <>
//               <LoadingAnimation />
//             </>
//           ) : ()}
