-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "emailId" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "pincode" TEXT,
    "password" TEXT NOT NULL,
    "refreshToken" TEXT,
    "photo" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SOS" (
    "sosid" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "observer" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SOS_pkey" PRIMARY KEY ("sosid")
);

-- CreateTable
CREATE TABLE "Favlist" (
    "userid" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "relation" TEXT NOT NULL,

    CONSTRAINT "Favlist_pkey" PRIMARY KEY ("userid","phone")
);

-- CreateTable
CREATE TABLE "CrimeReport" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "medialink" TEXT,
    "mediatype" TEXT,
    "observer" TEXT,
    "status" TEXT NOT NULL,
    "crimetime" TIMESTAMP(3) NOT NULL,
    "reporttime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CrimeReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminSosRec" (
    "datetime" TIMESTAMP(3) NOT NULL,
    "adminid" TEXT NOT NULL,
    "sosid" TEXT NOT NULL,

    CONSTRAINT "AdminSosRec_pkey" PRIMARY KEY ("adminid","sosid","datetime")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailId_key" ON "User"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- AddForeignKey
ALTER TABLE "SOS" ADD CONSTRAINT "SOS_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SOS" ADD CONSTRAINT "SOS_observer_fkey" FOREIGN KEY ("observer") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favlist" ADD CONSTRAINT "Favlist_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrimeReport" ADD CONSTRAINT "CrimeReport_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrimeReport" ADD CONSTRAINT "CrimeReport_observer_fkey" FOREIGN KEY ("observer") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminSosRec" ADD CONSTRAINT "AdminSosRec_adminid_fkey" FOREIGN KEY ("adminid") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminSosRec" ADD CONSTRAINT "AdminSosRec_sosid_fkey" FOREIGN KEY ("sosid") REFERENCES "SOS"("sosid") ON DELETE RESTRICT ON UPDATE CASCADE;
