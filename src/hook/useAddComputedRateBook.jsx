import { useMutation } from '@tanstack/react-query';
import ComputedService from '../component/service/ComputedService';

const useAddComputedRateBook = () => {
    let computedService = new ComputedService()
    return useMutation({
        mutationFn: (id) => computedService.addComputedRateBook(id).then((res) => {
            if (res.data) {
                console.log(res.data);
                return res.data;
            }
        }).catch((res) => {
            console.error(res);
        })
    });
}

export default useAddComputedRateBook;