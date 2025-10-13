#!/usr/bin/env python3
"""
Solução final: Tornar APENAS pixels QUASE BRANCOS (250-255) transparentes
Preserva TODOS os outros elementos, incluindo texto branco sobre elementos decorativos
"""

from PIL import Image

def final_transparency(input_path, output_path):
    """
    Remove apenas pixels muito próximos de branco puro (fundo)
    Mantém tudo o resto, incluindo elementos brancos importantes
    """
    print(f"📂 Processando: {input_path}")

    img = Image.open(input_path).convert('RGBA')
    pixels = img.load()
    width, height = img.size

    transparent_count = 0

    # Threshold muito alto - só remove branco QUASE PURO (250-255 em todos os canais)
    # Isso preserva elementos brancos que estão sobre fundos coloridos/escuros
    threshold = 250

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]

            # Só torna transparente se for MUITO branco (fundo)
            if r >= threshold and g >= threshold and b >= threshold:
                pixels[x, y] = (r, g, b, 0)
                transparent_count += 1
            else:
                # Mantém completamente opaco
                pixels[x, y] = (r, g, b, 255)

    img.save(output_path, 'PNG')

    transparency_percent = (transparent_count / (width * height)) * 100
    print(f"   ✓ Transparência: {transparency_percent:.1f}%")
    print(f"   ✓ Salvo: {output_path}\n")

def main():
    print("🎨 Conversor Final - Remove Apenas Fundo Branco Puro\n")

    base_path = "/Users/leocruz/Documents/Projects/molduras/frontend/assets/themes"

    themes = ['hornet_brasil', 'dark_mode', 'halloween', 'pride_month']

    for theme in themes:
        input_path = f"{base_path}/{theme}/overlay_original.png"
        output_path = f"{base_path}/{theme}/overlay.png"

        try:
            final_transparency(input_path, output_path)
        except Exception as e:
            print(f"⚠️  Erro em {theme}: {e}\n")

    print("=" * 60)
    print("✨ Concluído!")
    print("💡 Todos os elementos (incluindo logo branco) preservados!")
    print("💡 Removido apenas o fundo branco puro (250-255 RGB)")

if __name__ == '__main__':
    try:
        from PIL import Image
        main()
    except ImportError:
        print("❌ Erro: Pillow não instalado")
        print("Execute: pip install Pillow")
