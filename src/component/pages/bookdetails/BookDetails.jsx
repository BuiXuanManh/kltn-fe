import React from 'react';
import { useParams } from 'react-router-dom';
const BookDetails = () => {
    const param = useParams();
    const id = param.id;
    console.log(id);
    var data = {
        id: 1,
        title: 'Harry Potter và Hòn Đá Phù Thủy',
        img: 'book1.jpg',
        author: 'J.K. Rowling',
        genre: 'Fantasy',
        description: 'Cuốn sách đầu tiên trong loạt truyện Harry Potter.'
    }
    return (
        <div>
            <div className="mt-[5rem] mx-48 max-h-52 border items-center justify-center border-white rounded-lg bg-white shadow-md">
                <div className='w-24 h-32 ml-2' ><img className='w-24 h-32' src={data.img} alt="" /></div>
            </div>
        </div>
    );
};

export default BookDetails;