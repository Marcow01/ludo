import { FastifyInstance } from "fastify";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export function creategame(app: FastifyInstance) {
  app.post("/creategame", async (request, reply) => {
    try {
      const newgame = await prisma.game.create({
        data: {
          uid: 1100120,
          players: [
            { name: "Player 1" },
            { name: "Player 2" }
          ],
          posicoes: [0, 0]
        }
      });

      //console.log(newgame);
      
      reply.send("Jogo criado com sucesso");
    } catch (error) {
      console.error(error);
      reply.status(400).send("Erro ao criar o jogo");
    }
  });
}