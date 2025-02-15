import { toast } from 'react-toastify';

export const handleError = (err: any) => {
  switch (err.status) {
    case 204:
      toast.error(JSON.stringify(err.message));
      break;
    case 400:
      toast.error(JSON.stringify(`${err.message}, Please, try later`));
      break;
    case 401:
      toast.error(
        JSON.stringify(
          `${err.message}, Authorization problem, check if Id,API Token is correct`
        )
      );
      break;
    case 403:
      toast.error(
        JSON.stringify(
          `${err.message}, Authentication issue, please check if Id and request are correct`
        )
      );
      break;
    case 404:
      toast.error(JSON.stringify(err.message));
      break;
    case 429:
      toast.error(
        JSON.stringify(
          `${err.message}, The user has been frequency limited. Please reduce the request rate.`
        )
      );
      break;
    case 466:
      toast.error(JSON.stringify(err.message));
      break;
    case 499:
      toast.error(
        JSON.stringify(
          `${err.message}, The user closed the connection while the server was processing the request. It is necessary to increase the response time from the server and repeat the request with a delay. If the error recurs, inform the operator about it and provide an opportunity to resend.`
        )
      );
      break;
    case 500:
      toast.error(
        JSON.stringify(
          `${err.message}, Attempt to send a file larger than 100 MB.`
        )
      );
      break;
    case 502:
      toast.error(
        JSON.stringify(
          `${err.message}, The server cannot receive a response from the target server. The request must be repeated 3 times with a delay. If the error persists, please notify the operator and provide the opportunity to retry sending.`
        )
      );
      break;
    default:
      toast.error(
        JSON.stringify(
          `${err.message} || Please contact us to help us fix this. `
        )
      );
      break;
  }
};
