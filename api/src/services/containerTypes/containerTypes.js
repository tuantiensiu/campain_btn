import { db } from 'src/lib/db'

export const containerTypes = () => {
  return db.containerType.findMany()
}

export const containerType = ({ id }) => {
  return db.containerType.findOne({
    where: { id },
  })
}

export const createContainerType = ({ input }) => {
  return db.containerType.create({
    data: input,
  })
}

export const updateContainerType = ({ id, input }) => {
  return db.containerType.update({
    data: input,
    where: { id },
  })
}

export const deleteContainerType = ({ id }) => {
  return db.containerType.delete({
    where: { id },
  })
}

export const ContainerType = {
  containers: (_obj, { root }) =>
    db.containerType.findOne({ where: { id: root.id } }).containers(),
}
