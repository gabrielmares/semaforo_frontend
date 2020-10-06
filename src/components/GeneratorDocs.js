import { TemplateHandler } from 'easy-template-x'
import { ParseDate } from '../Helpers'

// siguiendo el ejemplo de la libreria easy-template-x
async function generateDoc(cliente) {
    const { edoResidencia, munResidencia, pobResidencia, general, ContactoCliente, ColResidencia, EdoNacimiento, DESTINOCREDITO, ULTIMOCREDITO } = cliente;
    console.log(ULTIMOCREDITO)
    const { CODIGO, NOMBRE, NOMBRES, PATERNO, MATERNO, RFC, CURP, TELEFONO, DOMICILIO, CODPOS, FINCENTRO, FINGRUPO, FECNAC, ACTIV, NOIFE } = general[0]
    let data = {
        CODIGO,
        NOMBRE,
        NOMBRES,
        PATERNO,
        MATERNO,
        RFC,
        CURP,
        TELEFONO,
        DOMICILIO,
        CODPOS,
        FINCENTRO,
        FINGRUPO,
        ULTIMOCREDITO,
        FecNac: ParseDate(FECNAC),
        ACTIV,
        NOIFE,
        edoResidencia,
        munResidencia,
        pobResidencia,
        ContactoCliente,
        ColResidencia,
        EdoNacimiento,
        DESTINOCREDITO        
    };
    const doc = await fetch('./Solicitud.docx');
    const template = await doc.blob();
    const handler = new TemplateHandler();

    // se genera el doc, cargando las variables en los campos dentro de corchetes
    const nuevaSolicitudCr = await handler.process(template, data);

    // guardamos el documento en el cliente
    saveFile(`${CODIGO}.docx`, nuevaSolicitudCr);

    function saveFile(filename, blob) {


        // get downloadable url from the blob
        const blobUrl = URL.createObjectURL(blob);

        // create temp link element
        let link = document.createElement("a");
        link.download = filename;
        link.href = blobUrl;

        // use the link to invoke a download
        document.body.appendChild(link);
        link.click();

        // remove the link
        setTimeout(() => {
            link.remove();
            window.URL.revokeObjectURL(blobUrl);
            link = null;
        }, 0);
    }

}

export default generateDoc;