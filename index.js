#!/usr/bin/env node

const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

const helpInfo = `
Usage: pdfz [command] [options]
Commands:
  merge [output] [file1] [file2]...         Merge multiple PDFs into one
  extract [output] [input] [page numbers]   Extract pages from a PDF
  compress [output] [input]                 Compress a PDF file

Options:
  -h, --help    Show help
  -v, --version Show version number`;

const mergePDFs = async (files, output) => {
    console.log('mergeing pdf')
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
        const pdf = await PDFDocument.load(fs.readFileSync(file));
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    fs.writeFileSync(output, mergedPdfBytes);
};

const extractPages = async (file, pages, output) => {
    console.log(pages);
    pages = pages.map(page => page - 1);
    console.log(pages);
    const pdf = await PDFDocument.load(fs.readFileSync(file));
    const newPdf = await PDFDocument.create();

    const extractedPages = await newPdf.copyPages(pdf, pages);
    extractedPages.forEach((page) => newPdf.addPage(page));

    const newPdfBytes = await newPdf.save();
    fs.writeFileSync(output, newPdfBytes);
};

const compressPDF = async (file, output) => {
    const pdf = await PDFDocument.load(fs.readFileSync(file));
    pdf.embedFonts();
    const compressedPdfBytes = await pdf.save({ useObjectStreams: true });
    fs.writeFileSync(output, compressedPdfBytes);
};

function appendPdfExtension(str) {
    if (!str.endsWith(".pdf")) {
        return str + ".pdf";
    }
    return str;
}

function commandvariations(command) {
    return [command, '-'+command, '--'+command, command.charAt(0), '-'+command.charAt(0), '--'+command.charAt(0)];
}

const main = async () => {
    const args = process.argv.slice(2);
    
    // Example: node index.js merge output.pdf file1.pdf file2.pdf
    if (commandvariations('merge').includes(args[0])) {
        const output = appendPdfExtension(args[1]);
        const files = args.slice(2).map(f => appendPdfExtension(f));
        await mergePDFs(files, output);
    }

    // Example: node index.js extract output.pdf input.pdf 1 3 
    else if (commandvariations('extract').includes(args[0])) {
        const output = appendPdfExtension(args[1]);
        const file = appendPdfExtension(args[2]);
        const pages = args.slice(3).map(Number);
        await extractPages(file, pages, output);
    }

    // Example: node index.js compress output.pdf input.pdf
    else if (commandvariations('compress').includes(args[0])) {
        const output = appendPdfExtension(args[1]);
        const file = appendPdfExtension(args[2]);
        await compressPDF(file, output);
    }

    else if (commandvariations('help').includes(args[0])) {
        console.log(helpInfo);
    }

    else if (commandvariations('version').includes(args[0])) {
        console.log(`pdf-cli-tool version ${packageJson.version}`);
    }
};

main().catch(error => console.error(error));
