# Portafolio de Gen Contreras

Landing page personal de Gen Contreras, disponible en español, portugués e
inglés. Presenta sus servicios IT, proyectos, trayectoria, agencia de marketing,
perfil artístico, voluntariado y playlists.

## Tecnologías

TanStack Start, React, Tailwind CSS y lucide-react.

## Desarrollo local

Requisitos: Node.js 24 LTS y pnpm.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

La página queda disponible en `http://localhost:3000`.

## Compilar y validar

```bash
pnpm build
pnpm test
pnpm typecheck
```

## Contenido

- Textos, enlaces y datos: `src/lib/content.ts`
- Traducciones y preferencia de idioma: `src/lib/i18n.tsx`
- Secciones y diseño: `src/routes/index.tsx` y `src/styles.css`
- Imágenes y CV: `public/`
