# Testes

Neste projeto serão realizados dois tipos de testes:

 - O **Teste de Software**, que utiliza uma abordadem de caixa preta, e tem por objetivo verificar a conformidade do software com os requisitos funcionais e não funcionais do sistema.
 - O **Teste de Usabilidade**, que busca avaliar a qualidade do uso do sistema por um usuário do público alvo. 

Se quiser conhecer um pouco mais sobre os tipos de teste de software, leia o documento [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/).

A documentação dos testes é dividida nas seguintes seções:

 - [Plano de Testes de Software](#plano-de-testes-de-software)
 - [Registro dos Testes de Software](#registro-dos-testes-de-software)
 - [Avaliação dos Testes de Software](#avaliação-dos-testes-de-software)
 - [Cenários de Teste de Usabilidade](#cenários-de-teste-de-usabilidade)
 - [Registro dos Testes de Usabilidade](#registro-dos-testes-de-usabilidade)
 - [Avaliação dos Testes de Usabilidade](#avaliação-dos-testes-de-usabilidade)

# Teste de Software

Nesta seção o grupo deverá documentar os testes de software que verificam a correta implementação dos requisitos funcionais e não funcionais do software.

## Plano de Testes de Software

Preencha a tabela com o plano dos testes. Para cada Caso de Teste (CT), associe qual o Requisito Funcional ou não funcional que ele está verificando. Associe também a página (ou artefato) onde o teste será realizado e descreva o cenário do teste. Veja a tabela de exemplo.


**Caso de Teste** | **CT01 - Cadastrar Conta**
 :--------------: | ------------
**Procedimento**  | 1) Acesse o endereço www.radarflorestal.com.br <br> 2) Clique em "Entrar". <br> 2) Preencha todos os campos do formulário. <br> 3) Clique no botão "Cadastrar".
**Requisitos associados** | RF-001
**Resultado esperado** | Cadastro Realizado com Sucesso
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT02 - Gerenciamento de Login**
 :--------------: | ------------
**Procedimento**  | 1) No Dashboard, clique em "Perfil" ou no ícone do usuário. <br> 2) Preencha o formulário com as novas informações. <br> 3) Clique no botão "Salvar". <br>
**Requisitos associados** | RF-002
**Resultado esperado** | Perfil Atualizado com Sucesso
**Dados de entrada** | Inserção de dados válidos no formulário de gerenciamento de login
**Resultado obtido** | Sucesso


**Caso de Teste** | **CT03 - Denunciar Anomalia**
 :--------------: | ------------
**Procedimento**  | 1) No Dashboard, clique no botão "Meus Alertas". <br> 2) Clique em "Novo Alerta". <br> 2) Preencha o formulário descrevendo o alerta. <br> 3) Clique no botão "Confirmar". <br> 4) Clique no local desejado do mapa.
**Requisitos associados** | RF-004
**Resultado esperado** | Novo Alerta Criado
**Dados de entrada** | Inserção da descrição e título do novo alerta
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT04 - Visualização do Mapa Interativo**
 :--------------: | ------------
**Procedimento**  | 1) No Dashboard, clique no botão "Meus Alertas". <br> 2) Desça a página. <br> 3) Mova, amplie ou afaste o mapa como desejar.
**Requisitos associados** | RF-005
**Resultado esperado** | Visualização do Mapa Interativo Concluído
**Dados de entrada** | Nenhum
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT05 - Visualizar Histórico de Ocorrências**
 :--------------: | ------------
**Procedimento**  | 1) No Dashboard, escolha o tipo de ocorrência. <br> 2) Desça a página. <br> 3) Visualize o histórico em "Alertas Recentes".
**Requisitos associados** | RF-006
**Resultado esperado** | Visualização do Histórico de Ocorrências Concluído
**Dados de entrada** | Nenhum
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT06 - Visualização de Conteúdo Informativo Sobre o Desmatamento**
 :--------------: | ------------
**Procedimento**  | 1) Acesse o endereço www.radarflorestal.com.br <br> 2) Clique em "Sobre", "Benefícios", "Depoimentos" ou desça a página. <br>
**Requisitos associados** | RF-007
**Resultado esperado** | Visualização de Conteúdo Informativo e Educativo Sobre o Desmatamento Concluído
**Dados de entrada** | Nenhum
**Resultado obtido** | Sucesso


## Registro dos Testes de Software

Esta seção deve apresentar o relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado no plano de testes pré-definido. Documente cada caso de teste apresentando um vídeo ou animação que comprove o funcionamento da funcionalidade. Veja os exemplos a seguir.

|*Caso de Teste*                                 |*CT01 - Criar conta parte 1*                                         |
|---|---|
|Requisito Associado | RF-001 - A aplicação deve permitir que os usuários criem uma conta e gerenciem seu cadastro|
|Link do vídeo do teste realizado: |https://drive.google.com/file/d/1m6SZKE1zZpWN-n38p3XOm6UD08mEGh8p/view?usp=sharing| 


