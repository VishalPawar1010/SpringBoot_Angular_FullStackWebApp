import http from 'k6/http';
import {sleep, check} from 'k6';

export const options={
    vus : 1,
    duration: '1s',
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        // http_req_duration: ['p(95)<500'], // 95% of requests should be below 200ms
        http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],


    },
}

export default function(){
    // http://localhost:8080/api/login
    const baseUrl = 'http://localhost:8080/api/login';
    const payload = JSON.stringify({
        email: "vshalofficial@gmail.com",
        password : "admin@123",
    });

    const params={
        headers :{
            'Content-Type' : 'application/json',
        },
    };

   const res= http.post(baseUrl, payload, params);
   check(res,{
    'is status 200': (r) => r.status ===200,
    'is res body has token' : (r) => r.body.includes('token'),
   });

    sleep(1);
}