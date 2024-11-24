const dataStore = new Map();  // storing data based on key
const pendingClientReq = new Map(); // string requested clients based on key

export async function blockingGet(key) {
    if (dataStore.has(key)) { // if data is available corresponding to the key then response
      const data = dataStore.get(key);
      dataStore.delete(key);
      return data;
    }

    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        if (pendingClientReq.has(key)) {
          const requests = pendingClientReq.get(key);
          const index = requests.findIndex((req) => req.resolver === resolve);
          if (index !== -1) {
            requests.splice(index, 1);
            if (requests.length === 0) {
              pendingClientReq.delete(key);
            }
          }
        }
        resolve(null);
      }, 40000);
        
      // for the client
      const request = {
        resolver: resolve, // resolve when data is available
        timeout: timeout,
      };
        
      if (!pendingClientReq.has(key)) {
        pendingClientReq.set(key, []);
      }
      pendingClientReq.get(key).push(request); // client waiting for the data associated with the key
    });
}

export async function push(key, data) {}
