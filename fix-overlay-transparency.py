#!/usr/bin/env python3
"""
Script para converter overlay.png RGB para RGBA com transparência
Remove fundo e mantém apenas elementos (morcegos, logo)
"""

from PIL import Image
import os

def make_overlay_transparent(input_path, output_path, bg_color_threshold=240):
    """
    Converte overlay RGB para RGBA com transparência

    Args:
        input_path: Caminho do arquivo de entrada
        output_path: Caminho do arquivo de saída
        bg_color_threshold: Threshold para considerar um pixel como "fundo branco" (0-255)
    """
    print(f"📂 Processando: {input_path}")

    # Abrir imagem
    img = Image.open(input_path)

    # Converter para RGBA se necessário
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
        print(f"   ✓ Convertido para RGBA")

    # Obter dados dos pixels
    data = img.getdata()

    # Nova lista de pixels com transparência
    new_data = []

    # Detectar cor de fundo automaticamente (pixel mais comum nos cantos)
    corners = [
        img.getpixel((0, 0)),
        img.getpixel((img.width-1, 0)),
        img.getpixel((0, img.height-1)),
        img.getpixel((img.width-1, img.height-1))
    ]

    # Se os cantos forem claros (branco/cinza), remover pixels claros
    corner_avg = sum(sum(c[:3]) for c in corners) / (4 * 3)

    if corner_avg > 200:
        # Fundo claro - remover pixels brancos/claros
        print(f"   🔍 Detectado fundo claro (média: {corner_avg:.1f})")
        for item in data:
            # Se pixel for muito claro (quase branco), tornar transparente
            if item[0] > bg_color_threshold and item[1] > bg_color_threshold and item[2] > bg_color_threshold:
                # Transparente
                new_data.append((item[0], item[1], item[2], 0))
            else:
                # Manter opaco
                new_data.append((item[0], item[1], item[2], 255))
    else:
        # Fundo escuro/colorido - remover pixels muito escuros OU muito claros
        print(f"   🔍 Detectado fundo colorido/escuro (média: {corner_avg:.1f})")
        bg_sample = corners[0][:3]  # Usar canto superior esquerdo como referência

        for item in data:
            r, g, b = item[0], item[1], item[2]

            # Calcular diferença com cor de fundo
            diff = abs(r - bg_sample[0]) + abs(g - bg_sample[1]) + abs(b - bg_sample[2])

            # Se muito similar ao fundo (diferença < 30), tornar transparente
            if diff < 30:
                new_data.append((r, g, b, 0))
            else:
                new_data.append((r, g, b, 255))

    # Aplicar novos dados
    img.putdata(new_data)

    # Salvar
    img.save(output_path, 'PNG')

    # Verificar resultado
    result_img = Image.open(output_path)
    has_transparency = result_img.mode == 'RGBA'

    # Contar pixels transparentes
    transparent_count = sum(1 for pixel in result_img.getdata() if pixel[3] == 0)
    total_pixels = result_img.width * result_img.height
    transparency_percent = (transparent_count / total_pixels) * 100

    print(f"   ✓ Salvo: {output_path}")
    print(f"   ✓ Modo: {result_img.mode}")
    print(f"   ✓ Transparência: {transparency_percent:.1f}% dos pixels")
    print(f"   ✓ Tamanho: {os.path.getsize(output_path) / 1024:.1f} KB")

    return has_transparency, transparency_percent


def main():
    print("🎨 Conversor de Overlay RGB → RGBA com Transparência\n")

    base_path = "/Users/leocruz/Documents/Projects/molduras/frontend/assets/themes"

    themes = ['hornet_brasil', 'dark_mode', 'halloween', 'pride_month']

    results = []

    for theme in themes:
        overlay_path = os.path.join(base_path, theme, 'overlay.png')

        if not os.path.exists(overlay_path):
            print(f"⚠️  {theme}: overlay.png não encontrado\n")
            continue

        # Backup
        backup_path = os.path.join(base_path, theme, 'overlay_original.png')
        if not os.path.exists(backup_path):
            img_backup = Image.open(overlay_path)
            img_backup.save(backup_path)
            print(f"💾 Backup criado: overlay_original.png")

        # Processar
        has_trans, percent = make_overlay_transparent(overlay_path, overlay_path)
        results.append((theme, has_trans, percent))
        print()

    # Resumo
    print("=" * 60)
    print("📊 RESUMO:")
    print("=" * 60)
    for theme, has_trans, percent in results:
        status = "✅" if has_trans and percent > 10 else "⚠️"
        print(f"{status} {theme:20s} - Transparência: {percent:5.1f}%")

    print("\n✨ Concluído! Teste agora no navegador.")
    print("💡 Se algo der errado, os originais foram salvos como overlay_original.png")


if __name__ == '__main__':
    try:
        from PIL import Image
        main()
    except ImportError:
        print("❌ Erro: PIL (Pillow) não está instalado!")
        print("\n📦 Instale com:")
        print("   pip install Pillow")
        print("\n   ou")
        print("   pip3 install Pillow")
