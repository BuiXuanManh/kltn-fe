import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import NominatedBook from './nominatedbook/NominatedBook';
import NewBook from './newbook/NewBook';
import HotBook from './hotbook/HotBook';

import { IonIcon } from '@ionic/react';
import { arrowDownCircleOutline, arrowUpCircleOutline } from 'ionicons/icons';
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
        <Carousel interval={3000} navButtonsAlwaysVisible={true} >
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
        <IonIcon className='animate-bounce w-10 h-10 fixed right-4 bottom-96' icon={arrowUpCircleOutline}></IonIcon>
        <IonIcon className='animate-bounce w-10 h-10 fixed right-4 top-96' icon={arrowDownCircleOutline}></IonIcon>
        {/* Nominated book */}
        {NominatedBook(data)}
        {/* New update book */}
        {NewBook(data, rates)}
        {HotBook(data)}
    </div>
    );
};

export default Home;