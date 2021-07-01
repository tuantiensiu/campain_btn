import { db } from 'src/lib/db'

export const containerHosts = () => {
  return db.containerHost.findMany()
}

export const containerHost = ({ id }) => {
  return db.containerHost.findOne({
    where: { id },
  })
}

export const createContainerHost = ({ input }) => {
  return db.containerHost.create({
    data: input,
  })
}

export const updateContainerHost = ({ id, input }) => {
  return db.containerHost.update({
    data: input,
    where: { id },
  })
}

export const deleteContainerHost = ({ id }) => {
  return db.containerHost.delete({
    where: { id },
  })
}

export const ContainerHost = {
  containers: (_obj, { root }) =>
    db.containerHost.findOne({ where: { id: root.id } }).containers(),
}
