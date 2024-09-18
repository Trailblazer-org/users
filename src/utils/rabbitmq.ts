import amqplib from "amqplib";
import { env } from "./env";

export async function rabbitmq() {
  // create queue
  const queue = "userLoggedIn";

  // create connection to rabbitmq
  const connection = await amqplib.connect(env.RABBITMQ_URI);
  // create channel
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, {
    durable: false,
  });

  return channel;
}
