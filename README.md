# Portfolio Dafne - Proyecto Web

Portfolio creativo profesional con diseño minimalista en blanco y negro, efectos parallax y animaciones modernas.

## Características

- **Diseño Minimalista**: Paleta de colores blanco y negro para un look profesional
- **Efecto Parallax**: Desplazamiento suave con efectos visuales modernos
- **Responsive**: Adaptable a dispositivos móviles y tablets
- **Animaciones**: Transiciones y animaciones suaves al hacer scroll
- **Secciones**:
  - Hero con título impactante
  - Sobre Mí con información personal
  - Portfolio con grid de proyectos
  - Formulario de contacto funcional
  - Footer con información de copyright

## Estructura del Proyecto

```
Dafne's Project/
│
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos CSS
├── js/
│   └── script.js       # JavaScript para interactividad
├── images/             # Carpeta para imágenes (vacía inicialmente)
└── README.md           # Este archivo
```

## Instalación y Uso

1. El proyecto está listo para usar, no requiere instalación de dependencias
2. Abre `index.html` en tu navegador web preferido
3. Para personalizar:
   - Edita `index.html` para cambiar el contenido
   - Modifica `css/style.css` para ajustar estilos
   - Actualiza `js/script.js` para cambiar comportamientos

## Personalización

### Añadir Imágenes

1. Coloca tus imágenes en la carpeta `images/`
2. Actualiza los placeholders en `index.html`:
   ```html
   <div class="image-placeholder">
       <img src="images/tu-imagen.jpg" alt="Descripción">
   </div>
   ```

### Cambiar Colores

Modifica las variables CSS en `css/style.css`:
```css
:root {
    --black: #000000;
    --white: #ffffff;
    --gray-dark: #1a1a1a;
    --gray-medium: #333333;
    --gray-light: #e0e0e0;
}
```

### Actualizar Información de Contacto

Edita la sección de contacto en `index.html`:
- Email
- Teléfono
- Ubicación
- Enlaces a redes sociales

## Funcionalidades JavaScript

- **Menú hamburguesa** para móviles
- **Scroll suave** entre secciones
- **Animaciones al scroll** con Intersection Observer
- **Efecto parallax** en hero y portfolio
- **Validación de formulario** con feedback visual
- **Navegación fija** con cambio de estilo al hacer scroll

## Navegadores Compatibles

- Chrome (última versión)
- Firefox (última versión)
- Safari (última versión)
- Edge (última versión)

## Próximos Pasos

1. Añade tus propias imágenes de proyectos
2. Actualiza el contenido con tu información personal
3. Configura el formulario de contacto con un backend (opcional)
4. Optimiza las imágenes para web
5. Considera añadir más proyectos al portfolio

## Tecnologías

- HTML5
- CSS3 (Flexbox, Grid, Animaciones)
- JavaScript Vanilla (ES6+)
- Diseño Responsive

## Autor

Dafne - Portfolio Creativo

---

**Nota**: Este es un proyecto de portfolio estático. Para funcionalidad completa del formulario de contacto, necesitarás configurar un backend o servicio como FormSpree, EmailJS, o similar.
