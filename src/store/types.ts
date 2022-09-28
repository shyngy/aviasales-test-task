export type TransferCheckbox = {
  name: string;
  displayName: string;
  checked: boolean;
  counter?: number
};

export type TransferPayload = Omit<TransferCheckbox, 'displayName'>;

export interface TransferState {
  checkboxes: TransferCheckbox[];

}
export interface OptionTab {
  name: string;
  displayName: string;
}

export interface OptionState {
  activeTab: OptionTab
}
export interface Segment {
  origin: string
  destination: string
  date: string
  stops: string[]
  duration: number
}

export interface Ticket {
  price: number
  carrier: string
  segments: Segment[]
}

export type TicketItem = Ticket[] | [];

export interface ResponseTicketData {
  stop: boolean
  tickets: TicketItem
}

export interface TicketState {
  items: TicketItem,
  stop: boolean
  isLoading: boolean
  displayItems: TicketItem
  displayItemsLength: number

}
