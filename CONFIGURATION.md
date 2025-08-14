# 🎨 Guia de Configuração - Template de Site de Casamento

Este guia irá ajudá-lo a personalizar rapidamente o template para seu casamento ou para vender para clientes.

## 📝 Informações Básicas

### 1. Nomes dos Noivos
Substitua "João & Maria" pelos nomes reais do casal nos seguintes arquivos:

**Arquivos principais:**
- `src/pages/index.tsx` (linhas 9, 35, 42, 48)
- `src/components/Header.tsx` (linha 67)
- `src/components/Footer.tsx` (linha 45, 150)

**Exemplo:**
```typescript
// Antes
<title>João & Maria - 15 de Dezembro de 2024</title>
<h1>João & Maria</h1>

// Depois
<title>Ana & Carlos - 20 de Janeiro de 2025</title>
<h1>Ana & Carlos</h1>
```

### 2. Data do Casamento
Atualize a data em todos os arquivos relevantes:

**Arquivos para alterar:**
- `src/pages/index.tsx` (linhas 10, 58, 64)
- `src/components/Header.tsx` (linha 75)
- `src/components/Footer.tsx` (linha 46)
- `src/pages/programacao.tsx` (linhas 6, 47)

**Exemplo:**
```typescript
// Antes
<meta name="description" content="Celebrando o amor de João e Maria em 15 de Dezembro de 2024" />
<span>15 de Dezembro de 2024</span>
<Countdown targetDate="2024-12-15T16:00:00" />

// Depois
<meta name="description" content="Celebrando o amor de Ana e Carlos em 20 de Janeiro de 2025" />
<span>20 de Janeiro de 2025</span>
<Countdown targetDate="2025-01-20T16:00:00" />
```

### 3. Local do Evento
Atualize as informações do local em:

**Arquivo:** `src/pages/index.tsx` (linhas 95-96)
```typescript
// Antes
<p className="text-stone-600 font-medium">Espaço de Eventos</p>
<p className="text-stone-600">São Paulo - SP</p>

// Depois
<p className="text-stone-600 font-medium">Chácara Bela Vista</p>
<p className="text-stone-600">Campinas - SP</p>
```

## 📖 História do Casal

### 1. Timeline Personalizada
Edite o arquivo `src/pages/historia.tsx` (linhas 18-42):

```typescript
const timeline = [
  {
    year: "2020",
    title: "Primeiro Encontro",
    description: "15 de março - nos conhecemos em uma cafeteria no centro da cidade...",
    emoji: "☕"
  },
  // Adicione mais momentos importantes
];
```

### 2. Texto da História
Atualize o texto da história (linhas 200-220):

```typescript
<p>
  <span className="font-semibold text-olive-700">Primeiro Encontro:</span> 
  Nossa história começou em uma ensolarada tarde de março de 2020...
</p>
```

### 3. Fotos da História
1. Adicione suas fotos na pasta `public/images/historia/`
2. Nomeie as fotos numericamente: `1.jpg`, `2.jpg`, `3.jpg`, etc.
3. O sistema carregará automaticamente todas as fotos numeradas

## 🎵 Configuração de Música

### 1. Músicas Personalizadas
1. Adicione suas músicas na pasta `public/audio/`
2. Formatos suportados: `.mp3`, `.wav`, `.ogg`
3. O player carregará automaticamente todas as músicas da pasta

## 💰 Configuração PIX

### 1. QR Code PIX
1. Gere seu QR Code PIX no app do banco
2. Salve a imagem como `qr_code_casamento.jpg` em `public/images/auxiliares/`
3. Atualize as informações no componente `src/components/QrCodePix.tsx`

### 2. Lista de Presentes
Edite o arquivo `src/pages/presentes.tsx` para:
- Adicionar/remover itens da lista
- Atualizar preços
- Modificar descrições
- Adicionar novas categorias

## 🏨 Informações de Hospedagem

Edite o arquivo `src/pages/pousadas.tsx` para incluir:
- Hotéis recomendados
- Pousadas próximas
- Informações de reserva
- Preços e contatos

## 📞 Informações de Contato

### 1. Redes Sociais
Atualize os links no `src/components/Footer.tsx` (linhas 110-125):

```typescript
// Instagram
href="https://www.instagram.com/seu_perfil/"

// WhatsApp
href="https://wa.me/5511999999999"
```

### 2. Formulário de Contato
O formulário em `src/pages/contato.tsx` já está configurado para:
- Coletar confirmações de presença
- Armazenar mensagens dos convidados
- Enviar notificações por email

## 🎨 Personalização Visual

### 1. Cores do Tema
Edite `tailwind.config.js` para personalizar as cores:

```javascript
theme: {
  extend: {
    colors: {
      olive: {
        50: '#f8f9fa',
        100: '#e9ecef',
        // ... outras tonalidades
        800: '#495057',
      },
      cream: {
        50: '#fffbf0',
        100: '#fef3c7',
        // ... outras tonalidades
      }
    }
  }
}
```

### 2. Fontes
Para alterar as fontes, edite `src/styles/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

.font-forum {
  font-family: 'Playfair Display', serif;
}
```

## 🚀 Deploy

### 1. Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### 2. Netlify
1. Conecte o repositório ao Netlify
2. Configure o build command: `npm run build`
3. Configure o publish directory: `.next`

### 3. Outros Provedores
O projeto é compatível com qualquer provedor que suporte Next.js.

## 📱 Funcionalidades Avançadas

### 1. Sistema de Confirmação
Para ativar o sistema completo:
1. Configure um banco MongoDB
2. Adicione as variáveis de ambiente do banco
3. Configure o dashboard administrativo

### 2. Analytics
Adicione Google Analytics ou outros serviços de tracking no `src/pages/_app.tsx`

### 3. SEO
Personalize as meta tags em cada página para melhor SEO

## 🔧 Solução de Problemas

### Problema: Fotos não carregam
**Solução:** Verifique se as fotos estão na pasta correta e com nomes numéricos

### Problema: Músicas não tocam
**Solução:** Verifique se os arquivos de áudio estão em formato suportado

### Problema: Contagem regressiva incorreta
**Solução:** Verifique se a data está no formato correto: `YYYY-MM-DDTHH:mm:ss`

## 💡 Dicas de Personalização

1. **Mantenha a consistência** nas cores e fontes
2. **Otimize as imagens** para carregamento rápido
3. **Teste em diferentes dispositivos** antes do deploy
4. **Faça backup** antes de grandes alterações
5. **Use imagens de alta qualidade** para melhor apresentação

---

**Precisa de ajuda?** Abra uma issue no repositório ou entre em contato!
