import React from 'react';
import Carrousel from '../components/Carrousel';
import HotelDetail from '../components/HotelDetail';
import HotelList from '../components/HotelList';
import './../css/home.scss'

const Home = () => {


    // function getWindowDimensions() {
    //     const { innerWidth: width, innerHeight: height } = window;
    //     return {
    //       width,
    //       height
    //     };
    //   }

    //   export default function useWindowDimensions() {
    //     const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    //     useEffect(() => {
    //       function handleResize() {
    //         setWindowDimensions(getWindowDimensions());
    //       }

    //       window.addEventListener('resize', handleResize);
    //       return () => window.removeEventListener('resize', handleResize);
    //     }, []);

    //     return windowDimensions;
    //   }

    return (
        <div className="Home-main">
            <Carrousel></Carrousel>
            <div className="Home-hotel">
                <HotelList Horizontal={""}></HotelList>
                <HotelDetail></HotelDetail>
            </div>
        </div>
    );
}

export default Home;




