import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { RootState } from '../index';

import api from '../api';
import {
  OptionTab, Ticket, TicketItem, TicketState, TransferPayload,
} from '../types';

const ticketItems: Ticket[] = [];

const initialState: TicketState = {
  stop: false,
  isLoading: true,
  displayItems: [],
  displayItemsLength: 5,
};

type SortedBy = {
  option: OptionTab;
  transfers: TransferPayload[];
};

const getTransferCounts = (transfers: SortedBy['transfers']) => transfers.reduce((acc: number[], item) => {
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
  transfers: number[],
  displayItemsLength: number = 5,
) => {
  const chunks: Ticket[] = [];
  for (let index = 0; index < tickets.length; index += 1) {
    if (chunks.length >= displayItemsLength) break;
    const [{ stops: stops1 }, { stops: stops2 }] = tickets[index].segments;
    if (transfers.includes(stops1.length) && transfers.includes(stops2.length)) {
      chunks.push({ ...tickets[index], id: uuidv4() });
    }
  }
  return chunks;
};

const getSortedChunksByTransfers = (state: TicketState, transfers: TransferPayload[]) => {
  if (transfers.every((item) => !item.checked)) {
    state.displayItems = [];
  } else {
    const transfersCount = getTransferCounts(transfers);
    const chunks = sortByTransfers(ticketItems, transfersCount, state.displayItemsLength);
    if (chunks.length) {
      state.displayItems = chunks;
      state.isLoading = false;
    }
  }
};

type AppendPayload = { items: TicketItem; stop: boolean; sortedBy: SortedBy };

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    appendItems: (state, action: PayloadAction<AppendPayload>) => {
      const { items, stop, sortedBy } = action.payload;
      ticketItems.push(...items);
      sortByOptions(ticketItems, sortedBy.option.name);
      getSortedChunksByTransfers(state, sortedBy.transfers);
      state.stop = stop;
    },

    sortItems: (state, action: PayloadAction<SortedBy>) => {
      sortByOptions(ticketItems, action.payload.option.name);
      getSortedChunksByTransfers(state, action.payload.transfers);
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
  appendItems, moreItems, setLoading, sortItems,
} = ticketSlice.actions;

type AllTickets = {
  searchId: string;
  stop: boolean;
  prevData: TicketItem;
};

export const sortTickets = createAsyncThunk('ticket/sort', (...arg) => {
  const thunkApi = arg[1];
  const rootState = thunkApi.getState() as RootState;
  thunkApi.dispatch(
    sortItems({
      transfers: rootState.transfer.checkboxes,
      option: rootState.option.activeTab,
    }),
  );
});

export const fetchTicket = createAsyncThunk('ticket/fetch-tickets', async (...arg) => {
  try {
    const thunkApi = arg[1];
    const getAllTickets = async ({ searchId, stop }: AllTickets) => {
      if (stop === true) return;
      const data = await api.getTickets(searchId);
      const globalState = thunkApi.getState() as RootState;
      const sortedBy = {
        transfers: globalState.transfer.checkboxes,
        option: globalState.option.activeTab,
      };
      thunkApi.dispatch(
        appendItems({
          items: data.tickets,
          stop: data.stop,
          sortedBy,
        }),
      );
      getAllTickets({ searchId, stop: data.stop, prevData: data.tickets });
    };

    const searchId = await api.getSearchId();
    await getAllTickets({ searchId, stop: false, prevData: [] });
  } catch (error) {
    console.error(error);
  }
});

export const selectDisplayTickets = ({ ticket }: RootState) => ticket.displayItems;

export const selectStop = ({ ticket }: RootState) => ticket.stop;

export const selectIsLoadingTickets = ({ ticket }: RootState) => ticket.isLoading;

export const selectTicketsLength = ({ ticket }: RootState) => ticket.displayItemsLength;

export default ticketSlice.reducer;
