async function invokeApi(path, method, body) {
  const url = "https://s3dxt67z73.execute-api.us-east-1.amazonaws.com/api"+path;

  const funcHeaders = {'Content-Type': 'application/json'};
  const funcBody = JSON.stringify(body);
  const data = await fetch(url, {method, body: funcBody, headers: funcHeaders})
    .then(response => response);

  return data;
}

export default invokeApi;
