import { authService } from './authService';
import { userService } from './userService';
import { orderService } from './orderService';
import { catalogService } from './catalogService';
import { settingsService } from './settingsService';

export const api = {
  ...authService,
  ...userService,
  ...orderService,
  ...catalogService,
  ...settingsService
};
