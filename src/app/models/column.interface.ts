import { User } from './User.interface';
export interface columnDef {
  def: string;
  header: string;
  cell: (params: User) => string;
}
