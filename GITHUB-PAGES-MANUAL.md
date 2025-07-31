# 🌐 GitHub Pages - Configuração Manual

## 🚀 Como configurar GitHub Pages manualmente

Como o workflow automático precisa de permissões especiais, vamos configurar manualmente:

### Opção 1: Usar a versão Standalone (Mais Simples)

1. **Vá para Settings do seu repositório**
   - https://github.com/itmoura/math-kids-app/settings

2. **Clique em "Pages" no menu lateral**

3. **Configure:**
   - **Source**: Deploy from a branch
   - **Branch**: main
   - **Folder**: / (root)

4. **Clique em "Save"**

5. **Aguarde alguns minutos**

6. **Acesse**: https://itmoura.github.io/math-kids-app/standalone.html

### Opção 2: Criar branch gh-pages

1. **Fazer build local:**
```bash
cd /home/italo/q/math-kids-app
npm install
npm run build
```

2. **Criar branch gh-pages:**
```bash
git checkout --orphan gh-pages
git rm -rf .
cp -r dist/* .
cp standalone.html .
cp README.md .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

3. **Configurar Pages:**
   - **Source**: Deploy from a branch
   - **Branch**: gh-pages
   - **Folder**: / (root)

### Opção 3: Upload manual

1. **Fazer build local:**
```bash
npm run build
```

2. **Criar novo repositório** `math-kids-app-pages`

3. **Upload dos arquivos da pasta `dist`**

4. **Ativar GitHub Pages** no novo repositório

## 🎯 URLs que estarão disponíveis

### Versão Standalone (Recomendada)
- **URL**: https://itmoura.github.io/math-kids-app/standalone.html
- **Funciona**: Imediatamente após ativar Pages
- **Vantagem**: Não precisa de build

### Versão Vue.js
- **URL**: https://itmoura.github.io/math-kids-app/
- **Precisa**: Build e configuração correta
- **Vantagem**: Interface mais moderna

## 🔧 Resolução de Problemas

### Erro 404
- Verifique se o arquivo existe no repositório
- Aguarde alguns minutos para propagação
- Teste com `/standalone.html` no final da URL

### CSS não carrega
- Problema comum com paths relativos
- Use a versão standalone que não tem esse problema

### JavaScript não funciona
- Verifique console do navegador (F12)
- Use versão standalone para evitar problemas

## 💡 Recomendação

**Use a versão standalone** para GitHub Pages:
- ✅ Funciona imediatamente
- ✅ Não precisa de build
- ✅ Sem problemas de path
- ✅ Totalmente funcional
- ✅ Fácil de compartilhar

**URL final**: https://itmoura.github.io/math-kids-app/standalone.html

---

**🤖 Desenvolvido com AWS Amazon Q CLI**  
*Por Ítalo Moura*
