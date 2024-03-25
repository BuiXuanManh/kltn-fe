
function NewBook(data, rates) {
    return (
        <div className=''>
            <div className=' grid grid-cols-3 mt-10 mx-48 border border-white border-b-0  rounded-lg bg-white'>
                <div className='px-4 grid grid-cols-1 col-span-2 w-full'>
                    <div className='flex justify-between'>
                        <h3 className='p-3 items-start text-start'>Sach moi</h3>s
                        <a href='/books' className='p-3 items-start text-start text-orange-500 text-sm font-serif cursor-pointer'>Xem tat ca</a>
                    </div>
                </div>
                <div className='px-4 grid grid-cols-1 w-full'>
                    <div className='flex justify-between'>
                        <h3 className='p-3 items-start text-start'>Moi danh gia</h3>
                        <a href='/books' className='p-3 items-start text-start text-orange-500 text-sm font-serif cursor-pointer'>Xem tat ca</a>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-3 mx-48 border border-white border-t-0 rounded-lg bg-white  shadow-md '>
                <div className='col-span-2 gap-4 max-w-full justify-start pb-4 px-4 shadow-md'>
                    {data.map((item) => {
                        return (
                            <div key={item.id} className='flex text-start w-full mt-5 max-h-52 shadow-md pb-4'>
                                <div className='w-24 h-32 ml-2'>
                                    <img className='w-full h-full object-cover cursor-pointer' src={item.img} alt='img book' />
                                </div>
                                <div className='ml-2 w-full'>
                                    <h3 className="cursor-pointer">{item.title}</h3>

                                    <div className='flex items-center justify-between w-full'>
                                        <div className=''>{item.author}</div>
                                        <div className='p-1 border border-yellow-400 text-orange-600 cursor-pointer'>{item.genre}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className='px-4 grid grid-cols-1 justify-start text-start gap-4 max-w-full h-auto shadow-md pb-4'>
                    {rates.map((item) => {
                        return (
                            <div key={item.id} className='flex items-start max-h-12 text-start justify-between w-full mt-3 pb-2 shadow-md'>
                                <div className='flex'>
                                    <div className='w-8 h-12'>
                                        <img width={40} height={60} className='w-full h-full cursor-pointer' src={item.img} alt='img book' />
                                    </div>
                                    <div>
                                        <h3 className="cursor-pointer">{item.name}</h3>
                                        <h3>{item.id}</h3>
                                    </div>
                                </div>
                                <div className='text-center cursor-pointer'><span>{item.rate}</span></div>
                            </div>
                        );
                    })}
                </div>


            </div>
        </div>
    );
}

export default NewBook;