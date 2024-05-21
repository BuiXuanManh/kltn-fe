import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import NominatedBook from './nominatedbook/NominatedBook';
import NewBook from './newbook/NewBook';
import HotBook from './hotbook/HotBook';

import { IonIcon } from '@ionic/react';
import { arrowDownCircleOutline, arrowUpCircleOutline } from 'ionicons/icons';
import BookService from '../../service/BookService';
import { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import NominatedBookService from '../../service/NominatedBookService';
import { useQuery } from '@tanstack/react-query';
import CommentService from '../../service/CommentService';
const Home = ({ data }) => {
    var bgs = [
        "bg-1.jpg",
        "bg-2.jpg",
        "bg-3.jpg",
        "bg-4.jpg",
        "bg-5.jpg",
        "bg-6.jpg",
        "bg-7.jpg",
    ]
    const [nominatedBooks, setNominatedBooks] = useState([]);
    let nominatedService = new NominatedBookService();
    const getNominatedBooks = useQuery({
        queryKey: ['nominatedBookss'],
        queryFn: () => nominatedService.getNominatedBook().then((res) => {
            if (res.data) {
                console.log(nominatedBooks)
                setNominatedBooks(res.data);
                return res.data;
            }
        }).catch((err) => {
            console.error(err);
        })
    })
    // var rates = [{ id: 1, rate: 5, name: "nam1" }, { id: 2, rate: 4, name: "nam1" }, { id: 3, rate: 3, name: "nam1" }, { id: 4, rate: 2, name: "nam1" }, { id: 5, rate: 1, name: "nam1" }, { id: 6, rate: 4, name: "nam1" }, { id: 7, rate: 4, name: "nam1" }, { id: 8, rate: 3, name: "nam1" }, { id: 9, rate: 2, name: "nam1" }, { id: 10, rate: 1, name: "nam1" }, { id: 11, rate: 4, name: "nam1" }]
    const [rates, setRates] = useState([]);
    const commentService = new CommentService();
    const getRates = useQuery({
        queryKey: ['ratesRecent'],
        queryFn: () => commentService.getRatesRecent().then((res) => {
            if (res.data) {
                setRates(res.data);
                return res.data;
            }
        }).catch((err) => {
            console.error(err);
        })
    })
    const [nominateTotal, setNominateTotal] = useState([]);
    const service = new BookService();
    const getNominateTotal = useQuery({
        queryKey: ['nominateTotal'],
        queryFn: () => service.getNominateTotal(1, 12).then((res) => {
            if (res.data) {
                console.log(res.data)
                setNominateTotal(res.data);
                return res.data;
            }
        }).catch((err) => {
            console.error(err);
        })
    })
    const [hotBooks, setHotBooks] = useState([]);
    const rateReadRecent = useQuery({
        queryKey: ['rateReadRecent'],
        queryFn: () => service.findByRaterecent().then((res) => {
            if (res.data) {
                setHotBooks(res.data);
                return res.data;
            }
        }).catch((err) => {
            console.error(err);
        }), enabled: hotBooks.length === 0
    })
    const [newBooks, setNewBooks] = useState([]);
    const newTotal = useQuery({
        queryKey: ['newTotal'],
        queryFn: () => service.geNewTotal(1, 12).then((res) => {
            if (res.data) {
                setNewBooks(res.data);
                return res.data;
            }
        }).catch((err) => {
            console.error(err);
        })
    })
    return (<div className='bg-gray-100 border' >
        <Carousel interval={3000} navButtonsAlwaysVisible={true} >
            {nominatedBooks?.map((bg) => {
                return (
                    <Paper key={bg} >
                        <Link to={`/details/${bg?.nominatedBook?.book?.id}`}>
                            <div className={` flex items-center justify-center bg-gradient-to-b from-transparent cursor-pointer`} >
                                <img src={bg?.nominatedBook?.book?.bgImage} alt="" className='w-full h-[43rem]' />
                            </div>
                        </Link>
                    </Paper>
                )
            })
            }
        </Carousel>
        <IonIcon className='animate-bounce w-10 h-10 fixed right-4 bottom-96 cursor-pointer' icon={arrowUpCircleOutline}></IonIcon>
        <IonIcon className='animate-bounce w-10 h-10 fixed right-4 top-96 cursor-pointer' icon={arrowDownCircleOutline}></IonIcon>
        {data?.length > 0 && HotBook(hotBooks)}
        {/* Nominated book */}
        <NominatedBook data={nominateTotal} />
        {/* New update book */}
        <NewBook data={newBooks} rates={rates} />
    </div >
    );
};

export default Home;