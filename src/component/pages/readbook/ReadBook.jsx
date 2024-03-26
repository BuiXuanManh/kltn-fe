import { IonIcon } from '@ionic/react';
import React from 'react';
import { heartOutline, documentTextOutline, bookmarkOutline, arrowBack, arrowForward, alertCircleOutline } from 'ionicons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare, faBookmark, faStar } from '@fortawesome/free-solid-svg-icons';
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
    return (
        <div className='mx-3 py-10 w-full h-full bg-gray-100'>
            <div className='mx-48 border bg-[#EAE4D3] border-white rounded-md items-center justify-center text-center'>
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
                    <div className='justify-between flex'>
                        <h3>111 Binh luan</h3>
                        <button>Moi nhat</button>
                    </div>
                    <div>
                        <div>
                            <img src="" alt="" />
                        </div>
                        <div>
                            <textarea name="comment" cols="30" rows="10"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadBook;