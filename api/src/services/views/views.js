import { db } from 'src/lib/db'

export const viewSelectList = async ({
  type,
  excludeIds,
  valueProp = 'id',
  labelProp = 'name',
}) => {
  const query = {
    where: {
      id: { notIn: excludeIds },
    },
    select: {
      [labelProp]: true,
      [valueProp]: true,
    },
  }
  const records = await db[type].findMany(query)
  return records.map((rec) => ({
    value: rec[valueProp],
    label: rec[labelProp],
  }))
}
