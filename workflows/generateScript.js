const fs = require('fs');
const xml2js = require('xml2js');

const xmlFolder = 'xml_files';
const jsFolder = 'generated_js';

// Verifica si la carpeta de XML existe, si no, créala
if (!fs.existsSync(xmlFolder)) {
  fs.mkdirSync(xmlFolder);
}

// Verifica si la carpeta de JS existe, si no, créala
if (!fs.existsSync(jsFolder)) {
  fs.mkdirSync(jsFolder);
}

// Función para procesar un nuevo archivo XML y crear un nuevo archivo JS
function procesarNuevoXml(xmlFileName) {
  const xmlFilePath = `${xmlFolder}/${xmlFileName}`;

  fs.readFile(xmlFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(`Error al leer el archivo XML ${xmlFileName}:`, err);
      return;
    }

    // Parsear el archivo XML
    xml2js.parseString(data, (parseErr, result) => {
      if (parseErr) {
        console.error(`Error al analizar el archivo XML ${xmlFileName}:`, parseErr);
        return;
      }

      // Generar dinámicamente el contenido del script JS
      const jsContent = generateJsContent(xmlFileName, result);

      // Guardar el contenido en un nuevo archivo JS
      const jsFileName = xmlFileName.replace('.xml', '.js');
      const jsFilePath = `${jsFolder}/${jsFileName}`;

      fs.writeFile(jsFilePath, jsContent, 'utf-8', (writeErr) => {
        if (writeErr) {
          console.error(`Error al escribir el archivo JS ${jsFileName}:`, writeErr);
        } else {
          console.log(`Archivo JS ${jsFileName} creado exitosamente.`);
        }
      });
    });
  });
}

// Función para generar dinámicamente el contenido del script JS
function generateJsContent(xmlFileName, xmlData) {
  const url = `../${xmlFolder}/${xmlFileName}`;

  return `// Cargar el XML\var url = '${url}';\n\n` +
    `fetch(url)\n  .then(response => response.text())\n  .then(data => {\n` +
    `    var parser = new DOMParser();\n    var xmlDoc = parser.parseFromString(data, 'application/xml');\n\n` +
    `    // Llamar a la función para construir la tabla\n    construirTabla(xmlDoc);\n  })\n` +
    `  .catch(error => console.error('Error al cargar el XML:', error));\n\n` +
    `// Resto del código...\n`;
}

// Simula la inserción de un nuevo archivo XML (puedes reemplazarlo con la lógica real)
const nuevoXml = 'nuevo_archivo.xml';
procesarNuevoXml(nuevoXml);
