-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 12-07-2023 a las 23:09:36
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `patagoniagems`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `precio_total` int(11) NOT NULL,
  `cantidad_total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_id`
--

CREATE TABLE `categoria_id` (
  `id` int(11) NOT NULL,
  `categoria` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria_id`
--

INSERT INTO `categoria_id` (`id`, `categoria`) VALUES
(1, 'Nike Dunks'),
(6, 'Sprays'),
(8, 'Jabones'),
(9, 'Joyas'),
(10, 'Cartas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes_productos`
--

CREATE TABLE `imagenes_productos` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `imagen` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `precio` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `es_destacado` enum('si','no') NOT NULL DEFAULT 'no',
  `imagen` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `categoria_id`, `es_destacado`, `imagen`) VALUES
(43, 'nike dunk  panda', 'zapatilla god urbana nike dunk panda color negro', 120000, 5, 1, 'si', 'https://www.shutterstock.com/image-photo/thailand-nakhon-ratchasima-6-july-260nw-2003127476.jpg'),
(44, 'Nike Dunk Low \"Pine Green\" x Off-White', 'Nike Dunk Low \"Pine Green\" x Off-White GOOOOOOODODODODODODODO', 500000, 2, 1, 'si', 'https://mistillas.cl/wp-content/uploads/2019/08/Nike-Dunk-Low-Pine-Green-x-Off-White-01.jpg'),
(45, 'Dunk High SP de Nike x UNDEFEATED', 'tenis Dunk High SP de Nike x UNDEFEATED \n\n\nDetalle del logo, logo en relieve en la parte posterior, puntera redonda, cierre con agujetas en la parte delantera, parche del logo en la lengüeta, plantilla con logo y suela de goma. Material: Gamuza. Estos estilos son suministrados por un marketplace de tenis, el cual ofrece los artículos más codiciados y difíciles de encontrar de todo el mundo..\n', 290000, 10, 1, 'no', 'https://cdn-images.farfetch-contents.com/17/37/23/06/17372306_36102523_1000.jpg'),
(46, 'Nike x StrangeLove Dunk Low SB', 'Rojo, rosa, piel artificial, detalle del logo Swoosh característico, puntera redonda, cierre con agujetas en la parte delantera, parche del logo en la lengüeta, logo bordado en la parte posterior, plantilla con logo y suela de goma. Estos estilos son suministrados por un marketplace de tenis, el cual ofrece los artículos más codiciados y difíciles de encontrar de todo el mundo.', 3400000, 3, 1, 'si', 'https://cdn-images.farfetch-contents.com/15/16/56/64/15165664_40786743_1000.jpg'),
(47, 'Air Force 1 Low MCA', 'Características\nazul\npuntera redonda\ncierre con lazo\nsuela plana de goma\nlogo de Nike\nEstos estilos son suministrados por un marketplace de zapatillas premium, el cual ofrece el calzado más codiciado y difícil de encontrar de todo el mundo.', 2500000, 4, 1, 'no', 'https://cdn-images.farfetch-contents.com/14/19/31/41/14193141_20010785_1000.jpg'),
(48, 'bajos Nike Dunk x Off-White', 'Diseño a paneles, plantilla con logo, detalle del logo y diseño con perforaciones. Material: Cuero. Estos estilos son suministrados por un marketplace de tenis, el cual ofrece los artículos más codiciados y difíciles de encontrar de todo el mundo..', 980000, 5, 1, 'no', 'https://cdn-images.farfetch-contents.com/17/41/12/15/17411215_36029752_1000.jpg'),
(49, 'Dunk SB Low Pro QS de Nike x Parra', 'Detalle del logo, logo estampado en la parte posterior, panel en contraste, puntera redonda, cierre con agujetas en la parte delantera, parche del logo en la lengüeta, plantilla con logo y suela de goma. Estos estilos son suministrados por un marketplace de tenis, el cual ofrece los artículos más codiciados y difíciles de encontrar de todo el mundo..', 9990000, 1, 1, 'si', 'https://cdn-images.farfetch-contents.com/17/57/17/52/17571752_36599119_1000.jpg'),
(50, ' SB Dunk Low \"\"Gardenia\"\" de Nike x Fly Streetwear', 'Blanco, gris claro, azul real, cuero, panel de gamuza, detalle del logo Swoosh característico, puntera redonda, cierre con agujetas en la parte delantera, parche del logo en la lengüeta, contrafuerte en contraste, plantilla con logo y suela de goma. Estos estilos son suministrados por un marketplace de tenis, el cual ofrece los artículos más codiciados y difíciles de encontrar de todo el mundo..\n', 250000, 10, 1, 'no', 'https://cdn-images.farfetch-contents.com/20/08/29/97/20082997_45110786_1000.jpg'),
(51, 'Dunk Mid de Nike x Social Status', 'Detalle del logo, panel en contraste, puntera redonda, cierre con agujetas en la parte delantera, parche del logo en la lengüeta, plantilla con logo y suela de goma. Estos estilos son suministrados por un marketplace de tenis, el cual ofrece los artículos más codiciados y difíciles de encontrar de todo el mundo..', 150000, 4, 1, 'no', 'https://cdn-images.farfetch-contents.com/17/30/50/30/17305030_36898669_1000.jpg'),
(52, 'Dunk Hi SP', 'Detalle del logo, estampado de eslogan en el lateral, panel en contraste, agujetas en contraste, puntera redonda, cierre con agujetas en la parte delantera, parche del logo en la lengüeta, diseño por el tobillo, lengüeta con logo en la parte posterior, plantilla con logo y suela de goma. Estos estilos son suministrados por un marketplace de tenis, el cual ofrece los artículos más codiciados y difíciles de encontrar de todo el mundo.', 120000, 10, 1, 'no', 'https://cdn-images.farfetch-contents.com/17/08/35/27/17083527_34534020_1000.jpg'),
(53, 'SB Dunk de Nike x Travis Scott', 'Características\nnegro/azul\ndetalle del logo Swoosh característico\npuntera redonda\ncierre con agujetas en la parte delantera\nsuela de goma\nEstos estilos son suministrados por un marketplace de tenis, el cual ofrece los artículos más codiciados y difíciles de encontrar de todo el mundo.', 2000000, 5, 1, 'si', 'https://cdn-images.farfetch-contents.com/15/11/07/25/15110725_25718039_1000.jpg'),
(54, ' Dunk Low SP \"\"Canteen\"\" de Nike x Undefeated Dunk Low SP ', 'Diseño a paneles, detalle del logo Swoosh característico, logo bordado en la parte posterior, logo bordado en el lateral, parche del logo en la lengüeta, puntera redonda, cierre con agujetas en la parte delantera y suela de goma. Material: Cuero. Estos estilos son suministrados por un marketplace de tenis, el cual ofrece los artículos más codiciados y difíciles de encontrar de todo el mundo..', 220000, 10, 1, 'no', 'https://cdn-images.farfetch-contents.com/17/02/38/32/17023832_35780735_1000.jpg'),
(55, 'Dunk High Pro SB', 'Tenis Dunk High Pro SB en lona de color multicolor de Nike con puntera redonda, suela de goma, logo Nike, corte al tobillo, cierre con cordones en la parte delantera, parche del logo en la lengüeta y lengüeta en la parte posterior. Estos estilos llegan a nosotros gracias a un marketplace de tenis especializados y piezas difíciles de conseguir. Cada producto es rigurosamente inspeccionado por expertos que garantizan su autenticidad.', 1500000, 2, 1, 'no', 'https://cdn-images.farfetch-contents.com/14/46/37/00/14463700_21227359_1000.jpg'),
(56, 'Dunk de Nike x Off-White', 'Negro, cuero, detalle del logo, logo estampado en la parte posterior, puntera redonda, cierre con agujetas en la parte delantera, plantilla con logo y suela de goma.', 1200000, 4, 1, 'no', 'https://cdn-images.farfetch-contents.com/17/24/11/61/17241161_35307052_1000.jpg'),
(57, 'Dunk Low Premium SB', 'Tenis Dunk Low Premium SB en cuero de Nike con puntera redonda, suela de goma, cierre con lazo y logo Nike. Estos estilos llegan a nosotros gracias a un marketplace de tenis especializados y piezas difíciles de conseguir. Cada producto es rigurosamente inspeccionado por expertos que garantizan su autenticidad.', 3100000, 2, 1, 'no', 'https://cdn-images.farfetch-contents.com/14/55/35/73/14553573_22373674_1000.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `email` varchar(150) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `region` varchar(255) DEFAULT NULL,
  `comuna` varchar(255) DEFAULT NULL,
  `nombreCalle` varchar(255) DEFAULT NULL,
  `numeroCalle` int(11) DEFAULT NULL,
  `ciudad` varchar(255) DEFAULT NULL,
  `numeroDepa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `contraseña`, `role`, `region`, `comuna`, `nombreCalle`, `numeroCalle`, `ciudad`, `numeroDepa`) VALUES
(1, 'Agustin', 'Villarroel', 'agus@gmail.com', '$2b$10$.HGssuNG2.iFLQCVoewx6.adML8/yFRpgPBaskftyhq5VbdqQFdgu', 'admin', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Claudio', 'Arias', 'claudio@gmail.com', '$2b$10$l/BQmYG0XwXIq3Wyb/WtH.L90XoFKS9UFoGtkUxfVhW2rO0Fj//Ba', 'user', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'Sebastian', 'Godoy', 'seba@gmail.com', '$2b$10$W3VmpvkBwY3BNws58SUWz.RBANA.pdibEcHEjVqy2jtYi63o0K8jW', 'user', NULL, NULL, NULL, NULL, NULL, NULL),
(14, 'Karlos', 'Kkkk', 'kkkk@gmail.con', '$2b$10$DBaqu2d8FqT.qcfPEjv/.OJitulVy5A.cR1v.uxXYQR.aG7mTy9yy', 'user', NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `categoria_id`
--
ALTER TABLE `categoria_id`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `imagenes_productos`
--
ALTER TABLE `imagenes_productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=179;

--
-- AUTO_INCREMENT de la tabla `categoria_id`
--
ALTER TABLE `categoria_id`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `imagenes_productos`
--
ALTER TABLE `imagenes_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `imagenes_productos`
--
ALTER TABLE `imagenes_productos`
  ADD CONSTRAINT `imagenes_productos_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria_id` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
