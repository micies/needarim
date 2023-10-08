import axios, { AxiosResponse } from 'axios';



type DataCallback<T> = (data: T) => void;

export function Get(BaseUrl: string, dataCallback: DataCallback<any>, setErrorMessageState:DataCallback<any>) {
  axios
      .get(BaseUrl)
      .then((res: AxiosResponse<any>) => {
          // console.log(res)
        if (!res.data) {
          dataCallback({ errorMessage: 'not found' });
        } else {
          const persons = res.data;
          dataCallback(persons);
        }
      })
      .catch((error: { message: any; }) => {
          setErrorMessageState({ errorMessage: error.message });
        console.error('There was an error!', error);
      });
}

export const Update = async (BaseUrl: string, id: number | undefined, data: any) => {
  axios
      .put(`${BaseUrl}/${id}`, data)
      .then((response: AxiosResponse<any>) => {
        console.log(response);
        // responseData(response);
      })
      .catch((error: any) => {
        console.log(error);
      });
};

export function Delete(BaseUrl: string, id: number) {
  axios.delete(`${BaseUrl}/${id}`);
}

export function Post(BaseUrl: string, data: any) {
  axios
      .post(BaseUrl, data)
      .then((response: AxiosResponse<any>) => {
        console.log(response);
        // responseData(response);
      })
      .catch((error: any) => {
        console.log(error);
      });
}

// export const GetById = (BaseUrl: string, id: number, dataCallback: DataCallback<Person>) => {
//   axios.get(`${BaseUrl}/${id}`).then((response: AxiosResponse<Person>) => {
//     dataCallback(response.data);
//   });
// };
