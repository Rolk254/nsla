<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <!-- Identity template -->
  <xsl:template match="@* | node()">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()"/>
    </xsl:copy>
  </xsl:template>

  <!-- Root template -->
  <xsl:template match="clasificacion">
    <html lang="es">
      <head>
        <meta charset="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>NSLA-Clasificacion</title>
        <link rel="stylesheet" href="../estilos/styles.css"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto"/>
        <link rel="icon" type="image/x-icon" href="../imagenes/logos/nofondo.png"/>
      </head>
      <body>
        <header>
          <div class="left-section">
            <a href="../index.html"><img class="logo" src="../imagenes/logos/nofondo2.png" alt=""/></a>
          </div>
          <div class="togglearea">
            <label for="toggle">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
          <input type="checkbox" id="toggle"/>
          <div class="navbar">
            <a href="../index.html">Inicio</a>
            <a href="calendar_t1.xml">Calendario</a>
            <a id="active" href="clasi.xml">Clasificación</a>
            <a href="datos.xml">Equipos</a>
            <a href="../paginas/noticias.html">Noticias</a>
            <a href="../paginas/contacto.html">Contacto</a>
          </div>
        </header>
        <section>
          <!-- Tabla de clasificación -->
          <div class="divtabla">
            <table class="tablaclasi">
              <thead>
                <tr>
                  <th colspan="9" class="titulotabla">Tabla de Clasificación de la NSLA</th>
                </tr>
              </thead>
              <tbody>
                <tr class="columnatabla">
                  <th></th>
                  <th>PJ</th>
                  <th>V</th>
                  <th>D</th>
                  <th>E</th>
                  <th>Local</th>
                  <th>Visitante</th>
                  <th>PP</th>
                  <th>PC</th>
              </tr>
                <xsl:apply-templates select="equipo">
                  <xsl:sort select="victorias" order="descending" data-type="number"/>
                </xsl:apply-templates>
              </tbody>
            </table>
          </div>
        </section>
        <footer class="footer">
          <div>
            <ul>
              <li><img class="logopie" src="../imagenes/logos/nofondo.png" alt=""/></li>
              <li>
                <p>
                  © 2023 NSLA Enterprises LLC. NSLA and the NSLA shield design are registered trademarks of the National Football League.
                  The team names, logos and uniform designs are registered trademarks of the teams indicated.
                  All other NSLA-related trademarks are trademarks of the National Football League. NSLA footage © NSLA Productions LLC.
                </p>
              </li>
              <li class="terms">
                <a href="privacidad.html">Política de Privacidad</a>
                <a href="terminos.html">Terminos de Servicio</a>
                <a href="">Terminos y Condiciones de Subscripción</a>
                <a href="">Tus Ajustes de Privacidad</a>
                <a href="">Ajustes de Cookies</a>
              </li>
            </ul>
          </div>
        </footer>
      </body>
    </html>
  </xsl:template>

  <!-- Template for transforming equipo elements -->
  <xsl:template match="equipo">
    <tr class="celdatabla">
      <td class="columnatabla">
        <xsl:choose>
          <xsl:when test="translate(nombre, ' ', '') = 'Cardinals'">
            <xsl:attribute name="class">cardinals</xsl:attribute>
          </xsl:when>
          <xsl:when test="translate(nombre, ' ', '') = 'Cowboys'">
            <xsl:attribute name="class">cowboys</xsl:attribute>
          </xsl:when>
          <xsl:when test="translate(nombre, ' ', '') = 'Raiders'">
            <xsl:attribute name="class">raiders</xsl:attribute>
          </xsl:when>
          <xsl:when test="translate(nombre, ' ', '') = 'Steelers'">
            <xsl:attribute name="class">steelers</xsl:attribute>
          </xsl:when>
          <xsl:when test="translate(nombre, ' ', '') = 'Bengals'">
            <xsl:attribute name="class">bengals</xsl:attribute>
          </xsl:when>
          <xsl:when test="translate(nombre, ' ', '') = 'Rams'">
            <xsl:attribute name="class">rams</xsl:attribute>
          </xsl:when>
          <xsl:when test="translate(nombre, ' ', '') = 'Chiefs'">
            <xsl:attribute name="class">chiefs</xsl:attribute>
          </xsl:when>
          <xsl:when test="translate(nombre, ' ', '') = 'Bears'">
            <xsl:attribute name="class">bears</xsl:attribute>
          </xsl:when>
        </xsl:choose>
        <img>
         <xsl:attribute name="src">
            <xsl:value-of select="concat('../imagenes/otras/logosequipos/', translate(nombre, ' ', ''), '.png')"/>
        </xsl:attribute>
          <xsl:attribute name="alt">Logo</xsl:attribute>
          <xsl:attribute name="width">30px</xsl:attribute>
        </img>
        <xsl:value-of select="concat(' ', nombre)"/>
      </td>
      <td><xsl:value-of select="partidos_jugados"/></td>
      <td><xsl:value-of select="victorias"/></td>
      <td><xsl:value-of select="derrotas"/></td>
      <td><xsl:value-of select="empates"/></td>
      <td><xsl:value-of select="locales"/></td>
      <td><xsl:value-of select="visitantes"/></td>
      <td><xsl:value-of select="puntos_perdidos"/></td>
      <td><xsl:value-of select="puntos_concedidos"/></td>
    </tr>
  </xsl:template>

</xsl:stylesheet>
