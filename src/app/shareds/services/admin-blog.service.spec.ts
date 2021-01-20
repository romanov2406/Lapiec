import { TestBed } from '@angular/core/testing';

import { AdminBlogService } from './admin-blog.service';

describe('AdminBlogService', () => {
  let service: AdminBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
