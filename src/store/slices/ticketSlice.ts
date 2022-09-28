import {
  createAsyncThunk, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../index';

import api from '../api';
import {
  OptionTab, Ticket, TicketItem, TicketState, TransferPayload,
} from '../types';

const initialState: TicketState = {
  items: [],
  stop: false,
  isLoading: true,
  displayItems: [],
  displayItemsLength: 5,

};

type SortedBy = {
  option: OptionTab
  transfers: TransferPayload[]
};

const getTransferCounts = (
  transfers: SortedBy['transfers'],
) => transfers.reduce((acc: number[], item) => {
  if (item.checked && item.counter !== undefined) acc.push(item.counter);
  return acc;
}, []);

const sortByOptions = (tickets: Ticket[], optionName: string) => {
  const sortByFast = () => {
    tickets.sort((a, b) => {
      const first = a.segments[0].duration + a.segments[1].duration;
      const second = b.segments[0].duration + b.segments[1].duration;
      return first - second;
    });
  };
  if (optionName === 'fast') {
    sortByFast();
  } else if (optionName === 'cheap') {
    tickets.sort((a, b) => a.price - b.price);
  }
};

const sortByTransfers = (
  tickets: Ticket[],
  transfers:number[],
  displayItemsLength: number = 5,
) => {
  const chunks: Ticket[] = [];
  for (let index = 0; index < tickets.length; index += 1) {
    if (chunks.length >= displayItemsLength) {
      break;
    }
    const [{ stops: stops1 }, { stops: stops2 }] = tickets[index].segments;
    if (transfers.includes(stops1.length) && transfers.includes(stops2.length)) {
      chunks.push(tickets[index]);
    }
  }
  return chunks;
};

type AppendPayload = { items: TicketItem, stop: boolean, sortedBy: SortedBy };

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    appendItems: (state, action: PayloadAction<AppendPayload>) => {
      const { items, stop, sortedBy } = action.payload;
      const tickets: TicketItem = (state.items?.length === 0 || state.items === null)
        ? [] : state.items;

      const transfers = getTransferCounts(sortedBy.transfers);
      tickets.push(...items);

      sortByOptions(tickets, sortedBy.option.name);

      if (sortedBy.transfers.every((item) => !item.checked)) {
        state.displayItems = [];
      } else {
        const chunks = sortByTransfers(tickets, transfers, state.displayItemsLength);
        if (chunks.length) {
          state.displayItems = chunks;
          state.isLoading = false;
        }
      }
      state.items = tickets;
      state.stop = stop;
    },

    sortItemsByTransfers: (state, action: PayloadAction<{ transfers: SortedBy['transfers'], length: number }>) => {
      const chunks = sortByTransfers(
        state.items,
        getTransferCounts(action.payload.transfers),
        action.payload.length,
      );

      if (chunks.length) {
        state.displayItems = chunks;
        state.isLoading = false;
      }
    },

    sortItemsByOption: (state, action: PayloadAction<string>) => {
      sortByOptions(state.items, action.payload);
      state.displayItems = state.items.slice(0, state.displayItemsLength);
      if (state.displayItems.length) {
        state.isLoading = false;
      }
    },

    moreItems: (state) => {
      state.displayItemsLength += 5;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

  },

});

export const {
  appendItems, sortItemsByTransfers, moreItems, sortItemsByOption, setLoading,
} = ticketSlice.actions;

type AllTickets = {
  searchId: string
  stop: boolean
  prevData: TicketItem
};

export const fetchTicket = createAsyncThunk(
  'ticket/fetch-tickets',
  async (...arg) => {
    try {
      const thunkApi = arg[1];
      const getAllTickets = async ({
        searchId,
        stop,
        prevData,
      }: AllTickets):Promise<AllTickets | TicketItem> => {
        if (stop === true) return prevData;
        const data = await api.getTickets(searchId);
        const globalState = thunkApi.getState() as RootState;
        const sortedBy = {
          transfers: globalState.transfer.checkboxes,
          option: globalState.option.activeTab,
        };
        thunkApi.dispatch(appendItems({
          items: data.tickets,
          stop: data.stop,
          sortedBy,
        }));
        return getAllTickets({ searchId, stop: data.stop, prevData: data.tickets });
      };

      const searchId = await api.getSearchId();
      await getAllTickets({ searchId, stop: false, prevData: [] });
    } catch (error) {
      console.error(error);
    }
  },
);

export const selectDisplayTickets = ({
  ticket,
}: RootState) => ticket.displayItems;

export const selectStop = ({
  ticket,
}: RootState) => ticket.stop;

export const selectIsLoadingTickets = ({
  ticket,
}: RootState) => ticket.isLoading;

export const selectTicketsLength = ({ ticket }: RootState) => ticket.displayItemsLength;

export default ticketSlice.reducer;
