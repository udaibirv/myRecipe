export default function (token) {
  const [, encodedPayload] = token.split('.');
  const jasonPayload = atob(encodedPayload);
  const payload = JSON.parse(jasonPayload);
  return payload;

}
