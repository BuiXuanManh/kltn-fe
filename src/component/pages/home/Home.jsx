import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
const Home = () => {
    var bgs = [
        "bg-1.jpg",
        "bg-2.jpg",
        "bg-3.jpg",
        "bg-4.jpg",
        "bg-5.jpg",
        "bg-6.jpg",
        "bg-7.jpg",
    ]
    var data = [{
        id: 1,
        title: 'Harry Potter và Hòn Đá Phù Thủy',
        img: 'book1.jpg',
        author: 'J.K. Rowling',
        genre: 'Fantasy',
        description: 'Cuốn sách đầu tiên trong loạt truyện Harry Potter.'
    }, {
        id: 2,
        title: 'Narnia: Lữ Khách Thép',
        img: 'book2.jpg',
        author: 'C.S. Lewis',
        genre: 'Fantasy',
        description: 'Cuốn thứ hai trong loạt truyện Narnia.'
    }, {
        id: 3,
        title: 'Hobbit',
        img: 'book3.jpg',
        author: 'J.R.R. Tolkien',
        genre: 'Fantasy',
        description: 'Một cuộc phiêu lưu của một người Hobbit tên là Bilbo Baggins.'
    }, {
        id: 4,
        title: 'Đi Tìm Lẽ Sống',
        img: 'book4.jpg',
        author: 'Viktor E. Frankl',
        genre: 'Tâm lý - Tự viện',
        description: 'Một quyển sách kinh điển về tâm lý học.'
    }, {
        id: 5,
        title: 'Đi Tìm Lẽ Sống',
        img: 'book4.jpg',
        author: 'Viktor E. Frankl',
        genre: 'Tâm lý - Tự viện',
        description: 'Một quyển sách kinh điển về tâm lý học.'
    },
    {
        id: 6,
        title: 'Đi Tìm Lẽ Sống',
        img: 'book4.jpg',
        author: 'Viktor E. Frankl',
        genre: 'Tâm lý - Tự viện',
        description: 'Một quyển sách kinh điển về tâm lý học.'
    }];
    var rates = [{ id: 1, rate: 5, name: "nam1" }, { id: 2, rate: 4, name: "nam1" }, { id: 3, rate: 3, name: "nam1" }, { id: 4, rate: 2, name: "nam1" }, { id: 5, rate: 1, name: "nam1" }]

    return (< div className='bg-gray-100'>
        <Carousel interval={3000} >
            {bgs.map((bg) => {
                return (
                    <Paper key={bg} >
                        <div className={`mt-[5rem] w-full h-[40rem] bg-center items-center justify-center bg-gradient-to-b from-transparent to-black`} style={{ backgroundImage: `url("${bg}")`, backgroundRepeat: "no-repeat" }}>
                        </div>
                    </Paper>
                )

            })
            }
        </Carousel>
        <div className='grid grid-cols-3 mt-10 mx-48 border border-white rounded-lg bg-white shadow-md'>
            <div className='px-4 grid grid-cols-1 col-span-2 w-full'>
                <div className='flex justify-between'>
                    <h3 className='p-3 items-start text-start'>Sach de cu</h3>
                    <a href='/books' className='p-3 items-start text-start text-orange-500 text-sm font-serif'>Xem tat ca</a>
                </div>
            </div>
            <div className='px- 4 grid grid-cols-1 w-full'>
                <div className='flex justify-between'>
                    <h3 className='p-3 items-start text-start'>Dang doc</h3>
                    <a href='/books' className='p-3 items-start text-start text-orange-500 text-sm font-serif'>Xem tat ca</a>
                </div>
            </div>
        </div>
        <div className='grid grid-cols-3 mx-48 border border-white rounded-lg bg-white  shadow-md'>
            <div className='px-4 grid grid-cols-2 col-span-2 gap-4 max-w-full justify-start'>
                {data.map((item) => {
                    return (
                        <div key={item.id} className='flex text-start w-full mt-5 max-h-52  shadow-md'>
                            <div className='w-24 h-32'>
                                <img className='w-full h-full object-cover' src={item.img} alt='img book' />
                            </div>
                            <div className='ml-2 w-full'>
                                <h3>{item.title}</h3>
                                <span>{item.description}</span>
                                <div className='flex items-center justify-between w-full'>
                                    <div className=''>{item.author}</div>
                                    <div className='p-1 border border-yellow-400 text-orange-600'>{item.genre}</div>
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
                                <img width={40} height={60} className='w-full h-full' src={item.img} alt='img book' />
                            </div>
                            <div className='ml-2 w-full'>
                                <h3>{item.title}</h3>
                                <span>{item.genre}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
        {/* New update book */}
        <div className='grid grid-cols-3 mt-10 mx-48 border border-white rounded-lg bg-white'>
            <div className='px-4 grid grid-cols-1 col-span-2 w-full'>
                <div className='flex justify-between'>
                    <h3 className='p-3 items-start text-start'>Sach moi</h3>
                    <a href='/books' className='p-3 items-start text-start text-orange-500 text-sm font-serif'>Xem tat ca</a>
                </div>
            </div>
            <div className='px- 4 grid grid-cols-1 w-full'>
                <div className='flex justify-between'>
                    <h3 className='p-3 items-start text-start'>Moi danh gia</h3>
                    <a href='/books' className='p-3 items-start text-start text-orange-500 text-sm font-serif'>Xem tat ca</a>
                </div>
            </div>
        </div>
        <div className='grid grid-cols-3 mx-48 border border-white rounded-lg bg-white  shadow-md'>
            <div className='px-4 col-span-2 gap-4 max-w-full justify-start'>
                {data.map((item) => {
                    return (
                        <div key={item.id} className='flex text-start w-full mt-5 max-h-52  shadow-md'>
                            <div className='w-24 h-32'>
                                <img className='w-full h-full object-cover' src={item.img} alt='img book' />
                            </div>
                            <div className='ml-2 w-full'>
                                <h3>{item.title}</h3>

                                <div className='flex items-center justify-between w-full'>
                                    <div className=''>{item.author}</div>
                                    <div className='p-1 border border-yellow-400 text-orange-600'>{item.genre}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className='px-4 grid grid-cols-1 gap-4 max-w-full shadow-md pb-4'>
                {rates.map((item) => {
                    return (
                        <div key={item.id} className='flex items-center justify-between w-full mt-5 pb-2 shadow-md'>
                            <div className='flex'>
                                <div className='w-8 h-12'>
                                    <img width={40} height={60} className='w-full h-full' src={item.img} alt='img book' />
                                </div>
                                <div>
                                    <h3>{item.name}</h3>
                                    <h3>{item.id}</h3>
                                </div>
                            </div>
                            <div className='text-center'><span>{item.rate}</span></div>
                        </div>
                    );
                })}
            </div>


        </div>

    </div>
    );
};

export default Home;