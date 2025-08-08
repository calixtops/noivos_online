# 🎵 Configuração do Spotify para Playlist Colaborativa

## 📱 Problema Atual
O app está em "Development Mode", limitando o acesso apenas ao criador e usuários explicitamente adicionados.

## 🚀 Solução: Publicar o App Spotify

### Passo 1: Ir para o Dashboard
1. Acesse: https://developer.spotify.com/dashboard
2. Selecione seu app "Casamento"
3. Clique em "Settings"

### Passo 2: Configurar Informações do App
Na seção "App Settings":

- **App Name**: Casamento Geórgia & Pedro
- **App Description**: 
  ```
  Playlist colaborativa para o casamento de Geórgia & Pedro. 
  Permite que convidados adicionem músicas especiais para a celebração.
  ```
- **Website**: https://georgia-pedro.vercel.app
- **Redirect URIs**:
  - https://georgia-pedro.vercel.app/api/spotify/callback
  - http://127.0.0.1:3000/api/spotify/callback

### Passo 3: Informações Adicionais
- **Category**: Lifestyle
- **Commercial Use**: No (é para uso pessoal)
- **Data Usage**: 
  ```
  Este app acessa apenas informações básicas do usuário (nome, email) 
  e permite adicionar músicas a uma playlist específica de casamento.
  Não armazena dados pessoais permanentemente.
  ```

### Passo 4: Solicitar Extensão de Quota
1. Na página do app, procure "Quota Extension"
2. Clique em "Request Extension"
3. Preencha:
   - **Use Case**: Wedding playlist collaboration
   - **Expected Users**: 100-200 wedding guests
   - **Commercial Use**: No
   - **Detailed Description**:
     ```
     This app is for a wedding playlist collaboration where wedding guests 
     can add their favorite songs to celebrate the couple's special day. 
     It's a one-time event application for personal use only.
     ```

### Passo 5: Aguardar Aprovação
- Spotify geralmente aprova em 1-3 dias úteis
- Você receberá email quando aprovado

## 🔧 Configurações de Produção

### Redirect URIs (obrigatório)
```
https://georgia-pedro.vercel.app/api/spotify/callback
http://127.0.0.1:3000/api/spotify/callback (para desenvolvimento)
```

### Scopes Necessários
- playlist-modify-public
- playlist-modify-private  
- user-read-private

## 🛠️ Solução Temporária: Adicionar Usuários Manualmente

Enquanto aguarda aprovação:

1. No Dashboard → "Users and Access"
2. Clique "Add New User"
3. Adicione emails dos convidados que vão testar
4. Máximo 25 usuários em desenvolvimento

## 📝 Notas Importantes

- Em desenvolvimento: máximo 25 usuários
- Após aprovação: usuários ilimitados
- Playlist deve ser pública ou do próprio usuário criador
- Tokens expiram em 1 hora (normal do Spotify)

## 🎉 Após Aprovação

O app funcionará para qualquer usuário do Spotify sem necessidade de adição manual.
