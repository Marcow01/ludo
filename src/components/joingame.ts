import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface joingamerequest {
  id: string;
  player: string;
}

export function joingame(app: FastifyInstance) {
  app.post("/joingame", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id, player} = request.body as joingamerequest;
      
      const join = await prisma.game.update({
        where: {
          id: id, 
        },
        data: {
          players: player,
        },
      });
      
      reply.send(join);
    } catch (error) {
      console.error(error);
      reply.status(500).send("Erro ao atualizar o jogo");
    }
  });
}
