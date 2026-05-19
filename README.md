# Duelo de Capitais

Jogo PvP local 1x1 para acertar capitais com pressão de tempo, dificuldade progressiva, combos e pontuação por velocidade.

## Modos

- Capitais de países
- Capitais dos estados brasileiros
- Misturado

## Como jogar

Abra o arquivo `index.html` no navegador, informe os nomes dos jogadores, escolha a quantidade de rodadas e selecione o tipo de desafio.

Cada jogador responde uma pergunta por vez. Quem acertar mais capitais vence a partida.

## Mecânicas competitivas

- Perguntas com dificuldade: fácil, médio, difícil e insano.
- Cronômetro por turno, com menos tempo nas perguntas mais difíceis.
- Pontuação por dificuldade, bônus de velocidade e multiplicador de combo.
- Rodadas especiais: Relâmpago e Tudo ou Nada.
- Morte súbita automática em caso de empate.
- Estatísticas finais com precisão, maior combo, resposta mais rápida e maior golpe.

## Verificação

As regras centrais têm testes automatizados com o runner nativo do Node:

```bash
node --test game-core.test.js
```
