// Utility para detectar automaticamente as fotos na pasta historia
export const detectHistoryPhotos = () => {
  const photos = [];
  
  // Lista de extensões de imagem suportadas
  const imageExtensions = ['jpg', 'jpeg', 'png', 'webp'];
  
  // Como estamos no Next.js, precisamos uma abordagem diferente para detectar arquivos
  // Vamos usar uma range baseada em tentativa de carregamento
  for (let i = 1; i <= 100; i++) {
    // Tenta diferentes extensões para cada número
    for (const ext of imageExtensions) {
      const photoPath = `/images/historia/${i}.${ext}`;
      photos.push({
        id: i,
        src: photoPath,
        alt: `Momento especial ${i}`,
        caption: getPhotoCaption(i)
      });
      break; // Para no primeiro match (assumindo que não há duplicatas)
    }
  }
  
  return photos;
};

// Função para gerar legendas baseadas no número da foto
const getPhotoCaption = (photoNumber: number): string => {
  const captions = [
    "10 de junho de 2017 - Nosso primeiro encontro",
    "Primeira temporada - Momentos de alegria", 
    "Praias e viagens da primeira temporada",
    "Reencontro - Segunda temporada começa",
    "Reunindo famílias e amigos",
    "O pedido sob a lua cheia - Praia do Poço da Draga",
    "Noivos - Rumo à terceira temporada",
    "Momentos especiais juntos",
    "Aventuras e descobertas",
    "Construindo nossa história"
  ];
  
  // Se tem legenda específica, usa ela, senão usa uma genérica
  return captions[photoNumber - 1] || `Nosso momento especial ${photoNumber}`;
};

// Função para verificar se uma imagem existe (usar no componente)
export const checkImageExists = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
};

// Função para carregar apenas as fotos que existem
export const loadExistingPhotos = async (maxPhotos = 100) => {
  const photos = [];
  const imageExtensions = ['jpg', 'jpeg', 'png', 'webp'];
  
  for (let i = 1; i <= maxPhotos; i++) {
    let photoFound = false;
    
    for (const ext of imageExtensions) {
      const photoPath = `/images/historia/${i}.${ext}`;
      
      try {
        const exists = await checkImageExists(photoPath);
        if (exists) {
          photos.push({
            id: i,
            src: photoPath,
            alt: `Momento especial ${i}`,
            caption: getPhotoCaption(i)
          });
          photoFound = true;
          break;
        }
      } catch (error) {
        continue;
      }
    }
    
    // Se não encontrou foto neste número, para a busca 
    // (assumindo que as fotos são numeradas sequencialmente)
    if (!photoFound && i > 5) {
      // Permite alguns gaps no início, mas para se não encontrar muitas seguidas
      let gapCount = 0;
      for (let j = i; j < i + 5; j++) {
        let foundInGap = false;
        for (const ext of imageExtensions) {
          const testPath = `/images/historia/${j}.${ext}`;
          if (await checkImageExists(testPath)) {
            foundInGap = true;
            break;
          }
        }
        if (!foundInGap) gapCount++;
      }
      if (gapCount >= 3) break; // Para se não encontrar 3 seguidas
    }
  }
  
  return photos;
};
