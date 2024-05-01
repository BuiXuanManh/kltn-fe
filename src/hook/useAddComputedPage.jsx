import { useMutation } from '@tanstack/react-query';
import ComputedService from '../component/service/ComputedService';

const useAddComputedPage = () => {
    let computedService= new ComputedService()
    return useMutation({
        mutationFn: (id) => computedService.addComputedPage(id).then((res) => {
            if (res.data) {
                console.log(res.data);
                return res.data;
            }
        }).catch((res) => {
            console.error(res);
        })
    });
}

export default useAddComputedPage;