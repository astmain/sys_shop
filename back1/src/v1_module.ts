import { user_module } from '@src/v1/user/user'
import { auth_module } from '@src/v1/auth/auth'
import { depart_module } from '@src/v1/depart/depart'

export const v1_module = {
  title: 'v1',
  description: '版本1',
  imports: [
    //
    auth_module,
    user_module,
    depart_module,
  ],
}
