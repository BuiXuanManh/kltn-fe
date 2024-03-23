import { useRef } from 'react';
import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';

function HotBook( data ) {
    const options = {
        items: 4,
        rewind: true,
        autoplay: true,
    };
    const owlCarouselRef = useRef();
    const events = {
        onDragged: function (event) {

        },
        onChanged: function (event) {

        }
    };
    return (
        <div className="mx-48 max-h-52 border items-center justify-center border-white rounded-lg bg-white shadow-md">
            <OwlCarousel ref={owlCarouselRef} options={options} events={events} >
                {data.map((i)=>{
                    return(
                        <div className='w-24 h-32 ml-2' key={i.id}><img className='w-24 h-32' src={i.img} alt="" /></div>
                    )
                })}
            </OwlCarousel>
        </div>
    );
}

export default HotBook;
