import { Link } from "react-router-dom";
import IconGlobal from "../../../../icon/IconGlobal";

function NominatedBook(data) {
    let icon = new IconGlobal()
    return (
        <div>
            <div className='grid grid-cols-3 mt-10 mx-48 border border-white border-b-0 rounded-lg bg-white shadow-md'>
                <div className='px-4 grid grid-cols-1 col-span-2 w-full border border-gray-200'>
                    <div className='flex justify-between'>
                        <h3 className='p-3 items-start text-start'>Sách đề cử</h3>
                        <a href='/books' className='p-3 items-start text-start text-orange-500 text-sm cursor-pointer font-medium'>Xem tất cả</a>
                    </div>
                </div>
                <div className='px-4 grid grid-cols-1 w-full border border-gray-200'>
                    <div className='flex justify-between'>
                        <h3 className='p-3 items-start text-start'>Đang đọc</h3>
                        <a href='/books' className='p-3 items-start text-start text-orange-500 text-sm cursor-pointer font-medium'>Xem tất cả</a>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-3 mx-48 border border-white border-t-0 rounded-lg bg-white'>
                <div className=' grid grid-cols-2 col-span-2 gap-4 max-w-full justify-start'>
                    {data?.map((item) => {
                        return (
                            <div key={item.id} className='flex text-start w-full min-w-0 max-h-52 p-2 border border-gray-200'>
                                <div className='w-24 h-28 ml-2 cursor-pointer'>
                                    <Link to={`/details/${item?.id}`}>
                                        <img width="5rem" height="6rem" className='w-full h-full object-cover' src={item.image} alt='img book' />
                                    </Link>
                                </div>
                                <div className='ml-3 w-full'>
                                    <Link to={`/details/${item?.id}`}>
                                        <h3 className="cursor-pointer font-semibold hover:text-blue-500">{item.title}</h3>
                                    </Link>
                                    <div className="mt-2 flex-wrap w-60 flex items-center gap-1">
                                        <span className="line-clamp-3 ml-1">{item?.shortDescription}</span>
                                    </div>
                                    <div className='flex items-center justify-between  w-full mt-3'>

                                        <div className="flex max-w-28 items-center">
                                            <img src={icon?.icon?.author} className='w-5 h-5 mt-1' alt="" />
                                            
                                            <div className='flex truncate justify-center items-center'>
                                                <p className='ml-1 max-w-24 truncate'>{item?.authors[0]}</p>

                                            </div>
                                        </div>

                                        <div className='p-1 border border-tyellow text-orange-600 cursor-pointer'>{item.genres[0]}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className='grid grid-cols-1 gap-4 max-w-full items-start'>
                    {data?.map((item) => {
                        return (
                            <div key={item.id} className='flex text-start w-full mt-5 max-h-30 p-4 border border-gray-200'>
                                <div className='w-10 h-12'>
                                    <img className='w-full h-full cursor-pointer object-cover' src={item.image} width="2.5rem" height="3rem" alt='img book' />
                                </div>
                                <div className='ml-3'>
                                    <h3 className="cursor-pointer hover:text-blue-500">{item.title}</h3>
                                    {/* {item.genres?.map((genre) => {
                                        return (
                                            <div key={genre} >{genre}</div>
                                        )
                                    })} */}
                                    <div>{item?.genres[0]}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}

export default NominatedBook;