import OwlCarousel from 'react-owl-carousel2';
import 'react-owl-carousel2/lib/styles.css';
import { Link } from 'react-router-dom';

function HotBook(data) {
    const options = {
        items: 4,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        loop: true,
        startPosition: 1,
    };
    console.log(data)

    return (
        <div className="mx-48 mb-4 items-center justify-center border-white rounded-lg bg-white ">
            <div className='mt-10 px-4 border border-white border-b-0  rounded-lg bg-white'>
                <div className=' w-full flex justify-between'>
                    <h3 className='p-3 items-start text-center'>Sách hot</h3>
                    <Link to='/1/search/read/' className='p-3 items-start text-center text-orange-500 text-sm cursor-pointer font-medium'>Xem tất cả</Link>
                </div>
            </div>
            <div className='px-4 pb-4 border-white border-t-0 rounded-lg border bg-white'>
                {data?.content?.length > 0 && <OwlCarousel options={options} >
                    {data?.content?.map((item, index) => {
                        return (
                            <div className='h-80 mx-3 border border-gray-200' key={index} >
                                <div className='relative w-full'>
                                    <Link to={"/details/" + item?.book.id}>
                                        <img className='h-80 cursor-pointer' src={item?.book?.image ? item?.book?.image : "avatarBook.jpg"} alt={"book " + item?.book?.id} />
                                        {!item?.book?.image && <div className='-mt-44 font-semibold flex text-center justify-center w-full'>
                                            <p>{item?.book?.title}</p>
                                        </div>}
                                        <div className='bg-red-500 cursor-pointer p-2 absolute rounded-md top-2 left-2 text-white'>
                                            <span className=''>
                                                {item?.rate ? item.rate : 0}/5
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </OwlCarousel>
                }
            </div>
        </div>
    );
}

export default HotBook;
