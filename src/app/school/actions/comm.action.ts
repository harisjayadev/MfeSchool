import { ICommunication } from '../models/communication';

/**
 * Action to add an Communication
 */
export class AddCommunication {
  static readonly type = '[Communication] Add';

  constructor(public payload: ICommunication) {}
}

/**
 * Action to remove an Communication
 */
export class RemoveCommunication {
  static readonly type = '[Communication] Remove';

  constructor(public payload: ICommunication) {}
}