## Avaliação dos Testes de Software

Os testes de software mostraram que todas as funcionalidades avaliadas estão funcionando corretamente, já que todos os casos de teste foram executados com sucesso e apresentaram o resultado esperado. Isso demonstra que o sistema atende bem aos requisitos definidos e que os fluxos principais foram implementados de forma consistente. Durante a execução, não foram identificados erros ou comportamentos inesperados, o que reforça a estabilidade geral da aplicação.

## Testes de unidade automatizados (Opcional)

Se o grupo tiver interesse em se aprofundar no desenvolvimento de testes de software, ele podera desenvolver testes automatizados de software que verificam o funcionamento das funções JavaScript desenvolvidas. Para conhecer sobre testes unitários em JavaScript, leia 0 documento  [Ferramentas de Teste para Java Script](https://geekflare.com/javascript-unit-testing/).

# Testes de Usabilidade

O objetivo do Plano de Testes de Usabilidade é obter informações quanto à expectativa dos usuários em relação à  funcionalidade da aplicação de forma geral.

Para tanto, elaboramos quatro cenários, cada um baseado na definição apresentada sobre as histórias dos usuários, definido na etapa das especificações do projeto.

Foram convidadas quatro pessoas que os perfis se encaixassem nas definições das histórias apresentadas na documentação, visando averiguar os seguintes indicadores:

Taxa de sucesso: responde se o usuário conseguiu ou não executar a tarefa proposta;

Satisfação subjetiva: responde como o usuário avalia o sistema com relação à execução da tarefa proposta, conforme a seguinte escala:

1. Péssimo; 
2. Ruim; 
3. Regular; 
4. Bom; 
5. Ótimo.

Tempo para conclusão da tarefa: em segundos, e em comparação com o tempo utilizado quando um especialista (um desenvolvedor) realiza a mesma tarefa.

Objetivando respeitar as diretrizes da Lei Geral de Proteção de Dados, as informações pessoais dos usuários que participaram do teste não foram coletadas, tendo em vista a ausência de Termo de Consentimento Livre e Esclarecido.

Apresente os cenários de testes utilizados na realização dos testes de usabilidade da sua aplicação. Escolha cenários de testes que demonstrem as principais histórias de usuário sendo realizadas. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)


## Cenários de Teste de Usabilidade

| Nº do Cenário | Objetivo | Descrição do cenário |
|---------------|----------|----------------------|
| 1             |Usuário criando um alerta de queimada pela primeira vez.| Um usuário leigo acessa o site após ver fumaça perto de casa. Ele tenta criar um alerta rapidamente, sem ler instruções detalhadas. Avaliar se ele encontra facilmente o botão de “Criar Alerta”, entende os campos obrigatórios e consegue enviar o alerta sem erros. |
| 2             | Usuário tentando confirmar se já existe um alerta próximo antes de criar outro. | O usuário acessa o site e, antes de criar um novo alerta, quer confirmar se alguém já publicou algo sobre aquela região. Ele usa busca, filtros e mapa interativo. Avaliar clareza visual, precisão e velocidade. |
| 3             | Usuário redigindo um fórum detalhando uma queimada já reportada | Após publicar um alerta, o usuário deseja criar um fórum relatando detalhes: hora, intensidade, direção do vento, possíveis riscos. Avaliar se o editor de texto é claro, se há categorias e se o usuário entende como vincular o fórum ao alerta correspondente. |
| 4             | Usuário acessando o site pelo celular em situação de emergência | A pessoa está no meio da rua, vê o incêndio e usa o celular com sinal ruim. Ela precisa abrir o site, identificar sua localização e criar o alerta rapidamente. Avaliar tempo de carregamento, adaptação da interface e se algo atrapalha a ação principal. |
| 5             | Moderador comunitário revisando alertas e fóruns | Um usuário engajado entra para verificar se novos alertas precisam de sinalização, se há duplicidade e se fóruns estão adequados. Avaliar se existem ferramentas para denunciar, organizar ou marcar conteúdos como relevantes. |



## Registro de Testes de Usabilidade

Cenário 1: Usuário criando um alerta de queimada pela primeira vez.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| Bruno     | SIM             | 4,5                   | 25.9 segundos                  |
| Edenilson | SIM             | 5                  | 19.15 segundos                  |
| Alice     | SIM             | 4,3                    | 39.09 segundos                  |
|  |  |  |  |
| **Média**     | 100%           | 4,6               | 28.04 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 12.5 segundos |


    Edenilson: Consegui criar o alerta, mas precisei procurar um pouco pelo botão. Depois que achei, o formulário foi simples, só que fiquei na dúvida sobre quais informações eram realmente obrigatórias. Seria bom ter uma explicação mais direta ou um destaque nos campos importantes. No geral funcionou.


