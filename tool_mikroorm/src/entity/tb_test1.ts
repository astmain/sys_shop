import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity({ tableName: 'tb_test1' })
export class tb_test1 {
  @PrimaryKey({ type: 'varchar' })
  id: string

  @Property({ type: 'varchar' })
  name: string


  @Property({ type: 'varchar' })
  age: string
}

