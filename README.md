# 🧮 Matemática Divertida - App para Crianças

> **Desenvolvido com AWS Amazon Q CLI** 🤖

Um aplicativo educativo interativo para ensinar matemática básica para crianças de forma divertida e colorida, otimizado para dispositivos móveis.

## 📱 Características Principais

- **Interface Colorida e Intuitiva**: Design pensado especialmente para crianças
- **Responsivo**: Otimizado para dispositivos móveis (smartphones e tablets)
- **4 Operações Matemáticas**: Soma (+), Subtração (-), Multiplicação (*) e Divisão (/)
- **3 Níveis de Dificuldade**: Fácil, Médio e Difícil
- **Sistema de Pontuação**: Gamificação para motivar o aprendizado
- **Feedback Visual**: Animações e cores para indicar acertos e erros
- **Vibração Tátil**: Feedback háptico em dispositivos móveis compatíveis

## 🎯 Funcionalidades

### Operações Matemáticas
- **Soma**: Números de 1 a 10/50/100 (dependendo da dificuldade)
- **Subtração**: Sempre com resultado positivo
- **Multiplicação**: Tabuada até 12x12
- **Divisão**: Divisões exatas para facilitar o aprendizado

### Níveis de Dificuldade
- **😊 Fácil**: Números até 10
- **🤔 Médio**: Números até 50  
- **🤯 Difícil**: Números até 100

### Sistema de Gamificação
- **Pontuação**: +10 pontos por resposta correta
- **Sequência**: Contador de acertos consecutivos
- **Feedback Visual**: Animações de sucesso e erro
- **Cores Dinâmicas**: Interface que muda de cor baseada no resultado

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. **Clone ou baixe o projeto**
```bash
cd math-kids-app
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute em modo de desenvolvimento**
```bash
npm run dev
```

4. **Acesse no navegador**
```
http://localhost:3000
```

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 📱 Compatibilidade Mobile

O aplicativo foi desenvolvido com foco em dispositivos móveis:

- **Design Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Touch Friendly**: Botões grandes e fáceis de tocar
- **Orientação**: Funciona tanto em modo retrato quanto paisagem
- **Performance**: Otimizado para dispositivos com menor poder de processamento
- **Vibração**: Feedback tátil em dispositivos compatíveis

## 🎨 Design e UX

### Paleta de Cores
- **Primária**: Gradientes azul-roxo (#667eea → #764ba2)
- **Sucesso**: Verde (#56ab2f → #a8e6cf)
- **Erro**: Vermelho (#ff6b6b → #ffa8a8)
- **Destaque**: Amarelo-rosa (#feca57 → #ff9ff3)

### Tipografia
- **Fonte**: Comic Neue (Google Fonts)
- **Estilo**: Amigável e legível para crianças

### Animações
- **Bounce**: Para respostas corretas
- **Shake**: Para respostas incorretas
- **Pulse**: Para elementos interativos
- **Hover Effects**: Feedback visual em botões

## 🏗️ Estrutura do Projeto

```
math-kids-app/
├── public/
├── src/
│   ├── App.vue          # Componente principal
│   ├── main.js          # Ponto de entrada
│   └── style.css        # Estilos globais
├── index.html           # Template HTML
├── package.json         # Dependências e scripts
├── vite.config.js       # Configuração do Vite
└── README.md           # Documentação
```

## 🧩 Componentes

### App.vue
Componente principal que contém toda a lógica do jogo:

- **Estado do Jogo**: Pontuação, sequência, pergunta atual
- **Geração de Perguntas**: Algoritmo para criar questões baseadas na dificuldade
- **Validação de Respostas**: Lógica para verificar acertos e erros
- **Interface**: Renderização de todos os elementos visuais

## 🎮 Como Jogar

1. **Escolha a Operação**: Clique em uma das 4 operações matemáticas
2. **Selecione a Dificuldade**: Escolha entre Fácil, Médio ou Difícil
3. **Resolva a Questão**: Observe a operação matemática apresentada
4. **Escolha a Resposta**: Clique na resposta correta entre as 4 opções
5. **Veja o Feedback**: Animação e cor indicam se acertou ou errou
6. **Continue Jogando**: Nova questão é gerada automaticamente

## 🔧 Tecnologias Utilizadas

- **Vue.js 3**: Framework JavaScript reativo
- **Vite**: Build tool rápido e moderno
- **CSS3**: Animações e gradientes
- **HTML5**: Estrutura semântica
- **Google Fonts**: Tipografia Comic Neue
- **Responsive Design**: Media queries para mobile

## 📊 Algoritmos Educacionais

### Geração de Questões
- **Soma**: Números aleatórios dentro do limite da dificuldade
- **Subtração**: Garante resultado positivo (num1 > num2)
- **Multiplicação**: Limita a 12x12 para facilitar memorização
- **Divisão**: Gera divisões exatas para evitar decimais

### Geração de Alternativas
- **1 Resposta Correta**: Resultado real da operação
- **3 Respostas Incorretas**: Variações próximas para desafio adequado
- **Embaralhamento**: Ordem aleatória das opções

## 🎯 Objetivos Pedagógicos

- **Prática de Operações Básicas**: Reforço das 4 operações fundamentais
- **Agilidade Mental**: Cálculos rápidos e precisos
- **Confiança Matemática**: Feedback positivo e progressão gradual
- **Gamificação**: Tornar o aprendizado divertido e engajante

## 🔄 Futuras Melhorias

- [x] ✅ **Sons e efeitos sonoros** - Implementado com Web Audio API
- [x] ✅ **Sistema de níveis e conquistas** - Sistema completo com XP, níveis e achievements
- [x] ✅ **Modo offline (PWA)** - Progressive Web App instalável
- [ ] Relatórios de progresso para pais/professores
- [ ] Modo multiplayer local
- [ ] Temas visuais personalizáveis
- [ ] Suporte a frações simples

## 🐛 Resolução de Problemas

### Problemas Comuns

**App não carrega:**
- Verifique se o Node.js está instalado
- Execute `npm install` para instalar dependências
- Verifique se a porta 3000 está disponível

**Layout quebrado no mobile:**
- Limpe o cache do navegador
- Verifique se está usando um navegador moderno
- Teste em modo incógnito

**Animações não funcionam:**
- Verifique se o CSS está carregando corretamente
- Teste em diferentes navegadores
- Desative extensões que possam interferir

## 📄 Licença

MIT License - Livre para uso educacional e comercial.

## 👨‍💻 Desenvolvedor

**Ítalo Moura**  
Desenvolvido com 💙 **AWS Amazon Q CLI**

---

### 🤖 Sobre o AWS Amazon Q CLI

Este projeto foi desenvolvido inteiramente utilizando o AWS Amazon Q CLI, demonstrando as capacidades da IA da Amazon para desenvolvimento de software. O Amazon Q CLI é uma ferramenta poderosa que auxilia desenvolvedores na criação de aplicações completas, desde o planejamento até a implementação.

**Recursos utilizados:**
- Geração de código Vue.js
- Criação de estilos CSS responsivos
- Estruturação de projeto
- Documentação técnica
- Boas práticas de desenvolvimento

Para mais informações sobre o AWS Amazon Q CLI, visite: [AWS Amazon Q](https://aws.amazon.com/q/)

---

*Feito com ❤️ para tornar o aprendizado de matemática mais divertido para as crianças!*
