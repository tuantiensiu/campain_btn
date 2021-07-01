import { db } from 'src/lib/db'
import _ from 'lodash'

// export const stats = async () => {
//   const profiles = await db.draftProfile
//     .findMany({ orderBy: { createdAt: 'asc' } })
//     .select({ meta: true })
// }

const mapArrayAsKeys = (params) =>
  _.chain(params).keyBy('key').mapValues('value').value()

export const draftProfiles = ({ orderBy }) => {
  return db.draftProfile.findMany({
    orderBy: { [orderBy || 'createdAt']: 'asc' },
  })
}

export const draftProfile = ({ id }) => {
  return db.draftProfile.findOne({
    where: { id },
  })
}

export const createDraftProfile = ({ input }) => {
  return db.draftProfile.create({
    data: input,
  })
}

export const updateDraftProfile = ({ id, input }) => {
  return db.draftProfile.update({
    data: input,
    where: { id },
  })
}

export const deleteDraftProfile = ({ id }) => {
  return db.draftProfile.delete({
    where: { id },
  })
}

export const DraftProfile = {
  meta: (_obj, { root }) =>
    db.draftProfile.findOne({ where: { id: root.id } }).meta(),
  metaByKeys: async (_obj, { root }) => {
    const pickKeys = _obj.keys.split(',').map((x) => x.trim())
    const metaArray = await db.draftProfile
      .findOne({ where: { id: root.id } })
      .meta()
    const metaObject = mapArrayAsKeys(
      metaArray.filter((m) => pickKeys.indexOf(m.key) > -1)
    )
    return JSON.stringify(metaObject)
  },
  containers: (_obj, { root }) =>
    db.draftProfile
      .findOne({ where: { id: root.id } })
      .containers({ select: { profile: true, container: true } }),
}
