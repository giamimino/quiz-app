import Header from './header'
import prisma from '@/lib/prisma'

export default async function HeaderWrapper() {
  const players = await prisma.points.findMany();
  return <Header players={players} />
}