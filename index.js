const { EventEmitter } = require('events');
const assert = require('assert');
const debug = require('debug')('cicp:cleaner');

class Cleaner extends EventEmitter {
  /**
   *
   * @constructor
   */
  constructor({ matcher, configLoader }) {
    super();
    debug('constructor');

    assert(matcher, 'Matcher must be present');
    this.matcher = matcher;
    assert(configLoader, 'ConfigLoader must be present');
    this.configLoader = configLoader;
  }

  /**
   * Set additional properties after object constructor
   *
   * @param {{logger: object}} param Additional Object
   */
  setInitialProperties({ logger, util }) {
    assert(logger, 'Logger must be present');
    this.logger = logger;
    assert(util, 'Util must be present');
    this.util = util;
  }

  option() {
    return {
      command: {
        short: 'c',
        long: 'cleaner',
        parameters: '<recordset>',
      },
      description: 'Clean a recordset to remove duplicate queries',
      callback: (args) => {
        this.openAndClean(args[0]);
      },
    };
  }

  /**
   * Open and clean a specific recordset
   *
   * @param {*} recordset
   * @memberof Cleaner
   */
  openAndClean(recordset) {
    debug(`openAndClean '${recordset}'->${recordset}-Cleaned`);
    const newRecordSet = `${recordset}-Cleaned`;

    this.configLoader.loadConfig(recordset);

    const requests = this.matcher.getRequests(recordset);
    debug(`Number of original requests: '${requests.length}'`);

    try {
      const uniqueRequest = requests.filter((request, index) => {
        const requestLight = this.matcher.buildObjectFromMatcher(request.general.matcher, request.req);

        // If current index is the same as the first found then keep it otherwise duplicate
        return index === requests.findIndex((obj) => {
          const objLight = this.matcher.buildObjectFromMatcher(obj.general.matcher, obj.req);

          return this.util.compareObject(objLight, requestLight);
        });
      });

      // debug(uniqueRequest.length);
      debug(`Unique requests detected: '${uniqueRequest.length}'`);

      if (uniqueRequest.length !== requests.length) {
        this.logger.info(`Clean request from ${requests.length} to ${uniqueRequest.length}`);
        this.matcher.setRequests(newRecordSet, uniqueRequest);

        this.configLoader.saveConfig(newRecordSet);
      } else {
        this.logger.info('Nothing to clean...');
      }
    } catch (e) {
      debug(e);
    }
  }
}

module.exports = function setup(options, imports, register) {
  const cleaner = new Cleaner(imports);

  register(null, {
    cleaner,
  });
};
