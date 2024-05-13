import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import { Link } from 'react-router-dom';

function HotBook(data, rates) {
    const options = {
        items: 4,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        loop: true,
        startPosition: 1,
    };

    return (
        <div className="mx-48 mb-4 items-center justify-center border-white rounded-lg bg-white ">
            <div className='mt-10 px-4 border border-white border-b-0  rounded-lg bg-white'>
                <div className=' w-full flex justify-between'>
                    <h3 className='p-3 items-start text-center'>Sách hot</h3>
                    <a href='/books' className='p-3 items-start text-center text-orange-500 text-sm cursor-pointer font-medium'>Xem tất cả</a>
                </div>
            </div>
            <div className='px-4 pb-4 border-white border-t-0 rounded-lg border bg-white'>
                <OwlCarousel options={options} >
                    {data.map((item, index) => {
                        return (
                            <div className='h-80 mx-3 border border-gray-200' key={item.id} >
                                <div className='relative w-full'>
                                    <Link to={"/details/" + item.id}>
                                        <img className='h-80 cursor-pointer' src={item?.image ? item?.image : "avatarBook.jpg"} alt={"book " + item.id} />
                                        {!item?.image && <div className='-mt-44 font-semibold flex text-center justify-center w-full'>
                                            <p>{item?.title}</p>
                                        </div>}
                                        <div className='bg-red-500 cursor-pointer p-2 absolute rounded-md top-2 left-2 text-white'>
                                            {rates.map((rate) => {
                                                if (rate.id === index + 1) {
                                                    return (
                                                        <span className='' key={rate.id}>
                                                            {rate.rate ? rate.rate : 0}/5
                                                        </span>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>
                                        {/* <div className='flex opacity-70 cursor-pointer h-14 justify-center items-center text-red-800 bg-gray-50 w-full text-center absolute bottom-0 font-bold'>
                                            {item.title}
                                        </div> */}
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </OwlCarousel>
            </div>
        </div>
    );
}

export default HotBook;
