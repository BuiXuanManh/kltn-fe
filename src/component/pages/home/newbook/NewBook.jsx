import { Link } from "react-router-dom";
import IconGlobal from "../../../../icon/IconGlobal";

function NewBook(data, rates) {
    let icon = new IconGlobal();
    return (
        <div className=''>
            <div className=' grid grid-cols-3 mt-10 mx-48 border border-white border-b-0  rounded-lg bg-white'>
                <div className='px-4 grid grid-cols-1 col-span-2 w-full border border-gray-200'>
                    <div className='flex justify-between '>
                        <h3 className='p-3 items-start text-start'>Sách mới</h3>
                        <a href='/books' className='p-3 items-start text-start text-orange-500 text-sm cursor-pointer font-medium'>Xem tất cả</a>
                    </div>
                </div>
                <div className='px-4 grid grid-cols-1 w-full border border-gray-200'>
                    <div className='flex justify-between'>
                        <h3 className='p-3 items-start text-start'>Mới đánh giá</h3>
                        <div className='p-3 items-start text-start text-orange-500 text-sm cursor-pointer font-medium'>Xem tất cả</div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-3 mx-48 border border-white border-t-0 rounded-lg bg-white'>
                <div className='col-span-2 gap-4 max-w-full justify-start pb-4 px-4'>
                    {data?.map((item) => {
                        return (
                            <div key={item.id} className='flex text-start w-full mt-5 max-h-52 border-b p-2 border-gray-200'>
                                <div className='w-24 h-32 ml-2'>
                                    <Link to={`/details/${item?.id}`}>
                                        <img width="5rem" height="6rem" className='w-full h-full object-cover' src={item.image} alt='img book' />
                                    </Link>
                                </div>
                                <div className='ml-3 w-full'>
                                    <Link to={`/details/${item?.id}`}>
                                        <h3 className="cursor-pointer font-semibold hover:text-blue-500">{item.title}</h3>
                                    </Link>
                                    <div className="mt-2 flex-wrap flex items-center gap-1">
                                        <span className="line-clamp-3 ml-1">{item?.shortDescription}</span>
                                    </div>
                                    <div className='flex items-center min-w-20 justify-between w-full mt-3'>
                                        <div className="flex items-center w-60">
                                            <img src={icon?.icon?.author} className='w-5 h-5' alt="" />
                                            {item.authors?.map((author, index) => {
                                                return (
                                                    <div key={index} className='flex truncate justify-center items-center'>
                                                        <p className=' w-48 truncate'>{author?.name}</p>
                                                        {(index !== item?.authors?.length - 1) ? <span className="mr-2">, </span>
                                                            : <span> </span>}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className="flex flex-wrap-reverse flex-row-reverse gap-2">
                                            {item.genres?.map((genre, index) => {
                                                return (
                                                    <div key={index} className='p-1 border border-tyellow text-orange-600 cursor-pointer'>{genre?.name}</div>
                                                )
                                            })}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className='mt-4 grid grid-cols-1 max-w-full'>
                    {rates?.map((item) => {
                        return (
                            <div key={item.id} className='flex max-h-12 justify-between w-full mt-2 p-4 border border-gray-200 min-h-20 '>
                                <div className='flex mt-2'>
                                    <div className='h-12'>
                                        <img className='w-full h-full cursor-pointer' src={item.image} />
                                    </div>
                                    <div className="ml-2">
                                        <h3 className="cursor-pointer">{item.name}</h3>
                                        <h3>{item.id}</h3>
                                    </div>
                                </div>
                                <div className='text-center cursor-pointer mt-2'><span>{item.rate}</span></div>
                            </div>
                        );
                    })}
                </div>


            </div>
        </div>
    );
}

export default NewBook;