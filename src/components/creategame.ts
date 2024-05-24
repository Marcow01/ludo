import { FastifyInstance } from "fastify";
import { PrismaClient } from '@prisma/client'
import { customAlphabet } from "nanoid";

const prisma = new PrismaClient()

export function creategame(app: FastifyInstance) {
  app.post("/creategame", async (request, reply) => {

    const idfunction = customAlphabet('1234567890', 4);
    const generatedid = idfunction();
    const positions: (null | number)[] = new Array(52).fill(null);

    try {
      const newgame = await prisma.game.create({

        data: {
          id: generatedid,
          players: [],
          posicoes: positions,
        }
      });
      
      reply.send(newgame);
    } catch (error) {
      console.error(error);
      reply.status(400).send("erro ao criar o jogo");
    }
  });
}