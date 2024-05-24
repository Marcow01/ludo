import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface joingamerequest {
  id: string;
  player: string;
}

const colors = {
  red: 10,
  green: 12,
  blue: 14,
  yellow: 16
}

export function joingame(app: FastifyInstance) {
  app.post("/joingame", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id, player } = request.body as joingamerequest;

      const playersingame = await prisma.game.findUnique({
        where: {
          id: id,
        },
        select: {
          players: true
        }
      });

      if (!playersingame) {
        reply.status(404).send("jogo nao encontrado");
        return;
      }

      //verifica a quantidade de players no jogo, e adiciona um com o array de cores

      let updatedplayers: any = playersingame.players;
      if (Array.isArray(updatedplayers)) {
        updatedplayers = [...updatedplayers, { name: player, position: -1 }];
      } else {
        updatedplayers = [{ name: player, position: -1 }];
      }

      const join = await prisma.game.update({
        where: {
          id: id, 
        },
        data: {
          players: updatedplayers,
        },
      });
      
      reply.send(join);
    } catch (error) {
      reply.status(500).send("erro ao entrar no jogo");
    }
  });
}
