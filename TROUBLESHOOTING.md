# 🔧 Resolução de Problemas - Matemática Divertida

## Problema com WSL (Windows Subsystem for Linux)

Se você está enfrentando problemas para instalar as dependências no WSL, aqui estão algumas soluções:

### ✅ Solução Rápida - Versão Standalone

**Use o arquivo `standalone.html` que funciona sem instalação:**

1. **Abra o arquivo diretamente no navegador**
   ```bash
   # No WSL, abra o arquivo com:
   explorer.exe standalone.html
   
   # Ou copie o caminho completo e cole no navegador:
   file:///home/italo/q/math-kids-app/standalone.html
   ```

2. **Para testar no celular:**
   - Copie o arquivo `standalone.html` para uma pasta acessível
   - Use um servidor HTTP simples:
   ```bash
   # Se tiver Python instalado:
   python3 -m http.server 8000
   
   # Ou use Node.js:
   npx serve .
   ```

### 🛠️ Soluções para o Problema do NPM

#### Opção 1: Usar Yarn em vez de NPM
```bash
# Instalar yarn
npm install -g yarn

# Limpar e instalar com yarn
rm -rf node_modules package-lock.json
yarn install
yarn dev
```

#### Opção 2: Mover projeto para fora do WSL
```bash
# Mover para diretório Windows
cp -r /home/italo/q/math-kids-app /mnt/c/Users/italo/Desktop/math-kids-app
cd /mnt/c/Users/italo/Desktop/math-kids-app
npm install
npm run dev
```

#### Opção 3: Usar Docker
```bash
# Criar Dockerfile
cat > Dockerfile << EOF
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
EOF

# Executar com Docker
docker build -t math-kids-app .
docker run -p 3000:3000 math-kids-app
```

#### Opção 4: Configurar NPM para WSL
```bash
# Configurar npm para usar cache local
npm config set cache /tmp/.npm
npm config set prefix /tmp/.npm-global

# Limpar cache
npm cache clean --force

# Tentar instalar novamente
npm install
```

### 🌐 Testando no Celular

#### Método 1: Servidor Local
```bash
# Usar Python (mais simples)
cd /home/italo/q/math-kids-app
python3 -m http.server 8000

# Acessar no celular: http://SEU_IP:8000/standalone.html
```

#### Método 2: Ngrok (Túnel público)
```bash
# Instalar ngrok
wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
unzip ngrok-stable-linux-amd64.zip

# Executar túnel
./ngrok http 8000

# Usar a URL fornecida no celular
```

### 📱 Versão PWA (Progressive Web App)

Para uma experiência mais nativa no celular, você pode:

1. **Adicionar à tela inicial** (Chrome/Safari)
2. **Usar modo offline** (funciona sem internet)
3. **Instalar como app** (alguns navegadores permitem)

### 🚀 Deploy Online Gratuito

#### Netlify (Recomendado)
1. Acesse [netlify.com](https://netlify.com)
2. Arraste a pasta do projeto
3. Compartilhe o link gerado

#### GitHub Pages
```bash
# Fazer upload para GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/math-kids-app.git
git push -u origin main

# Ativar GitHub Pages nas configurações do repositório
```

#### Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 🔍 Verificação de Funcionamento

**Teste estas funcionalidades:**
- ✅ Mudança de operações (+, -, ×, ÷)
- ✅ Mudança de dificuldade (Fácil, Médio, Difícil)
- ✅ Sistema de pontuação
- ✅ Animações de acerto/erro
- ✅ Responsividade no celular
- ✅ Vibração (se suportada)

### 📞 Suporte

Se ainda tiver problemas:

1. **Verifique os logs de erro** no console do navegador (F12)
2. **Teste em modo incógnito** para descartar extensões
3. **Use diferentes navegadores** (Chrome, Firefox, Safari)
4. **Teste a versão standalone.html** primeiro

---

**Desenvolvido com AWS Amazon Q CLI** 🤖  
*Por Ítalo Moura*

### 💡 Dica Final

A versão `standalone.html` é totalmente funcional e não requer instalação. É perfeita para:
- Demonstrações rápidas
- Uso em escolas sem internet
- Compartilhamento via WhatsApp/email
- Backup quando o servidor não funciona
