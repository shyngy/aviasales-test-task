import axios from 'axios';
import config from './config';
import { ResponseTicketData } from '../types';

interface SearchIdData {

  searchId: string

}

const api = {
  async getSearchId(): Promise<string> {
    const { data } = await axios.get<SearchIdData>(config.searchUrl);
    return data.searchId;
  },

  getTickets: (searchId: string):
  Promise<ResponseTicketData> => new Promise((resolve, reject) => {
    const intervalId = setTimeout(() => {
      axios.get(config.ticketUrl + searchId)
        .then((response) => {
          if (response.data.stop || response.status !== 200) clearTimeout(intervalId);
          resolve(response.data);
        })
        .catch((error) => {
          clearTimeout(intervalId);
          if (error.response.status === 500) {
            resolve({ stop: false, tickets: [] });
          } else {
            reject(error);
          }
        });
    }, 100);
  }),
};

export default api;
