import * as Realm from 'realm-web';
import { SNOOTY_STITCH_ID } from '../build-constants';

const config = {
  id: SNOOTY_STITCH_ID,
};
const app = new Realm.App(config);

const loginAnonymous = async () => {
  const credentials = Realm.Credentials.anonymous();
  try {
    const user = await app.logIn(credentials);
    return user;
  } catch (err) {
    console.error('Failed to log in', err);
  }
};

const fetchData = async (funcName, ...argsList) => {
  if (!app.currentUser) {
    await loginAnonymous();
  }
  return app.currentUser.callFunction(funcName, ...argsList);
};

export const fetchBanner = async (snootyEnv) => {
  return fetchData('getBanner', snootyEnv === 'development');
};

export const fetchProjectParents = async (database, project) => {
  return fetchData('fetchProjectParents', database, project);
};

export const fetchSearchPropertyMapping = async (snootyEnv) => {
  return fetchData('fetchSearchPropertyMapping', snootyEnv);
};

export const fetchOASFile = async (apiName, database) => {
  return fetchData('fetchOASFile', apiName, database);
};

export const fetchDocument = async (database, collectionName, query) => {
  return fetchData('fetchDocument', database, collectionName, query);
};

export const fetchDocuments = async (database, collectionName, query) => {
  return fetchData('fetchDocuments', database, collectionName, query);
};
