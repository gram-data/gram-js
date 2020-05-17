import isReachable from 'is-reachable';

import neo4j, { Driver } from 'neo4j-driver';
// import {map} from 'rxjs/operators';

export const connect = (connection: string): Promise<Driver> => {
  const neo4jUrl = new URL(connection);
  return new Promise(async (resolve, reject) => {
    await isReachable(neo4jUrl.host)
      .then(reachable => {
        if (!reachable) reject(`NetworkError: ${neo4jUrl.host} is unreachable`);
      })
      .catch(reason => {
        reject(reason);
      });
    const driver = neo4j.driver(
      neo4jUrl.toString(),
      neo4j.auth.basic('neo4j', 'marwhompa')
    );
    const promisedDbmsInfo = driver.verifyConnectivity();
    promisedDbmsInfo
      .then(() => {
        resolve(driver);
      })
      .catch(reason => {
        reject(reason);
      });
  });
};

export const fetch = (connection: string, cypher: string) => {
  return connect(connection).then(driver => {
    // const neo4jUrl = new URL(connection)
    const rxSession = driver.rxSession({
      database: 'neo4j',
      defaultAccessMode: neo4j.session.WRITE,
    });

    return rxSession.readTransaction(tx => tx.run(cypher).records());
  });
};
