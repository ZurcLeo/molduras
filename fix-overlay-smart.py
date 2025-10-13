#!/usr/bin/env python3
"""
Script inteligente para converter overlay.png com preservação do logo
Remove apenas o fundo, mantém TODOS os elementos (incluindo logo branco)
"""

from PIL import Image
import numpy as np

def smart_transparency(input_path, output_path):
    """
    Remove fundo preservando elementos importantes (incluindo brancos no canto)
    """
    print(f"📂 Processando: {input_path}")

    img = Image.open(input_path).convert('RGBA')
    data = np.array(img)

    height, width = data.shape[:2]

    # Analisar cantos para detectar cor de fundo
    corner_size = 50
    corners = [
        data[0:corner_size, 0:corner_size],  # Superior esquerdo
        data[0:corner_size, -corner_size:],  # Superior direito
        data[-corner_size:, 0:corner_size],  # Inferior esquerdo
        # NÃO incluir inferior direito (onde está o logo!)
    ]

    # Calcular cor média dos cantos (exceto inferior direito)
    corner_pixels = np.concatenate([c.reshape(-1, 4) for c in corners])
    bg_color = np.median(corner_pixels[:, :3], axis=0)

    print(f"   🎨 Cor de fundo detectada: RGB{tuple(bg_color.astype(int))}")

    # Criar máscara de transparência
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

    # Calcular diferença de cada pixel em relação ao fundo
    diff = np.abs(r - bg_color[0]) + np.abs(g - bg_color[1]) + np.abs(b - bg_color[2])

    # Definir regiões protegidas (onde NÃO remover pixels brancos)
    # Canto inferior direito: 30% da largura, 25% da altura
    protected_x_start = int(width * 0.7)
    protected_y_start = int(height * 0.75)

    # Lado esquerdo: 40% da largura (onde ficam os morcegos)
    left_protected = int(width * 0.4)

    # Criar máscara de transparência
    alpha_new = np.zeros((height, width), dtype=np.uint8)

    for y in range(height):
        for x in range(width):
            # Se está na região do logo (canto inferior direito)
            if x >= protected_x_start and y >= protected_y_start:
                # Manter opaco (logo sempre visível)
                alpha_new[y, x] = 255
            # Se está no lado esquerdo (morcegos)
            elif x < left_protected:
                # Manter se for escuro/colorido (não branco puro)
                if diff[y, x] > 30 or (r[y,x] < 200 or g[y,x] < 200 or b[y,x] < 200):
                    alpha_new[y, x] = 255
                else:
                    alpha_new[y, x] = 0
            # Resto da imagem
            else:
                # Remover se for muito similar ao fundo
                if diff[y, x] < 20:
                    alpha_new[y, x] = 0
                else:
                    alpha_new[y, x] = 255

    # Aplicar novo canal alpha
    data[:,:,3] = alpha_new

    # Criar imagem resultante
    result = Image.fromarray(data, 'RGBA')
    result.save(output_path, 'PNG')

    # Estatísticas
    transparent_pixels = np.sum(alpha_new == 0)
    total_pixels = height * width
    transparency_percent = (transparent_pixels / total_pixels) * 100

    print(f"   ✓ Logo preservado (canto inferior direito)")
    print(f"   ✓ Morcegos preservados (lado esquerdo)")
    print(f"   ✓ Transparência: {transparency_percent:.1f}%")
    print(f"   ✓ Salvo: {output_path}\n")

def main():
    print("🎨 Conversor Inteligente de Overlay (Preserva Logo)\n")

    base_path = "/Users/leocruz/Documents/Projects/molduras/frontend/assets/themes"

    themes = {
        'hornet_brasil': 'overlay_original.png',
        'dark_mode': 'overlay_original.png',
        'halloween': 'overlay_original.png',
        'pride_month': 'overlay_original.png'
    }

    for theme, source_file in themes.items():
        input_path = f"{base_path}/{theme}/{source_file}"
        output_path = f"{base_path}/{theme}/overlay.png"

        try:
            smart_transparency(input_path, output_path)
        except Exception as e:
            print(f"⚠️  Erro em {theme}: {e}\n")

    print("=" * 60)
    print("✨ Concluído! Teste agora no navegador.")
    print("💡 O logo branco do Hornet Brasil foi preservado!")

if __name__ == '__main__':
    try:
        from PIL import Image
        import numpy as np
        main()
    except ImportError as e:
        print(f"❌ Erro: {e}")
        print("\n📦 Instale as dependências:")
        print("   pip install Pillow numpy")
