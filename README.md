# nodejs-otel-jaeger_apisaudacoes
Exemplo de API REST criada com o Node.js e utilizando Distributed Tracing com Jaeger + OpenTelemetry (configurando porta do Collector), além de consumir uma API REST que depende de bases PostgreSQL + MySQL. Inclui o uso de Docker Compose para a subida de ambiente que faz uso do projeto Jaeger e do serviço OpenTelemetry Collector.

API Consumida por esta aplicação: **https://github.com/renatogroffe/aspnetcore9-otel-jaeger-postgres-mysql_apicontagem**

Para executar esta aplicação execute a partir de **/src/apisaudacoes**

```bash
node --env-file=.env app.js
```