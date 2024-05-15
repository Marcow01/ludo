import fastify from 'fastify'
import { creategame } from './components/creategame';
import { joingame } from './components/joingame';

const server = fastify()

creategame(server);
joingame(server);

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})