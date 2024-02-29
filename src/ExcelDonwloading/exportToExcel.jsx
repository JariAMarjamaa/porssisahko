import React                        from 'react';
import Excel                        from 'exceljs';    // npm i exceljs
import { saveAs }                   from 'file-saver';  // npm i file-saver

import { formatPriceCacheForExcel } from "../helpers/cacheDataFormating.tsx";

import './exportToExcel.css';

const columns = [
  { header: 'Pvm:', key: 'pvm' },
  { header: 'Klo:', key: 'klo' },
  { header: 'Hinta:', key: 'hinta' },
];

const workSheetName = 'Sivu';
const workBookName = 'Excel tiedosto';
const myInputId = 'myInput';

export default function ExcelDownload() {
  const workbook = new Excel.Workbook();
  let [respData, errorMsg] = formatPriceCacheForExcel();

  const saveExcel = async () => {
    try {
      const myInput = document.getElementById(myInputId);
      const fileName = myInput.value || workBookName;

      // creating one worksheet in workbook
      const worksheet = workbook.addWorksheet("Tietoja", {
        headerFooter:{firstHeader: "Hello Exceljs", firstFooter: "Hello World"}
      });
      // Set footer (default centered), result: "Page 2 of 16"
      worksheet.headerFooter.oddFooter = "Page &P of &N";
      // Add different header & footer for the first page
      worksheet.headerFooter.differentFirst = true;
      worksheet.headerFooter.firstHeader = "First Hello Exceljs";
      worksheet.headerFooter.firstFooter = "First Hello World"

      const worksheet2 = workbook.addWorksheet("Hinta tiedot");
      const worksheet3 = workbook.addWorksheet("Diipadaapaa");

      //Add title row
      worksheet.mergeCells('A1', 'D1');
      worksheet.getCell('A1').value = 'A1 Pohjoismainen sähköpörssi'
      worksheet.getCell('A2').value = 'Sarake filtteröinti ei toimi esim LibreOffice Calc ohjelmassa'
      worksheet.getCell('A3').value = 'Mutta toimii esim Googlessa'
      worksheet.getRow(1).font = { bold: true };

      worksheet3.mergeCells('A1', 'F1');
      worksheet3.getCell('A1').value = 'A1 Sivu 3 Pitääkö tännekkin jotain tuupata??'
      worksheet3.getRow(1).font = { bold: true };
      worksheet3.getCell('A5').value = "A5 Tämäkin on tyhjä";
      worksheet3.getCell('C7').value = "C7 solu ja leveys asetus 1000 ei vaikuta mitään";
      worksheet3.getCell('C7').width = 1000;
      worksheet3.getCell('A9').value = "Mutta sisällön mukaan, oletuksena sarakkeen levitys toimii";

      // add worksheet columns
      // each columns contains header and its mapping key from data
      /*Column headers*/
      worksheet2.getRow(1).values = ['Pvm', 'Klo:', 'Hinta:']; // esim jos haluaa taulukon alkavan tietyltä riviltä worksheet2.getRow(11).values
      worksheet2.getRow(1).font = { bold: true };
      worksheet2.columns = [
        { key: 'pvm'},
        { key: 'klo'},
        { key: 'hinta'}
      ]

      //alkuperäinen versio, ekaksi kolum headerit, joiden key:n mukaan rivi data sitten asetetaan
      //set first row as colum header row.
      //worksheet.columns = columns;
      //worksheet.getRow(1).font = { bold: true };
      //loop through all of the columns and set the alignment with width.
      worksheet2.columns.forEach(column => {
        column.width = 10; //column.header.length + 5;
        column.alignment = { horizontal: 'center' };
      });

      // loop through data and add each one to worksheet
      respData.forEach(singleData => {
        worksheet2.addRow(singleData);
      });

      // loop through all of the rows and set border style
      worksheet2.eachRow({ includeEmpty: false }, row => {
        // store each cell to currentCell
        const currentCell = row._cells;

        // loop through currentCell to apply border only for the non-empty cell of excel
        currentCell.forEach(singleCell => {
          // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
          const cellAddress = singleCell._address;

          worksheet2.getCell(cellAddress).border = {
            top:    { style: 'thin' },
            left:   { style: 'thin' },
            bottom: { style: 'thin' },
            right:  { style: 'thin' }
          };
        });
      });

      // Iterate all columns and set the width according max content found
      worksheet2.columns.forEach((column, colNumber) => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, (cell) => {
          const columnLength = cell.value ? cell.value.toString().length : 10; // Minimum column width
          maxLength = Math.max(maxLength, columnLength);
        });

        // Add extra padding for better readability
        column.width = maxLength + 2; 
      });

      // Set an auto filter from A1 to C1
      // Asettaa filtterit, mutta eivät toimi esim Googlessa
      //worksheet.autoFilter = {
      //  from: 'A11',
      //  to: 'C11',
      //}

      worksheet2.autoFilter = {
        from: {
          row: 1,
          column: 1
        },
        to: {
          row: 29,
          column: 2
        }
      }

      // write the content using writeBuffer
      const buf = await workbook.xlsx.writeBuffer();

      // download the processed file
      saveAs(new Blob([buf]), `${fileName}.xlsx`);
    } catch (error) {
      console.error('Nyt meni perseeleen Ekseli. Error: ', error);
    } finally {
      // removing worksheet's instance to create new one
      workbook.removeWorksheet(workSheetName);
    }
  };

  return (
    <>
     <div>
        <div>
          Lataa sähkökäppyrä Exceliin
          <br />
          <br />
          Lataa nimellä : <input data-testid="RFW_ExcelFileName" id={myInputId} defaultValue={workBookName} /> .xlsx
        </div>

        <br />
        <div>
          <button data-testid="RFW_ExcelDownloadButton" className="button" onClick={saveExcel}>Lataa</button>
        </div>

        <br />

        <div>
          <table style={{ margin: '0 auto' }}>
            <thead>
            <tr>
              <th key={-1}></th>
              {columns.map(({ header, index }) => {
                return <th key={""+header}>{header}</th>;
              })}
            </tr>
            </thead>

            <tbody>
            <tr>
              <td>Eka</td>
              <td>{respData[0].pvm}</td>
              <td>{respData[0].klo}</td>
              <td>{respData[0].hinta}</td>
            </tr>

            <tr>
              <td>Vika</td>
              <td>{respData[respData.length -4].pvm}</td>
              <td>{respData[respData.length -1].klo}</td>
              <td>{respData[respData.length -1].hinta}</td>
            </tr>
            </tbody>

            {/*data.map((uniqueData, i) => {
              return (
                <tr key={i}>
                  {Object.entries(uniqueData).map((eachData,w) => {
                    const value = eachData[1];
                    return <td key={w}>{value}</td>;
                  })}
                </tr>
              );
            })*/}

          </table>
        </div>
      </div>
    </>
  );
}
