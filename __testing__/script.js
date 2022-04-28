import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
    scenarios: {
      constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s',
      preAllocatedVUs: 20,
      maxVUs: 100,
      duration: '60s'
      }
    }
};

export default function() {
  http.get('http://localhost:3002/reviews');
}