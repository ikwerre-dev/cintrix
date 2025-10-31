import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'

const prisma = new PrismaClient()

async function main() {
  const wards = [
    { name: 'Emergency Department', capacity: 32, occupied: 26 },
    { name: 'ICU', capacity: 18, occupied: 16 },
    { name: 'General Medicine', capacity: 40, occupied: 34 },
    { name: 'Surgical', capacity: 28, occupied: 22 },
    { name: 'Pediatrics', capacity: 24, occupied: 19 },
  ]

  for (const w of wards) {
    await prisma.ward.upsert({
      where: { name: w.name },
      update: { capacity: w.capacity, occupied: w.occupied },
      create: { name: w.name, capacity: w.capacity, occupied: w.occupied },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('Seed completed')
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })