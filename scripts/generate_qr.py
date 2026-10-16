import qrcode

qr = qrcode.QRCode(box_size=1, border=0)
qr.add_data("https://wa.me/916371151811")
qr.make(fit=True)
m = qr.get_matrix()
size = len(m)
d = " ".join([f"M{x},{y}h1v1h-1z" for y, row in enumerate(m) for x, val in enumerate(row) if val])

svg_content = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" shape-rendering="crispEdges"><path d="{d}" fill="currentColor"/></svg>'

with open("public/whatsapp-qr.svg", "w", encoding="utf-8") as f:
    f.write(svg_content)

print(f"Generated public/whatsapp-qr.svg successfully! Size: {size}x{size}, path points: {len(d)}")
