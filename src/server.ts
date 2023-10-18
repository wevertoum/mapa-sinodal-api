import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { getAllIgrejas, getIgrejaById } from "./routes/igreja";

const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app.register(getAllIgrejas);
app.register(getIgrejaById);

app
  .listen({
    port: 8080,
  })
  .then(() => {
    console.log("Server is running on port 8080");
  });
