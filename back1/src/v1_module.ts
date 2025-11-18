import { user_module } from '@src/v1/user/user'
import { auth_module } from '@src/v1/auth/auth'
import { depart_module } from '@src/v1/depart/depart'
import { menu_module } from '@src/v1/menu/menu'

export const v1_module = {
  title: 'v1',
  description: '版本1',
  imports: [
    //
    auth_module,
    user_module,
    depart_module,
    menu_module,
  ],
}
