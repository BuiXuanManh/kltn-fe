
function NominatedBook(data) {
    return (
        <div>
            <div className='grid grid-cols-3 mt-10 mx-48 border border-white border-b-0 rounded-lg bg-white shadow-md'>
                <div className='px-4 grid grid-cols-1 col-span-2 w-full'>
                    <div className='flex justify-between'>
                        <h3 className='p-3 items-start text-start'>Sach de cu</h3>
                        <a href='/books' className='p-3 items-start text-start text-orange-500 text-sm font-serif cursor-pointer'>Xem tat ca</a>
                    </div>
                </div>
                <div className='px-4 grid grid-cols-1 w-full'>
                    <div className='flex justify-between'>
                        <h3 className='p-3 items-start text-start'>Dang doc</h3>
                        <a href='/books' className='p-3 items-start text-start text-orange-500 text-sm font-serif cursor-pointer'>Xem tat ca</a>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-3 mx-48 border border-white border-t-0 rounded-lg bg-white shadow-md'>
                <div className='px-4 pb-4 grid grid-cols-2 col-span-2 gap-4 max-w-full justify-start'>
                    {data.map((item) => {
                        return (
                            <div key={item.id} className='flex text-start w-full mt-5 max-h-52 shadow-md'>
                                <div className='w-24 h-32 ml-2 cursor-pointer'>
                                    <img className='w-full h-full object-cover' src={item.image} alt='img book' />
                                </div>
                                <div className='ml-2 w-full'>
                                    <h3 className="cursor-pointer">{item.title}</h3>
                                    <span>{item.shortDescription}</span>
                                    <div className='flex items-center justify-between w-full'>
                                        {item.authors?.map((author) => {
                                            return (
                                                <div key={author} className='p-1 border border-tyellow text-orange-600 cursor-pointer'>{author}</div>
                                            );
                                        })}
                                        {item.genres?.map((genre) => {
                                            return (
                                                <div key={genre} className='p-1 border border-tyellow text-orange-600 cursor-pointer'>{genre}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className='px-4 pb-4 grid grid-cols-1 gap-4 max-w-full items-start shadow-md'>
                    {data.map((item) => {
                        return (
                            <div key={item.id} className='flex text-start w-full mt-5 max-h-30 pb-2 shadow-md '>
                                <div className='w-8 h-12'>
                                    <img width={40} height={60} className='w-full h-full cursor-pointer' src={item.image} alt='img book' />
                                </div>
                                <div className='ml-2 w-full'>
                                    <h3 className="cursor-pointer">{item.title}</h3>
                                    {item.genres?.map((genre) => {
                                        return (
                                            <div key={genre} >{genre}</div>
                                        )
                                    })}
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