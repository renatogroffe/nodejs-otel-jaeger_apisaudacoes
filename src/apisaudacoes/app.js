// Para executar a aplicacao execute o seguinte comando
// node --env-file=.env app.js

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { trace } = require('@opentelemetry/api');

registerInstrumentations({
    instrumentations: [
      getNodeAutoInstrumentations({
        // load custom configuration for http instrumentation
        '@opentelemetry/instrumentation-http': {
        },
      }),
    ],
  });
  

const PORT = parseInt(process.env.PORT || '8080');
const app = express();

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get('/mensagem-geral', (req, res) => {
  console.log('');
  console.log('Gerada saudacao em /mensagem-geral...');
  res.send("Olá, mundo! Esta é uma mensagem de teste. Use quando puder OpenTelemetry!");
});

app.get('/mensagem-contagem', async (req, res) => {
  try {
    const response = await axios.get(process.env.URL_API_CONTAGEM);
    const { valorAtual: valorAtual1 } = response.data;
    console.log('');
    console.log('Payload retornado para /mensagemcontagem:');
    console.log(response.data);

    const response2 = await axios.get(process.env.URL_API_CONTAGEM);
    const { valorAtual: valorAtual2 } = response2.data;
    console.log('');
    console.log('2o. Payload retornado para /mensagemcontagem:');
    console.log(response2.data);

    res.send(`Ola!!! O primeiro valor foi: ${valorAtual1} | Ja o segundo valor foi: ${valorAtual2}`);
  } catch (error) {
    console.error('Erro ao chamar o endpoint /contador:', error.message);
    res.status(500).send('Erro ao obter o valor atual.');
  }
});

app.listen(PORT, () => {
  console.log(`Esperando requisicoes em http://localhost:${PORT}`);
});