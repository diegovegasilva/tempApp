import * as fromActions from '../actions/customer.actions';
import * as _ from 'lodash';

import { Customer } from '../../shared/models/customer.model';

export interface State {
  customers: Customer[];
  customer: Customer;
  selectedCustomer: Customer;
}

const initialState: State = {
  customers: [],
  customer: undefined,
  selectedCustomer: undefined
};

export function customerReducer(
  state: State = initialState,
  action: fromActions.Actions
): State {
  switch (action.type) {
    case fromActions.CUSTOMERS_STORE_ADD:
      return Object.assign({}, state, {
        customers: action.payload
      });
    case fromActions.CUSTOMER_STORE_ADD:
      return Object.assign({}, state, {
        customers: state.customers,
        customer: action.payload
      });
    case fromActions.CUSTOMER_STORE_UPDATE:
      const updateCustomers = state.customers.map(customer => {
        if (customer.id !== action.payload.id) {
          return customer;
        }
        return {
          ...customer,
          ...action.payload
        };
      });
      return Object.assign({}, state, {
        customers: updateCustomers,
        customer: action.payload
      });
    case fromActions.CUSTOMER_STORE_REMOVE:
      const filteredCustomers = _.filter(state.customers, customer => customer.id !== action.payload);
      return Object.assign({}, state, {
        customers: filteredCustomers
      });
    default:
      return state;
  }
}

// slices of state
export const getCustomers = (state: State) => state.customers;
export const getCustomer = (state: State) => state.customer;
export const getSelectedCustomer = (state: State) => state.selectedCustomer;
