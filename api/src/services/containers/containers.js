import { db } from 'src/lib/db'
import khongdau from 'khong-dau'

export const containers = ({ containerTypeId }) => {
  // return db.container.findMany({ select: { type: true, host: true } })
  return db.container.findMany({
    where: {
      containerTypeId,
    },
    orderBy: {
      name: 'asc',
    },
  })
}

export const container = ({ id }) => {
  return db.container.findOne({
    where: { id },
  })
}

export const createContainer = async ({ input }) => {
  const { containerTypeId, containerHostId, ...params } = input
  const cType = await db.containerType.findOne({
    where: { id: containerTypeId },
  })
  const cHost = containerHostId
    ? await db.containerHost.findOne({
        where: { id: containerHostId },
      })
    : null

  const connectWithType = {
    type: {
      connect: { id: cType.id },
    },
  }
  const connectWithHost = cHost
    ? {
        host: {
          connect: { id: cHost.id },
        },
      }
    : undefined
  const connect = {
    ...connectWithType,
    ...connectWithHost,
  }

  if (cType) {
    const slug = `${cType.slug}::${khongdau(params.name)
      .replace(/\s/g, '_')
      .toUpperCase()}`

    return db.container.create({
      data: {
        ...params,
        ...connect,
        slug,
      },
    })
  } else {
    throw new Error('Not found container type')
  }
}

export const updateContainer = async ({ id, input }) => {
  const { containerTypeId, containerHostId, ...params } = input
  const cType = await db.containerType.findOne({
    where: { id: containerTypeId },
  })
  const cHost = containerHostId
    ? await db.containerHost.findOne({
        where: { id: containerHostId },
      })
    : null

  const connectWithType = {
    type: {
      connect: { id: cType.id },
    },
  }
  const connectWithHost = cHost
    ? {
        host: {
          connect: { id: cHost.id },
        },
      }
    : undefined
  const connect = {
    ...connectWithType,
    ...connectWithHost,
  }

  if (cType) {
    const slug = `${cType.slug}::${khongdau(params.name)
      .replace(/\s/g, '_')
      .toUpperCase()}`

    return db.container.update({
      where: { id },
      data: {
        ...params,
        ...connect,
        slug,
      },
    })
  } else {
    throw new Error('Not found container type')
  }
}

export const deleteContainer = ({ id }) => {
  return db.container.delete({
    where: { id },
  })
}

export const attachProfileToContainer = async ({ containerId, profileId }) => {
  try {
    const profileOnContainer = await db.profilesOnContainers.create({
      data: {
        profile: {
          connect: { id: profileId },
        },
        container: {
          connect: { id: containerId },
        },
      },
    })
    if (profileOnContainer) {
      return true
    }
    return false
  } catch (err) {
    return false
  }
}

export const attachProfilesToContainer = async ({
  containerId,
  profileIds,
}) => {
  try {
    const map = profileIds.map((profileId) =>
      attachProfileToContainer({ containerId, profileId })
    )
    await Promise.all(map)
    return true
  } catch (error) {
    return false
  }
}

export const detachProfileFromContainer = async ({
  containerId,
  profileId,
}) => {
  try {
    await db.profilesOnContainers.delete({
      where: {
        containerId_profileId: {
          containerId,
          profileId,
        },
      },
    })
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

// export const updateContainerProfileNote = ({
//   containerId,
//   profileId,
//   note,
// }) => {
//   return db.profilesOnContainers.update({
//     where: {
//       containerId_profileId: {},
//     },
//   })
// }

export const Container = {
  profiles: async (_obj, { root }) => {
    const temp = await db.container
      .findOne({ where: { id: root.id } })
      .profiles({ select: { profile: true, container: true } })
    console.log(temp, null, 2)
    return temp
  },
  host: (_obj, { root }) =>
    db.container.findOne({ where: { id: root.id } }).host(),
  type: (_obj, { root }) =>
    db.container.findOne({ where: { id: root.id } }).type(),
}
