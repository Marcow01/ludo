import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

interface dicerequest {
  id: string;
  player: string;
}

export function dice(app: FastifyInstance){
  app.post("/dice", async (request: FastifyRequest, reply: FastifyReply) => {

    const { id, player } = request.body as dicerequest;
    const dice = Math.floor(Math.random() * 6) + 1;

    const game = await prisma.game.findUnique({
      where: {
        id: id,
      }
    })

    const jogadores = game?.players as Array<{ name: string, position: number }>;
    const posicoes = game?.posicoes as Prisma.JsonArray;
    let posicao = -1;

    for(let i = 0; i < 4; i++){
      if(jogadores[i].name == player){
        posicao = i;
        break
      }
    }

    if(jogadores[posicao].position >= 0){
      posicao = posicao + dice
    }
    
    if(jogadores[posicao].position == -1 && dice == 6){
      jogadores[posicao].position = 0;
      console.log(jogadores[posicao].position)
    }

    console.log(posicoes)
    
    const updateposition = await prisma.game.update({
      where: {
        id: id
      }, 
      data: {
        posicoes: posicoes as Prisma.InputJsonArray
      }
    })
    
    console.log(updateposition)
    console.log("dice: ", dice)
    reply.send(dice)
  })
}