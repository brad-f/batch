import _ from 'lodash';
import uuid from 'node-uuid';
import events from 'events';

class Batch extends events.EventEmitter {
  constructor(options) {
    super();
    _.assign(this, { batchId: uuid.v4() }, options);
  }

  start() {
    this.emit('started', { batchId: this.batchId });
  }
};

export default Batch;


