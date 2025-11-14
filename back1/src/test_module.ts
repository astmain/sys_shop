import { ajax_module } from '@src/test/ajax/ajax'
import { test_decimal_module } from '@src/test/test_decimal/test_decimal'
import { test_db_module } from '@src/test/test_db/test_db'
import { test_typeorm_module } from '@src/test/test_typeorm/test_typeorm'

export const test_module = {
  title: 'test',
  description: '测试接口',
  imports: [ajax_module, test_decimal_module, test_db_module, test_typeorm_module],
}
