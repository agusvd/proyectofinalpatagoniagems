-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 06-12-2023 a las 23:44:22
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
-- Estructura de tabla para la tabla `blog`
--

CREATE TABLE `blog` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `img` varchar(1000) DEFAULT NULL,
  `fechaPublicacion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `blog`
--

INSERT INTO `blog` (`id`, `titulo`, `descripcion`, `img`, `fechaPublicacion`) VALUES
(2, 'nuevo blog pa', '<p>asdjoasjkdasafjafjajksdkakdjsjhdksad hola</p>', 'https://firebasestorage.googleapis.com/v0/b/patagoniagems-5fad5.appspot.com/o/1.jpeg?alt=media&token=01d5bc7d-7359-4146-85ef-64320225d283', NULL);

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

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`id`, `usuario_id`, `producto_id`, `precio_total`, `cantidad_total`) VALUES
(249, 4, 45, 290000, 1),
(336, 37, 49, 160000, 2),
(337, 37, 53, 60000, 1),
(395, 2, 45, 30000, 1),
(397, 1, 58, 60000, 2),
(398, 1, 53, 120000, 2),
(416, 2, 58, 30000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_id`
--

CREATE TABLE `categoria_id` (
  `id` int(11) NOT NULL,
  `categoria` varchar(150) NOT NULL,
  `imagen` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria_id`
--

INSERT INTO `categoria_id` (`id`, `categoria`, `imagen`) VALUES
(1, 'Nike', 'https://firebasestorage.googleapis.com/v0/b/patagoniagems-5fad5.appspot.com/o/a.jpeg?alt=media&token=416e5322-5019-4da5-b995-f1ecbb3d13e1'),
(18, 'Aromaterapia Esotérica', 'https://firebasestorage.googleapis.com/v0/b/patagoniagems-5fad5.appspot.com/o/WhatsApp%20Image%202023-11-21%20at%2023.52.14.jpeg?alt=media&token=c17c8c7b-1364-431f-8ad9-94f8dad400d6'),
(27, 'Aromaterapia Terapéutica', 'https://firebasestorage.googleapis.com/v0/b/patagoniagems-5fad5.appspot.com/o/1.jpeg?alt=media&token=01d5bc7d-7359-4146-85ef-64320225d283'),
(28, 'Cosmética Natural Emocional', 'https://firebasestorage.googleapis.com/v0/b/patagoniagems-5fad5.appspot.com/o/2.jpeg?alt=media&token=ec303be6-cf1d-40f7-aa01-82025bd2e2ee'),
(29, 'Joyas y Amuletos ', 'https://firebasestorage.googleapis.com/v0/b/patagoniagems-5fad5.appspot.com/o/3.jpeg?alt=media&token=c8234f34-4ff4-49f8-a4fd-78749c9d8119'),
(30, 'Accesorios mágicos', 'https://firebasestorage.googleapis.com/v0/b/patagoniagems-5fad5.appspot.com/o/4.jpeg?alt=media&token=4ea8b494-7f82-4f20-956f-1c72b4b38d10'),
(31, 'Deco Energía', 'https://firebasestorage.googleapis.com/v0/b/patagoniagems-5fad5.appspot.com/o/4.jpeg?alt=media&token=4ea8b494-7f82-4f20-956f-1c72b4b38d10'),
(32, 'Inciensos y difusores ', 'https://firebasestorage.googleapis.com/v0/b/patagoniagems-5fad5.appspot.com/o/4.jpeg?alt=media&token=4ea8b494-7f82-4f20-956f-1c72b4b38d10'),
(33, 'Artículos para Terapéutas', 'https://firebasestorage.googleapis.com/v0/b/patagoniagems-5fad5.appspot.com/o/4.jpeg?alt=media&token=4ea8b494-7f82-4f20-956f-1c72b4b38d10'),
(34, 'Tableros y rejillas energéticas', 'https://firebasestorage.googleapis.com/v0/b/patagoniagems-5fad5.appspot.com/o/4.jpeg?alt=media&token=4ea8b494-7f82-4f20-956f-1c72b4b38d10'),
(35, 'Tarot y oráculos ', 'https://firebasestorage.googleapis.com/v0/b/patagoniagems-5fad5.appspot.com/o/4.jpeg?alt=media&token=4ea8b494-7f82-4f20-956f-1c72b4b38d10'),
(36, 'Muñecos mágicos Espirituales ', 'https://firebasestorage.googleapis.com/v0/b/patagoniagems-5fad5.appspot.com/o/4.jpeg?alt=media&token=4ea8b494-7f82-4f20-956f-1c72b4b38d10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `preference_id` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_description` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `categoria_id` int(11) NOT NULL,
  `cantidad_gramos` int(11) DEFAULT NULL,
  `cantidad_ml` int(11) DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `imagen` varchar(1000) NOT NULL,
  `precio` int(11) NOT NULL,
  `es_destacado` enum('si','no') NOT NULL DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `categoria_id`, `cantidad_gramos`, `cantidad_ml`, `stock`, `descripcion`, `imagen`, `precio`, `es_destacado`) VALUES
