# Sistema de Temas - Noivos Online

## 🎨 Visão Geral

O sistema de temas permite que os clientes escolham entre 5 paletas de cores elegantes e sofisticadas para personalizar seu site de casamento. Cada tema oferece uma experiência visual única mantendo a elegância e profissionalismo.

## 🌈 Temas Disponíveis

### 1. **Olive & Sage** 🌿
- **Cores principais**: Verde oliva suave com sage
- **Características**: Natural, elegante, sofisticado
- **Ideal para**: Casamentos ao ar livre, temática natureza

### 2. **Burgundy & Cream** 🍷
- **Cores principais**: Borgonha profundo com creme
- **Características**: Romântico, luxuoso, clássico
- **Ideal para**: Casamentos formais, temática vintage

### 3. **Navy & Blush** 🌊
- **Cores principais**: Azul marinho com blush
- **Características**: Moderno, sofisticado, elegante
- **Ideal para**: Casamentos contemporâneos, temática marítima

### 4. **Emerald & Champagne** 💎
- **Cores principais**: Verde esmeralda com champanhe
- **Características**: Luxuoso, premium, sofisticado
- **Ideal para**: Casamentos de alto padrão, temática glamour

### 5. **Terra Cotta & Sage** 🏺
- **Cores principais**: Terra cotta com sage
- **Características**: Quente, acolhedor, mediterrâneo
- **Ideal para**: Casamentos rústicos, temática campo

## 🎯 Como Funciona

### Seletor de Temas
- **Localização**: Botão flutuante no canto inferior esquerdo
- **Ícone**: Paleta de cores com emoji do tema atual
- **Funcionalidade**: Menu dropdown com preview dos temas

### Persistência
- **Armazenamento**: LocalStorage do navegador
- **Recuperação**: Tema salvo é carregado automaticamente
- **Padrão**: Olive & Sage (tema inicial)

## 🛠️ Implementação Técnica

### Estrutura de Arquivos
```
src/
├── contexts/
│   └── ThemeContext.tsx          # Contexto principal dos temas
├── components/
│   └── ThemeSelector.tsx         # Componente do seletor
├── hooks/
│   └── useThemeColors.tsx        # Hook para aplicar cores
└── pages/
    └── _app.tsx                  # Provider do tema
```

### Contexto do Tema
```typescript
// Definição de um tema
{
  name: 'Olive & Sage',
  primary: '#6B7C32',
  secondary: '#9CAF88',
  accent: '#D4AF37',
  cream: '#F5F5DC',
  // ... outras propriedades
}
```

### Hook useThemeColors
```typescript
const colors = useThemeColors();

// Classes dinâmicas
colors.textPrimary      // text-olive-800
colors.bgPrimary        // bg-olive-700
colors.borderPrimary    // border-olive-200
colors.gradientPrimary  // bg-gradient-to-br from-olive-500 to-sage-600
```

## 🎨 Aplicação nas Páginas

### Exemplo de Uso
```tsx
import { useThemeColors } from '../hooks/useThemeColors';

const MyComponent = () => {
  const colors = useThemeColors();
  
  return (
    <div className={`${colors.gradientBackground}`}>
      <h1 className={`${colors.textPrimary}`}>
        Título Principal
      </h1>
      <p className={`${colors.textSecondary}`}>
        Texto secundário
      </p>
    </div>
  );
};
```

### Componentes Atualizados
- ✅ **Página Principal** (`index.tsx`)
- ✅ **Countdown** (`Countdown.tsx`)
- 🔄 **Header** (pendente)
- 🔄 **Footer** (pendente)
- 🔄 **Outras páginas** (pendente)

## 🎯 Benefícios para Vendas

### 1. **Diferencial Competitivo**
- Único no mercado de templates de casamento
- 5 opções de personalização visual
- Experiência interativa para o cliente

### 2. **Valor Agregado**
- Personalização sem necessidade de código
- Temas profissionais e testados
- Facilita a decisão de compra

### 3. **Demonstração Interativa**
- Cliente pode "testar" diferentes looks
- Preview em tempo real
- Ajuda na escolha do tema ideal

## 🚀 Próximos Passos

### Implementações Pendentes
1. **Atualizar Header** com cores dinâmicas
2. **Atualizar Footer** com cores dinâmicas
3. **Atualizar todas as páginas** restantes
4. **Otimizar transições** entre temas
5. **Adicionar animações** de troca de tema

### Melhorias Futuras
1. **Temas customizados** pelo cliente
2. **Preview em tempo real** de mudanças
3. **Salvamento de preferências** no servidor
4. **Temas sazonais** (Natal, Primavera, etc.)
5. **Modo escuro** para cada tema

## 📱 Responsividade

O sistema de temas é totalmente responsivo:
- **Desktop**: Menu completo com preview
- **Tablet**: Menu adaptado
- **Mobile**: Menu otimizado para touch

## 🎨 Paleta de Cores (Tailwind)

### Cores Adicionadas
```javascript
// tailwind.config.js
burgundy: { 50: '#fdf8f8', 500: '#8B2635', ... }
navy: { 50: '#f0f4f8', 500: '#1B365D', ... }
emerald: { 50: '#f0f9f4', 500: '#046307', ... }
terraCotta: { 50: '#fdf6f4', 500: '#E2725B', ... }
blush: { 50: '#fdf8f8', 500: '#F4C2C2', ... }
champagne: { 50: '#fdfbf7', 500: '#F7E7CE', ... }
```

## 💡 Dicas de Uso

### Para Desenvolvedores
1. Sempre use `useThemeColors()` para cores dinâmicas
2. Evite cores hardcoded nos componentes
3. Teste todos os temas antes de fazer deploy
4. Mantenha contraste adequado para acessibilidade

### Para Clientes
1. Clique no botão da paleta para ver opções
2. Cada tema tem um preview das cores principais
3. A escolha é salva automaticamente
4. Pode trocar quantas vezes quiser

## 🎯 Resultado Final

O sistema de temas transforma o template em um produto premium com:
- **5 opções de personalização**
- **Interface intuitiva**
- **Experiência interativa**
- **Valor agregado significativo**
- **Diferencial no mercado**

Isso posiciona o template como uma solução profissional e completa para casamentos, aumentando significativamente seu valor de mercado e atratividade para potenciais clientes.
