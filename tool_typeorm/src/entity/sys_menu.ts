import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, BeforeUpdate, AfterLoad } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Exclude, Expose } from 'class-transformer'
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiProperty, PickType } from '@nestjs/swagger'
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsNotEmptyObject, IsString, IsIn, IsBoolean, IsMobilePhone, Min, ValidateNested } from 'class-validator'

import { } from 'typeorm';

// 公共类
import { at_timestamp } from './common'



// ================================== Entity ==================================
@Entity('sys_menu')
export class sys_menu extends at_timestamp {
  constructor(user_data?: Partial<sys_menu>) {
    super()
    Object.assign(this, user_data)
  }

  @PrimaryColumn({ type: 'varchar', comment: '主键ID' })
  @ApiProperty({ description: '主键ID', example: 'uuid' })
  @IsString()
  menu_id: string = uuidv4()


  @Column()
  @ApiProperty({ description: '菜单名称', example: '首页' })
  @IsString()
  @IsNotEmpty()
  name: string

  @Column()
  @ApiProperty({ description: '路径', example: '/user/list' })
  @IsString()
  @IsNotEmpty()
  path: string


  @Column()
  @ApiProperty({ description: '类型', example: 'menu' })
  @IsString()
  @IsNotEmpty()
  @IsIn(['menu', 'button'])
  type: string


  @Column()
  @ApiProperty({ description: '备注', example: "" })
  @IsString()
  remark: string = ""


  @Column()
  @ApiProperty({ description: '状态', example: "1" })
  @IsBoolean()
  status: boolean = true


  // 自关联：父菜单 ID（可为空）
  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ description: '父菜单ID', example: 'uuid' })
  @IsString()
  parent_id: string | null;

  // 多对一：当前菜单 -> 父菜单
  @ManyToOne(() => sys_menu, (menu) => menu.children, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_id' }) // 显式指定外键列名
  parent: sys_menu | null;

  // 一对多：父菜单 -> 子菜单列表
  @OneToMany(() => sys_menu, (menu) => menu.parent)
  children: sys_menu[];


}



// ================================== dto ==================================
export class find_tree_menu extends PickType(sys_menu, ['path', 'type']) { }



// ================================== type ==================================
export type find_tree_menu_type = InstanceType<typeof find_tree_menu>;


