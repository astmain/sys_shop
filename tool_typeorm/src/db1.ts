import { DataSource } from "typeorm";
import { sys_menu } from "./entity/sys_menu";
import { sys_user } from "./entity/sys_user";
import { sys_depart } from "./entity/sys_depart";

export const db1_connect = new DataSource({
  type: "postgres",
  url: "postgresql://root:123456@103.119.2.223:2006/back?schema=public",
  entities: [sys_menu, sys_user, sys_depart],
  extra: { timezone: 'Asia/Shanghai' },
  synchronize: true,
  logging: false,
});


export const db1 = db1_connect.manager


name()
async function name() {
  const list = await db1_connect.getRepository(sys_depart).find({ where: { parent_id: "depart_1" }, select: ["name", "id"] })
  console.log(`list---`, list)
}



