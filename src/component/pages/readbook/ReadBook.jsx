
import { IonIcon } from '@ionic/react';
import React from 'react';
import {
    heartOutline, documentTextOutline, bookmarkOutline, arrowBack, arrowForward,
    alertCircleOutline, menuSharp, settingsOutline, chatbubblesOutline
} from 'ionicons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare, faBookmark, faStar, faThumbsUp, faReply, faFlag } from '@fortawesome/free-solid-svg-icons';
import { arrowDownCircleOutline, arrowUpCircleOutline } from 'ionicons/icons';
const ReadBook = () => {
    const content = `Tất cả đã sẵn sàng cho cuộc phiêu lưu mới của Harray Potter và nhóm bạn trung thành. Họ đã thu thập thông tin, chuẩn bị trang bị và lên kế hoạch cẩn thận trước khi bắt đầu hành trình đi tìm kiếm Hoàn Đá Phủ Thủy - một vật phẩm quan trọng mà Voldemort đang cố gắng tìm kiếm để đạt được sức mạnh vô song.
        Harray, cùng với Ron và Hermione, đã bắt đầu hành trình qua các thị trấn và khu rừng hoang dã của thế giới phù thủy. Họ phải vượt qua nhiều thử thách, từ những con người và quái vật gian ác đến các phù thủy tà ác đang cố gắng ngăn cản họ tiến xa hơn.
        Trong suốt cuộc hành trình, tình bạn giữa Harray, Ron và Hermione ngày càng chắc chắn hơn, và sức mạnh của tình bạn này là nguồn động viên lớn nhất giúp họ vượt qua mọi khó khăn. Mỗi trở ngại, mỗi thử thách đều là cơ hội để họ học hỏi, trưởng thành và trở nên mạnh mẽ hơn.
        Cuối cùng, sau nhiều ngày dài và đầy gian nan, Harray và nhóm của cậu đã đạt được mục tiêu của mình. Họ đã tìm ra Hoàn Đá Phủ Thủy và chiến thắng những kẻ thù để bảo vệ nó. Trận chiến cuối cùng giữa Harray và Voldemort là một cuộc đấu ác liệt, nhưng sức mạnh của tình bạn và lòng dũng cảm cuối cùng đã chiến thắng ác độc. 
        Với việc tiêu diệt Hoàn Đá Phủ Thủy, Harray Potter không chỉ cứu vớt thế giới phù thủy khỏi sự thống trị của Voldemort, mà còn chứng minh rằng sức mạnh của tình bạn và lòng tin vào điều tốt là những thứ mạnh mẽ nhất trong mọi cuộc chiến.`
    const processedContent = content.split('.').map((sentence, index) => (
        <React.Fragment key={index}>
            {sentence.trim()}
            {index !== content.split('.').length - 1 && '.'}<br /><br />
        </React.Fragment>
    ));
    // const [scoll, setScoll] = React.useState(false);
    // const handleScoll = () => {
    //     setScoll(true);
    // }
    return (
        <div className='mx-3 py-10 w-full h-full bg-gray-100'>
            <IonIcon className='animate-bounce w-10 h-10 fixed right-4 bottom-96 cursor-pointer' icon={arrowUpCircleOutline}></IonIcon>
            <IonIcon className='animate-bounce w-10 h-10 fixed right-4 top-96 cursor-pointer' icon={arrowDownCircleOutline}></IonIcon>
            <div className='w-full'>
                {/* <div className=''> */}


                <div className='mx-48 border bg-[#EAE4D3] border-white rounded-xl items-center justify-center text-center'>
                    <div className='mt-5 flex mx-20 justify-between'>
                        <div className=''>
                            <button className='rounded-3xl px-8 h-10 bg-[#F0ECDF] justify-center items-center'><div className='text-center justify-center'><IonIcon className='' icon={arrowBack}></IonIcon><span className='ml-3 mb-3'>Trang trước</span></div></button>
                        </div>
                        <div className=''>
                            <button className='rounded-3xl px-8 h-10 bg-[#F0ECDF] justify-center items-center'><div className='justify-center text-center'><span className='mr-3 mb-3'>Trang sau</span> <IonIcon className='' icon={arrowForward}></IonIcon></div></button>
                        </div>

                    </div>
                    <div className='mt-5 '>
                        <h1 className='text-3xl font-semibold uppercase'>HarryPotter và hòn đá phủ thủy</h1>
                    </div>
                    <div className='justify-center mt-5 gap-4 flex'>
                        <span className='text-sm'>
                            <IonIcon icon={documentTextOutline}></IonIcon>
                            <span className='ml-1'> Trang 1</span>

                        </span>
                        <span className='text-sm'>
                            <IonIcon icon={heartOutline}></IonIcon>
                            <span className='ml-1'>  30 yêu thích</span>


                        </span>
                        <span className='text-sm'>
                            <IonIcon icon={bookmarkOutline}></IonIcon>
                            <span className='ml-1'>  15 đánh dấu</span>

                        </span>
                    </div>
                    <div className='mt-10 mx-16 text-2xl  text-start justify-start items-star'>
                        <span className='' style={{ lineHeight: "1" }} >
                            {processedContent}
                        </span>
                    </div>
                    <div className='mt-4 py-10 mx-16'>
                        <div className='flex gap-10 justify-center items-center text-center'>
                            <div className='w-20 h-30'>
                                <FontAwesomeIcon icon={faStar} />
                                <br />
                                <span>Đánh giá</span>
                            </div>
                            <div className='w-20 h-30'>
                                <FontAwesomeIcon icon={faShareFromSquare} />
                                <br />
                                <span>Đề cử</span>
                            </div>
                            <div className='w-20 h-30'>
                                <FontAwesomeIcon icon={faBookmark} />
                                <br />
                                <span>Đánh dấu</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-4 mx-48 border bg-[#EAE4D3] border-white h-25 rounded-md'>
                    <div className='mx-16 flex gap-10  py-10'>
                        <div className='w-[45%] h-full'>
                            <button className='w-full px-8 h-10 bg-[#F0ECDF] justify-center items-center'><div className='text-center justify-center'><IonIcon className='' icon={arrowBack}></IonIcon><span className='ml-3 mb-3'>Trang trước</span></div></button>

                        </div>
                        <div className='justify-center text-center h-full items-center w-[10%]'>
                            <button className='px-8 h-10 bg-[#F0ECDF] justify-center items-center'>
                                <IonIcon className="min-w-6 h-full pb-4" icon={alertCircleOutline}></IonIcon>
                            </button>
                        </div>
                        <div className='w-[45%] h-full justify-end flex'>
                            <button className='ml-auto w-full px-8 h-10 bg-[#F0ECDF]'><div className='justify-center text-center'><span className='mr-3 mb-3'>Trang sau</span> <IonIcon className='' icon={arrowForward}></IonIcon></div></button>
                        </div>
                    </div>
                </div>
                <div className='mt-4 mx-48 border bg-[#EAE4D3] border-white h-25 rounded-md'>
                    <div className='mx-16 grid gap-10 py-10'>
                        <div className='grid'>
                            <div className='justify-between flex'>
                                <h3 className='text-xl font-semibold'>111 Binh luan</h3>
                                <select className='h-9 px-2'>
                                    <option value="Newest">Mới nhất</option>
                                    <option value="Like">Lượt thích</option>
                                    <option value="Olded">Cũ nhất</option>
                                </select>
                            </div>
                            <div className='flex w-full my-10 border-b-1 border border-gray-200 border-x-0 border-t-0 pb-4'>
                                <div className='w-20'>
                                    <img src="avatar.jpg" alt="" className='w-20 h-16 rounded-full' />
                                </div>
                                <div className='ml-4 w-full'>
                                    <textarea name="comment" placeholder='Nhập bình luận của bạn ...' className='w-full h-16 rounded-xl'></textarea>
                                </div>
                            </div>
                            <div className='grid border-b-1 border border-gray-200 border-x-0 border-t-0'>
                                <div className='flex w-full'>
                                    <div className='w-20'>
                                        <img src="avatar.jpg" alt="" className='w-20 h-16 rounded-full' />
                                    </div>
                                    <div className='ml-4 w-full'>
                                        <div className='w-full rounded-xl pb-4 pr-5'>
                                            <div className='font-semibold'>Nguyen Van A</div>
                                            <div className='text-sm flex text-gray-500 gap-10'>
                                                <div >14 gio truoc</div>
                                                <div>Trang 1 </div>
                                            </div>
                                            <div className='mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, dolorum.</div>
                                            <div className='flex mt-10 justify-end gap-6 text-gray-600'>
                                                <div className='flex gap-2'>
                                                    <div>
                                                        <FontAwesomeIcon className='text-gray-400' icon={faThumbsUp} />
                                                    </div>
                                                    <div>0</div>
                                                </div>

                                                <div className='flex gap-2'>
                                                    <div>
                                                        <FontAwesomeIcon className='text-gray-400' icon={faReply} />
                                                    </div>
                                                    <div>Tra loi</div>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <div>
                                                        <FontAwesomeIcon className='text-gray-400' icon={faFlag} />
                                                    </div>
                                                    <div>Bao xau</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='fixed ml-4 top-0 mt-28 right-24 rounded-xl justify-between'>
                    <div className={`sticky bg-[#EAE4D3] rounded-xl w-20`}>
                        <div className='border border-white border-solid  border-b-1 justify-center text-center h-14 items-center'>
                            {/* <FontAwesomeIcon className='w-8 h-8' icon={faBars}/> */}
                            <div className='mt-4 text-center'>
                                <IonIcon className='w-7 h-7' icon={menuSharp} />
                            </div>

                        </div>
                        <div className='border border-white border-solid  border-b-1 justify-center text-center h-14'>
                            <div className='mt-4'>
                                <IonIcon className='w-6 h-6' icon={settingsOutline} />
                            </div>
                        </div>
                        <div className='border border-white border-solid  border-b-1 justify-center text-center h-14'>
                            <div className='mt-4'>
                                <IonIcon className='w-6 h-6' icon={arrowBack} />
                            </div>
                        </div>
                        <div className='border border-white border-solid  border-b-1 justify-center text-center h-14'>
                            <div className='mt-4'>
                                <IonIcon className='w-7 h-7' icon={alertCircleOutline} />
                            </div>
                        </div>
                    </div>
                    <div className='sticky mt-14'>
                        <div className='bg-[#EAE4D3] w-20 rounded-xl'>
                            <div className='border border-white border-solid  border-b-1 justify-center text-center h-14'>
                                <div className='mt-4'>
                                    <IonIcon className='w-7 h-7' icon={heartOutline} />
                                </div>
                            </div>
                            <div className='border border-white border-solid  border-b-1 justify-center text-center h-14'>
                                <div className='mt-4'>
                                    <IonIcon className='w-7 h-7' icon={bookmarkOutline} />
                                </div>
                            </div>
                            <div className='border border-white border-solid  border-b-1 justify-center text-center h-14'>
                                <div className='mt-4'>
                                    <IonIcon className='w-7 h-7' icon={chatbubblesOutline} />
                                </div>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadBook;