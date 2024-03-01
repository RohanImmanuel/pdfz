# PDFz
PDFz is a CLI tool for managing PDF files. It allows users to merge multiple PDFs into one file, extract/reorder specific pages from a PDF, and compress PDF files.

## Features
**Merge PDFs**: Combine multiple PDF files into a single PDF file.
**Extract Pages**: Create a new PDF with only selected pages from an existing PDF.
**Compress PDF**: Reduce the file size of a PDF.

## Installation
```bash
npm install -g pdfz
```

## Usage

### Merge PDFs

To merge multiple PDF files into one, use the `merge` command:

```bash
node index.js merge output.pdf file1.pdf file2.pdf [...other files]
```

### Extract Pages

To extract specific pages from a PDF, use the `extract` command:

```bash
node index.js extract output.pdf input.pdf 1 4 5
```

In this command, `1 4 5` are the page numbers to be extracted from `input.pdf`. This command can also be used to reorder the pages specifying the page numbers `7 3 10`

### Compress PDF

To compress a PDF file, use the `compress` command:

```bash
node index.js compress output.pdf input.pdf
```

### Version Information

To view the version of the PDF CLI Tool, use the `-v` or `--version` option:

```bash
node index.js -v
```

### Help

For help and information about the commands, use the `-h` or `--help` option:

```bash
node index.js -h
```

## Contributing

Contributions to the PDF CLI Tool are welcome. Please ensure that your code adheres to the project's coding standards and include tests for new features.

## License

This project is licensed under the [GNU General Public License v3](https://www.gnu.org/licenses/gpl-3.0.en.html)
