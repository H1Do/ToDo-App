import { Controller } from './controller';
import { Model } from './model';

export interface View {
  controller: Controller;
  model: Model;
}
