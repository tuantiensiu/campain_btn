import { db } from 'src/lib/db'

export const containerRoles = () => {
  return db.containerRole.findMany()
}

export const containerRole = ({ id }) => {
  return db.containerRole.findOne({
    where: { id },
  })
}

export const createContainerRole = ({ input }) => {
  return db.containerRole.create({
    data: input,
  })
}

export const updateContainerRole = ({ id, input }) => {
  return db.containerRole.update({
    data: input,
    where: { id },
  })
}

export const deleteContainerRole = ({ id }) => {
  return db.containerRole.delete({
    where: { id },
  })
}

export const ContainerRole = {
  container: (_obj, { root }) =>
    db.containerRole.findOne({ where: { id: root.id } }).container(),
}
