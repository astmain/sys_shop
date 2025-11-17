// 通过id找到自身id和父亲级id
export async function db_find_ids_self_and_parent({ db, table_name, ids }: { db: any, table_name: string, ids: string[] }) {
    if (ids.length === 0) {
        return []
    }
    const result: any = await db.query(
        `WITH RECURSIVE tb_temp AS 
        ( SELECT id,parent_id, 0 as level FROM ${table_name} WHERE id = ANY($1)
          UNION ALL
          SELECT m.id,m.parent_id,mh.level + 1  AS level FROM ${table_name} m INNER JOIN tb_temp mh ON m.id = mh.parent_id WHERE mh.level < 10
        )
        SELECT DISTINCT id FROM tb_temp ORDER BY id`,
        [ids]
    )
    return result.map((o: any) => o.id)
}