Cenário 2: Usuário tentando confirmar se já existe um alerta próximo antes de criar outro.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| Bruno     | SIM             | 5                    | 15.54 segundos                          |
| Edenilson | SIM             | 3                    | 21.42 segundos                          |
| Alice     | SIM             | 4                    | 28.21 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.67                | 30.05 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 11.57 segundos |


    Bruno: Antes de criar meu alerta, tentei ver se já tinha algum na minha região. A busca funciona, mas fiquei meio perdido com os filtros. O mapa ajudou, só que demorou um pouco para carregar. Consegui confirmar que não havia alerta igual, mas poderia ser mais rápido e direto.


   Cenário 3: Usuário redigindo um fórum detalhando uma queimada já reportada.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| Bruno     | SIM             | 5                   | 17.55 segundos                          |
| Edenilson | SIM             | 4                    | 23.52 segundos                          |
| Alice     | SIM             | 3                   | 33.21 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.00                | 24.76 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 12.07 segundos |


    Alice: Gostei de como o alerta apareceu rápido, mas fiquei um pouco perdido tentando encontrar onde participar da discussão no fórum. Talvez deixar o botão mais visível ajudaria bastante. Fora isso, a informação sobre a queimada estava clara.
   
    Bruno: Consegui criar o fórum, mas demorei para entender como vincular meu texto ao alerta que já tinha feito. O editor é tranquilo de usar, só senti falta de alguma orientação sobre o que é importante detalhar. Depois que peguei o jeito, ficou fácil, mas no início foi meio confuso.

   Cenário 4: Usuário acessando o site pelo celular em situação de emergência.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| Bruno       | SIM             | 5                    | 15.54 segundos                          |
| Edenilson   | SIM             | 3                    | 21.42 segundos                          |
| Alice       | SIM             | 4                    | 28.21 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.00                | 30.05 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 10.57 segundos |


    Bruno: Tentei abrir o site pelo celular e funcionou, mas demorou um pouco para carregar com meu 4G ruim. Quando finalmente abriu, consegui criar o alerta. Nada impossível, só podia estar mais rápido num momento tenso.
    
    Edenilson: Usei o site no celular enquanto caminhava e deu certo.A localização automática funcionou, o que ajudou muito. Só que qualquer travadinha já deixa a gente nervoso numa situação dessas. Seria bom otimizar para quem não está parado e confortável.


   Cenário 5: Moderador comunitário revisando alertas e fóruns.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| Bruno       | SIM             | 5                    | 13.54 segundos                          |
| Edenilson   | SIM             | 4                    | 20.42 segundos                          |
| Alice       | SIM             | 5                    | 18.21 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.66                | 17.39 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 11.57 segundos |


    Alice: Entrei para dar uma olhada nos alertas novos e senti falta de uma forma mais rápida de identificar os que já foram verificados. Consegui revisar, mas ficou meio trabalhoso. Se tivesse um marcador mais claro, ajudaria bastante.
    
    Bruno: Tentei organizar alguns fóruns que estavam repetidos e até deu para fazer, mas faltou uma ferramenta mais direta para sinalizar isso. Acabei tendo que abrir vários posts para entender. Funciona, mas não é muito eficiente.”
    
    Edenilson: Revisar os alertas foi tranquilo, mas senti falta de um painel só para quem ajuda a moderar. Fiquei pulando entre páginas para conferir tudo. Nada grave, só deixa o processo lento.

## Avaliação dos Testes de Usabilidade

Os resultados mostram que a aplicação possui um desempenho sólido no que diz respeito à taxa de sucesso dos usuários. Todos os cenários foram concluídos sem falhas, indicando que as funcionalidades essenciais estão plenamente operacionais.

A satisfação subjetiva também se manteve em um nível alto. As médias de avaliação variaram de 4 a 5, o que demonstra que, apesar de alguns pontos de atenção, a experiência geral foi considerada positiva pelos participantes.

No entanto, ao comparar o tempo médio de execução entre os usuários e o especialista, surgem diferenças significativas em todos os cenários. Essa diferença é previsível, já que o especialista conhece profundamente a interface, a estrutura das páginas e o posicionamento dos elementos. Ainda assim, a discrepância chama atenção. Em alguns casos, o tempo do usuário chega a ser várias vezes maior que o do especialista, o que reforça a existência de barreiras de navegação ou clareza na interface.

Além disso, os comentários feitos pelos usuários indicam pontos específicos que podem ser aprimorados, como a localização de botões, a clareza de campos obrigatórios, o uso de filtros e a experiência em dispositivos móveis. Esses fatores sugerem oportunidades claras de melhoria na usabilidade, com foco especial em tornar o caminho do usuário mais intuitivo e direto.


