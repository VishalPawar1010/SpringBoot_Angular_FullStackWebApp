import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1s', target: 20 },
    { duration: '3s', target: 10 },
    { duration: '2s', target: 0 },
  ],
};



export default function () {
  var baseUrl = 'http://localhost:4200/users';
  // http.get(baseUrl);

  const res = http.get(baseUrl);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
