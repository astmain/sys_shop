import { Entity, PrimaryColumn, Column, BeforeInsert } from 'typeorm'
import { tb_test1_zod_i } from '../tb_type/tb_test1_zod'

type tb_test1_constructor_data = {
  id?: string
  name?: string
}

@Entity('tb_test1')
export class tb_test1 implements tb_test1_zod_i {
  @PrimaryColumn({ type: 'varchar', comment: '主键ID，可以是自定义字符串' })
  id?: string

  @Column({ comment: '名称' })
  name: string

  constructor(data?: tb_test1_constructor_data) {
    Object.assign(this, data)
  }

  @BeforeInsert()
  private set_default_id(): void {
    this.id ??= tb_test1.create_id()
  }

  private static create_id(): string {
    return `${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
  }
}
