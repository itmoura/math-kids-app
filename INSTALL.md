# 🚀 Guia de Instalação Rápida

## Matemática Divertida - App para Crianças

### ⚡ Instalação Express (5 minutos)

1. **Certifique-se que tem Node.js instalado**
   ```bash
   node --version
   # Deve mostrar v16.0.0 ou superior
   ```

2. **Navegue até a pasta do projeto**
   ```bash
   cd math-kids-app
   ```

3. **Instale as dependências**
   ```bash
   npm install
   ```

4. **Execute o projeto**
   ```bash
   npm run dev
   ```

5. **Abra no navegador**
   - Acesse: `http://localhost:3000`
   - Ou use o QR code que aparece no terminal para testar no celular

### 📱 Testando no Celular

1. **Certifique-se que o computador e celular estão na mesma rede WiFi**

2. **Encontre o IP do seu computador**
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig` ou `ip addr`

3. **Acesse no celular**
   - Digite no navegador: `http://SEU_IP:3000`
   - Exemplo: `http://192.168.1.100:3000`

### 🔧 Resolução Rápida de Problemas

**Erro "command not found: npm"**
- Instale o Node.js: https://nodejs.org/

**Erro "port 3000 already in use"**
- Mude a porta no arquivo `vite.config.js` (linha 7)
- Ou pare outros serviços na porta 3000

**App não carrega no celular**
- Verifique se estão na mesma rede WiFi
- Desative firewall temporariamente
- Use `npm run dev -- --host` para expor em todas as interfaces

### 🎯 Pronto para Usar!

Agora você pode:
- ✅ Testar as 4 operações matemáticas
- ✅ Experimentar os 3 níveis de dificuldade  
- ✅ Ver o sistema de pontuação funcionando
- ✅ Testar no celular e tablet

---

**Desenvolvido com AWS Amazon Q CLI** 🤖  
*Por Ítalo Moura*
