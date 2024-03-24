import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';

function HotBook(data, rates) {
    const options = {
        items: 4,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        loop: true, 
    };

    return (
        <div className="mx-48 mb-4 items-center justify-center border-white rounded-lg bg-white shadow-md">
            <div className='mt-10 px-4 border border-white border-b-0  rounded-lg bg-white'>
                    <div className=' w-full flex justify-between'>
                        <h3 className='p-3 items-start text-center'>Sach moi</h3>
                        <a href='/books' className='p-3 items-start text-center text-orange-500 text-sm font-serif cursor-pointer'>Xem tat ca</a>
                </div>
            </div>
            <div className='border px-4 pb-4 border-white border-t-0 rounded-lg bg-white  shadow-md'>
            <OwlCarousel options={options}>
                {data.map((item) => (
                    <div className='h-80 mx-3' key={item.id}>
                        <div className='h-80 relative '>
                            <img className='h-80 cursor-pointer' src={item.img} alt="" />
                            <div className='bg-red-500 p-2 absolute rounded-md top-2 left-2 text-white'>
                                {rates.map((rate) => {
                                    if (rate.id === item.id) {
                                        return (
                                            <span className='cursor-pointer' key={rate.id}>
                                                {rate.rate}/5
                                            </span>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                            <div className='cursor-pointer bg-yellow-500 w-full text-center absolute bottom-2 font-bold text-white'>
                                {item.title}
                            </div>
                        </div>
                    </div>
                ))}
            </OwlCarousel>
            </div>
        </div>
    );
}

export default HotBook;