(43, 'Nike dunk panda', 1, NULL, NULL, 5, 'Tenis Dunk Low Retro en cuero y goma de color negro y blanco de NIKE con puntera redonda, suela plana de goma, cierre con agujetas en la parte delantera, plantilla con logo, detalle del logo y Estos estilos son suministrados por un marketplace de tenis, el cual ofrece los artículos más codiciados y difíciles de encontrar de todo el mundo..', 'https://cdn-images.farfetch-contents.com/16/40/35/69/16403569_31750946_1000.jpg', 10000, 'no'),
(45, 'Dunk High SP de Nike x UNDEFEATED', 1, NULL, NULL, 10, 'tenis Dunk High SP de Nike x UNDEFEATED \n\n\nDetalle del logo, logo en relieve en la parte posterior, puntera redonda, cierre con agujetas en la parte delantera, parche del logo en la lengüeta, plantilla con logo y suela de goma. Material: Gamuza. Estos estilos son suministrados por un marketplace de tenis, el cual ofrece los artículos más codiciados y difíciles de encontrar de todo el mundo..\n', 'https://cdn-images.farfetch-contents.com/17/37/23/06/17372306_36102523_1000.jpg', 30000, 'no'),
(46, 'Nike x StrangeLove Dunk Low SB', 1, NULL, NULL, 3, 'Rojo, rosa, piel artificial, detalle del logo Swoosh característico, puntera redonda, cierre con agujetas en la parte delantera, parche del logo en la lengüeta, logo bordado en la parte posterior, plantilla con logo y suela de goma. Estos estilos son suministrados por un marketplace de tenis, el cual ofrece los artículos más codiciados y difíciles de encontrar de todo el mundo.', 'https://cdn-images.farfetch-contents.com/15/16/56/64/15165664_40786743_1000.jpg', 25000, 'si'),
(47, 'Air Force 1 Low MCA', 1, NULL, NULL, 4, 'Características\nazul\npuntera redonda\ncierre con lazo\nsuela plana de goma\nlogo de Nike\nEstos estilos son suministrados por un marketplace de zapatillas premium, el cual ofrece el calzado más codiciado y difícil de encontrar de todo el mundo.', 'https://cdn-images.farfetch-contents.com/14/19/31/41/14193141_20010785_1000.jpg', 25000, 'no'),
(48, 'bajos Nike Dunk x Off-White', 1, NULL, NULL, 5, 'Diseño a paneles, plantilla con logo, detalle del logo y diseño con perforaciones. Material: Cuero. Estos estilos son suministrados por un marketplace de tenis, el cual ofrece los artículos más codiciados y difíciles de encontrar de todo el mundo..', 'https://cdn-images.farfetch-contents.com/17/41/12/15/17411215_36029752_1000.jpg', 98000, 'no'),
(49, 'Dunk SB Low Pro QS de Nike x Parra', 1, NULL, NULL, 1, 'Detalle del logo, logo estampado en la parte posterior, panel en contraste, puntera redonda, cierre con agujetas en la parte delantera, parche del logo en la lengüeta, plantilla con logo y suela de goma. Estos estilos son suministrados por un marketplace de tenis, el cual ofrece los artículos más codiciados y difíciles de encontrar de todo el mundo..', 'https://cdn-images.farfetch-contents.com/17/57/17/52/17571752_36599119_1000.jpg', 80000, 'si'),
(50, ' SB Dunk Low \"\"Gardenia\"\" de Nike x Fly Streetwear', 1, NULL, NULL, 10, 'Blanco, gris claro, azul real, cuero, panel de gamuza, detalle del logo Swoosh característico, puntera redonda, cierre con agujetas en la parte delantera, parche del logo en la lengüeta, contrafuerte en contraste, plantilla con logo y suela de goma. Estos estilos son suministrados por un marketplace de tenis, el cual ofrece los artículos más codiciados y difíciles de encontrar de todo el mundo..\n', 'https://cdn-images.farfetch-contents.com/20/08/29/97/20082997_45110786_1000.jpg', 25000, 'no'),
(51, 'Dunk Mid de Nike x Social Status', 1, NULL, NULL, 4, 'Detalle del logo, panel en contraste, puntera redonda, cierre con agujetas en la parte delantera, parche del logo en la lengüeta, plantilla con logo y suela de goma. Estos estilos son suministrados por un marketplace de tenis, el cual ofrece los artículos más codiciados y difíciles de encontrar de todo el mundo..', 'https://cdn-images.farfetch-contents.com/17/30/50/30/17305030_36898669_1000.jpg', 15000, 'no'),
(52, 'Dunk Hi SP', 1, NULL, NULL, 10, 'Detalle del logo, estampado de eslogan en el lateral, panel en contraste, agujetas en contraste, puntera redonda, cierre con agujetas en la parte delantera, parche del logo en la lengüeta, diseño por el tobillo, lengüeta con logo en la parte posterior, plantilla con logo y suela de goma. Estos estilos son suministrados por un marketplace de tenis, el cual ofrece los artículos más codiciados y difíciles de encontrar de todo el mundo.', 'https://cdn-images.farfetch-contents.com/17/08/35/27/17083527_34534020_1000.jpg', 40000, 'no'),
(53, 'SB Dunk de Nike x Travis Scott', 1, NULL, NULL, 5, 'Características\nnegro/azul\ndetalle del logo Swoosh característico\npuntera redonda\ncierre con agujetas en la parte delantera\nsuela de goma\nEstos estilos son suministrados por un marketplace de tenis, el cual ofrece los artículos más codiciados y difíciles de encontrar de todo el mundo.', 'https://cdn-images.farfetch-contents.com/15/11/07/25/15110725_25718039_1000.jpg', 60000, 'si'),
(54, ' Dunk Low SP \"\"Canteen\"\" de Nike x Undefeated Dunk Low SP ', 1, NULL, NULL, 10, 'Diseño a paneles, detalle del logo Swoosh característico, logo bordado en la parte posterior, logo bordado en el lateral, parche del logo en la lengüeta, puntera redonda, cierre con agujetas en la parte delantera y suela de goma. Material: Cuero. Estos estilos son suministrados por un marketplace de tenis, el cual ofrece los artículos más codiciados y difíciles de encontrar de todo el mundo..', 'https://cdn-images.farfetch-contents.com/17/02/38/32/17023832_35780735_1000.jpg', 40000, 'no'),
(55, 'Dunk High Pro SB', 1, NULL, NULL, 2, 'Tenis Dunk High Pro SB en lona de color multicolor de Nike con puntera redonda, suela de goma, logo Nike, corte al tobillo, cierre con cordones en la parte delantera, parche del logo en la lengüeta y lengüeta en la parte posterior. Estos estilos llegan a nosotros gracias a un marketplace de tenis especializados y piezas difíciles de conseguir. Cada producto es rigurosamente inspeccionado por expertos que garantizan su autenticidad.', 'https://cdn-images.farfetch-contents.com/14/46/37/00/14463700_21227359_1000.jpg', 30000, 'no'),
(56, 'Dunk de Nike x Off-White', 1, NULL, NULL, 4, 'Negro, cuero, detalle del logo, logo estampado en la parte posterior, puntera redonda, cierre con agujetas en la parte delantera, plantilla con logo y suela de goma.', 'https://cdn-images.farfetch-contents.com/17/24/11/61/17241161_35307052_1000.jpg', 70000, 'no'),
(57, 'Dunk Low Premium SB', 1, NULL, NULL, 2, 'Tenis Dunk Low Premium SB en cuero de Nike con puntera redonda, suela de goma, cierre con lazo y logo Nike. Estos estilos llegan a nosotros gracias a un marketplace de tenis especializados y piezas difíciles de conseguir. Cada producto es rigurosamente inspeccionado por expertos que garantizan su autenticidad.', 'https://cdn-images.farfetch-contents.com/14/55/35/73/14553573_22373674_1000.jpg', 40000, 'no'),
(58, 'Nike Vulcanized Off White', 1, NULL, NULL, 10, 'Tenis bajos Vulcanized en algodón de color blanco y negro de OFF-WHITE con etiqueta Zip Tie característica, motivo Arrows característico, estampado a rayas Diag característico, logo estampado en el lateral, puntera redonda, cierre con agujetas en la parte delantera, parche del logo en la lengüeta, plantilla con logo, suela de goma vulcanizada y Debido al proceso de teñido utilizado, este producto no debe entrar en contacto con agua..', 'https://cdn-images.farfetch-contents.com/17/59/36/78/17593678_37287546_1000.jpg', 30000, 'si'),
(68, 'milanesa', 18, NULL, NULL, 10, 'una milanesa con jamon y queso', 'https://www.lecturas.com/recetas/medio/2022/09/06/paso_a_paso_para_hacer_milanesa_de_cerdo_con_arroz_resultado_final_6e9669e2_1200x630.jpg', 8000, 'no');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shipping_details`
--

CREATE TABLE `shipping_details` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `correo` varchar(500) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `metodo_envio` varchar(50) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `comuna` varchar(100) DEFAULT NULL,
  `codigo_postal` varchar(20) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `numero_casa` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `role` enum('user','admin') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `contraseña`, `role`) VALUES
(1, 'Agustin', 'Villarroel', 'agus@gmail.com', '$2b$10$.HGssuNG2.iFLQCVoewx6.adML8/yFRpgPBaskftyhq5VbdqQFdgu', 'admin'),
(2, 'Claudio', 'Arias', 'claudio@gmail.com', '$2b$10$l/BQmYG0XwXIq3Wyb/WtH.L90XoFKS9UFoGtkUxfVhW2rO0Fj//Ba', 'user'),
(4, 'Sebastian', 'Godoy', 'seba@gmail.com', '$2b$10$W3VmpvkBwY3BNws58SUWz.RBANA.pdibEcHEjVqy2jtYi63o0K8jW', 'user'),
(37, 'Agustin', 'Asdasdd', 'agus2@gmail.com', '$2b$10$aVDRRjx.Qc5zzugwdBQ3DOeABA2ggGLwiqbkgxFGVjSLHBscEMxjO', 'user');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

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
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `shipping_details`
--
ALTER TABLE `shipping_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=417;

--
-- AUTO_INCREMENT de la tabla `categoria_id`
--
ALTER TABLE `categoria_id`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de la tabla `shipping_details`
--
ALTER TABLE `shipping_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

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
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria_id` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `shipping_details`
--
ALTER TABLE `shipping_details`
  ADD CONSTRAINT `shipping_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
