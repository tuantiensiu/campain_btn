# Migration `20210702150019-create-data-migrations`

This migration has been generated by Tien at 7/2/2021, 10:00:19 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `camp_banthi`.`Meta` (
`id` varchar(191) NOT NULL ,
`key` varchar(191) NOT NULL ,
`value` varchar(191) NOT NULL ,
`type` varchar(191) NOT NULL ,
`draftProfileId` varchar(191)  ,
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `camp_banthi`.`DraftProfile` (
`id` varchar(191) NOT NULL ,
`fullName` varchar(191) NOT NULL ,
`nationalId` varchar(191)  ,
`phoneNumber` varchar(191)  ,
`birthday` datetime(3)  ,
`activated` boolean NOT NULL DEFAULT true,
`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `camp_banthi`.`ContainerType` (
`id` varchar(191) NOT NULL ,
`slug` varchar(191) NOT NULL ,
`name` varchar(191) NOT NULL ,
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `camp_banthi`.`ContainerHost` (
`id` varchar(191) NOT NULL ,
`name` varchar(191) NOT NULL ,
`contact` varchar(191)  ,
`note` varchar(191)  ,
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `camp_banthi`.`Container` (
`id` varchar(191) NOT NULL ,
`slug` varchar(191)  ,
`name` varchar(191) NOT NULL ,
`note` varchar(191)  ,
`capacity` int  DEFAULT 0,
`updatedAt` datetime(3) NOT NULL ,
`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
`containerTypeId` varchar(191) NOT NULL ,
`containerHostId` varchar(191)  ,
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `camp_banthi`.`ContainerRole` (
`id` varchar(191) NOT NULL ,
`slug` varchar(191) NOT NULL ,
`name` varchar(191) NOT NULL ,
`containerId` varchar(191)  ,
`profileId` varchar(191)  ,
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `camp_banthi`.`ProfilesOnContainers` (
`containerId` varchar(191) NOT NULL ,
`profileId` varchar(191) NOT NULL ,
`note` varchar(191)  ,
`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
PRIMARY KEY (`containerId`,`profileId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `camp_banthi`.`RW_DataMigration` (
`version` varchar(191) NOT NULL ,
`name` varchar(191) NOT NULL ,
`startedAt` datetime(3) NOT NULL ,
`finishedAt` datetime(3) NOT NULL ,
PRIMARY KEY (`version`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE UNIQUE INDEX `ContainerType.slug_unique` ON `camp_banthi`.`ContainerType`(`slug`)

CREATE UNIQUE INDEX `ContainerRole.slug_unique` ON `camp_banthi`.`ContainerRole`(`slug`)

ALTER TABLE `camp_banthi`.`Meta` ADD FOREIGN KEY (`draftProfileId`) REFERENCES `camp_banthi`.`DraftProfile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE `camp_banthi`.`Container` ADD FOREIGN KEY (`containerHostId`) REFERENCES `camp_banthi`.`ContainerHost`(`id`) ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE `camp_banthi`.`Container` ADD FOREIGN KEY (`containerTypeId`) REFERENCES `camp_banthi`.`ContainerType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `camp_banthi`.`ContainerRole` ADD FOREIGN KEY (`containerId`, `profileId`) REFERENCES `camp_banthi`.`ProfilesOnContainers`(`containerId`,`profileId`) ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE `camp_banthi`.`ProfilesOnContainers` ADD FOREIGN KEY (`containerId`) REFERENCES `camp_banthi`.`Container`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `camp_banthi`.`ProfilesOnContainers` ADD FOREIGN KEY (`profileId`) REFERENCES `camp_banthi`.`DraftProfile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20210702150019-create-data-migrations
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,88 @@
+datasource DS {
+  provider = "mysql"
+  url = "***"
+}
+
+generator client {
+  provider      = "prisma-client-js"
+  binaryTargets = env("BINARY_TARGET")
+}
+
+model Meta {
+  id             String        @id @default(cuid())
+  key            String
+  value          String
+  type           String
+  DraftProfile   DraftProfile? @relation(fields: [draftProfileId], references: [id])
+  draftProfileId String?
+}
+
+model DraftProfile {
+  id          String                 @id @default(cuid())
+  fullName    String
+  nationalId  String?
+  phoneNumber String?
+  birthday    DateTime?
+  meta        Meta[]
+  activated   Boolean                @default(value: true)
+  createdAt   DateTime               @default(now())
+  containers  ProfilesOnContainers[]
+}
+
+model ContainerType {
+  id         String      @id @default(cuid())
+  slug       String      @unique
+  name       String
+  containers Container[]
+}
+
+model ContainerHost {
+  id         String      @id @default(cuid())
+  name       String
+  contact    String?
+  note       String?
+  containers Container[]
+}
+
+model Container {
+  id              String                 @id @default(cuid())
+  slug            String?
+  name            String
+  note            String?
+  profiles        ProfilesOnContainers[]
+  host            ContainerHost?         @relation(fields: [containerHostId], references: [id])
+  type            ContainerType          @relation(fields: [containerTypeId], references: [id])
+  capacity        Int?                   @default(value: 0)
+  updatedAt       DateTime               @updatedAt
+  createdAt       DateTime               @default(now())
+  containerTypeId String
+  containerHostId String?
+}
+
+model ContainerRole {
+  id          String                @id @default(cuid())
+  slug        String                @unique
+  name        String
+  container   ProfilesOnContainers? @relation(fields: [containerId, profileId], references: [containerId, profileId])
+  containerId String?
+  profileId   String?
+}
+
+model ProfilesOnContainers {
+  container   Container       @relation(fields: [containerId], references: [id])
+  containerId String
+  profile     DraftProfile    @relation(fields: [profileId], references: [id])
+  profileId   String
+  role        ContainerRole[]
+  note        String?
+  createdAt   DateTime        @default(now())
+
+  @@id([containerId, profileId])
+}
+
+model RW_DataMigration {
+  version    String   @id
+  name       String
+  startedAt  DateTime
+  finishedAt DateTime
+}
```


