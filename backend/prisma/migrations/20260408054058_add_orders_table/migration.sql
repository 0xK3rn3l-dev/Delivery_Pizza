-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "price" BIGINT NOT NULL,
    "time_order" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "checkout" TEXT NOT NULL,
    "adress_destination" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "phone_customer" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
