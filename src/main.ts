import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const whitelist = ['https://webservice.com', 'https://www.webservice.com'];
  app.enableCors({
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      console.log("allowed cors for:", origin)
      callback(null, true)
    } else {
      console.log("blocked cors for:", origin)
      callback(new Error('Not allowed by CORS'))
    }
    callback(null, true)
  },
  allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
  methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
  credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
