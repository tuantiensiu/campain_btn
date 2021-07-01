import { db } from 'src/lib/db'

export const metas = () => {
  return db.meta.findMany()
}

export const metaByKey = async ({ key, profileId }) => {
  const metaArray = await db.meta.findMany({
    where: {
      draftProfileId: profileId,
      key,
    },
  })
  if (metaArray.length > 0) {
    return metaArray[0]
  }
  return null
}

export const meta = ({ id }) => {
  return db.meta.findOne({
    where: { id },
  })
}

export const createMeta = ({ input }) => {
  return db.meta.create({
    data: input,
  })
}

export const updateMeta = ({ id, input }) => {
  return db.meta.update({
    data: input,
    where: { id },
  })
}

export const deleteMeta = ({ id }) => {
  return db.meta.delete({
    where: { id },
  })
}

export const Meta = {
  DraftProfile: (_obj, { root }) =>
    db.meta.findOne({ where: { id: root.id } }).DraftProfile(),
}
