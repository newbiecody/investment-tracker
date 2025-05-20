// pdf-parse.d.ts
declare module "pdf-parse" {
  interface PDFInfo {
    numpages: number;
    numrender: number;
    info: Record<string, any>;
    metadata: any;
    version: string;
  }

  interface PDFData {
    text: string;
    info: PDFInfo;
    metadata: any;
    version: string;
  }

  function pdf(buffer: Buffer, options?: any): Promise<PDFData>;

  export = pdf;
}
