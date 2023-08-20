import http from 'k6/http';
import {sleep} from 'k6';

export default function(){
    var baseUrl = 'http://localhost:8080/api/users';

    http.get(baseUrl);
    sleep(1);
}