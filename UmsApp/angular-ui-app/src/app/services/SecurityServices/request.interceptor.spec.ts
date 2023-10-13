import { TestBed } from '@angular/core/testing';
import { RequestInterceptor } from './request.interceptor';

describe('RequestInterceptor', () => {
  let interceptor: RequestInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestInterceptor],
    });
    interceptor = TestBed.inject(RequestInterceptor);
  });

  it('should be created', () => {
    const interceptor: RequestInterceptor = TestBed.inject(RequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
