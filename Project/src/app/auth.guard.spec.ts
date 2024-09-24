import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: jasmine.createSpy().and.returnValue(true) // Mock AuthService
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate') // Mock Router
          }
        }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);  // Instantiate AuthGuard
    authService = TestBed.inject(AuthService);  // Get AuthService mock
    router = TestBed.inject(Router);  // Get Router mock
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow activation if the user is authenticated', () => {
    (authService.isAuthenticated as jasmine.Spy).and.returnValue(true);

    const result = authGuard.canActivate();

    expect(result).toBeTrue(); // Should allow navigation
  });

  it('should navigate to login if the user is not authenticated', () => {
    (authService.isAuthenticated as jasmine.Spy).and.returnValue(false);

    const result = authGuard.canActivate();

    expect(result).toBeFalse(); // Should block navigation
    expect(router.navigate).toHaveBeenCalledWith(['/login']); // Should redirect to login
  });
});
