import { TestBed } from '@angular/core/testing';

import { FirestoreNOSQLService } from './firestore-nosql.service';

describe('FirestoreNOSQLService', () => {
  let service: FirestoreNOSQLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreNOSQLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
