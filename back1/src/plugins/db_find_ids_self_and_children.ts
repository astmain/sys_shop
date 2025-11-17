// 通过id找到自身id和父亲级id
export async function db_find_ids_self_and_children({ db, table_name, id }: { db: any, table_name: string, id: string }) {
    const result: any = await db.query(`
        WITH RECURSIVE tb_temp AS 
        ( SELECT id, parent_id FROM ${table_name}  WHERE id = '${id}'

          UNION ALL

          SELECT t1.id, t1.parent_id  FROM ${table_name} t1 INNER JOIN tb_temp t2 ON t1.parent_id = t2.id
        )
          SELECT   DISTINCT id  FROM tb_temp;
    `)
    const ids = result.map((o: any) => o.id)
    return ids
}

