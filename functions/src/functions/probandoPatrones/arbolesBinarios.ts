import { Documento } from '../../core/models';
import { onDocumentCreated, onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { plainToClass } from 'class-transformer';
import { convertDocumentTimestampsToDate } from '../../core/utils';
// import { procesarDocumentoFlujoGenerar } from '../../core/caseUse/generarDoc';
import { procesarDocumentoFlujoActualizacion } from '../../core/caseUse/actualizarDocumentoPDF';
import { FirestoreRepository } from '../../core/services/repository/FirestoreRepository';
import { ArbolBinario, HandlerGenerarPDF } from '../../core/caseUse/builder';

export const handler = onDocumentCreated("/auth/{id}", async(event)  => {
    const data = event.data?.data();
    const transformedData = convertDocumentTimestampsToDate(data);
    const doc = plainToClass(Documento, transformedData);
    console.log("--------caso de uso ----->");
    // const rutaDoc = `empresas/${event.params.nombreEmpresa}/gerencias/${event.params.nombreGerencia}/divisiones/${event.params.nombreDivision}/documentos`;
    // const repo = new FirestoreRepository<Documento>(rutaDoc);
    const empresa = "VAKU";
    const generarPDF = new HandlerGenerarPDF(empresa);

    const arbol = new ArbolBinario();
    arbol.insertarNodo([generarPDF]);

    arbol.procesarDocumento(doc);

    

})
export const escuchandoCambios = onDocumentUpdated("empresas/{nombreEmpresa}/gerencias/{nombreGerencia}/divisiones/{nombreDivision}/documentos/{docId}", async(event)  => {
    const data = event.data?.after.data();
    const transformedData = convertDocumentTimestampsToDate(data);
    const doc = plainToClass(Documento, transformedData);
    //obtener datos anteriores y transformarlo a Documento
    const dataAnterior = event.data?.before.data();
    const transformedData2 = convertDocumentTimestampsToDate(dataAnterior);
    const docAnterior = plainToClass(Documento, transformedData2);
    console.log("--> estado anterior desde main",docAnterior.estado);
    // console.log("--> documento",doc);
    console.log("--------caso de uso ----->");
    const rutaDoc = `empresas/${event.params.nombreEmpresa}/gerencias/${event.params.nombreGerencia}/divisiones/${event.params.nombreDivision}/documentos`;
    const repo = new FirestoreRepository<Documento>(rutaDoc);
    const empresa = event.params.nombreEmpresa;
    procesarDocumentoFlujoActualizacion(doc,docAnterior,repo,empresa);
})
