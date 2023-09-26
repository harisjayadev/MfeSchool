import { ICommunication } from '../models/communication';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AddCommunication, RemoveCommunication } from '../actions/comm.action';
import { container } from 'webpack';

export class CommunicationStateModel {
  communications!: ICommunication[];
}

/**
 * The communicationsState
 */
@State<CommunicationStateModel>({
  name: 'communications',
  defaults: {
    communications: [],
  },
})
@Injectable()
export class CommunicationState {
  /**
   * Selector to get communicationss from the application state
   * @param state: the application state
   */
  @Selector()
  static getCommunications(state: CommunicationStateModel): ICommunication[] {
    return state.communications;
  }

  /**
   * Add an communications to the application state
   *
   * @param param0: state context
   * @param param1: playload of AddCommunication action
   */
  @Action(AddCommunication)
  add(
    { getState, patchState, setState }: StateContext<CommunicationStateModel>,
    { payload }: AddCommunication,
  ): void {
    const state = getState();
    if (state?.communications) {
      patchState({
        communications: [...state.communications, payload],
      });
    } else {
      setState({
        communications: [payload],
      });
    }
  }

  /**
   * Remove an Communication from the application state
   *
   * @param param0: state context
   * @param param1: playload of AddCommunication action
   */
  @Action(RemoveCommunication)
  remove({ getState, setState }: StateContext<CommunicationStateModel>, { payload }: AddCommunication): void {
    const state = getState();
    if (state?.communications) {
      setState({
        communications: state.communications.filter(u => !(u.notes === payload.notes && u.name === payload.name)),
      });
      console.log(
        'state',
        payload,
        state.communications.filter(u => !(u.notes == payload.notes && u.name == payload.name)),
      );
    }
  }
}
