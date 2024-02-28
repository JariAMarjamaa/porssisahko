import React from 'react';
import Excel from 'exceljs';    // npm i exceljs
import { saveAs } from 'file-saver';  // npm i file-saver
import './exportToExcel.css';

const columns = [
  { header: 'Pvm:', key: 'pvm' },
  { header: 'Klo:', key: 'klo' },
  { header: 'Hinta:', key: 'hinta' },
];

const data = [
  {
    pvm: '5.5.2023',
    klo: '18:00',
    hinta: 12.5
  },
  {
    pvm: '6.5.2023',
    klo: '12:00',
    hinta: 27.8
  }
];

const workSheetName = 'Sivu';
const workBookName = 'Excel tiedosto';
const myInputId = 'myInput';

export default function ExcelDownload() {
  const workbook = new Excel.Workbook();

  const saveExcel = async () => {
    try {
      const myInput = document.getElementById(myInputId);
      const fileName = myInput.value || workBookName;

      // creating one worksheet in workbook
      const worksheet = workbook.addWorksheet(workSheetName+"-1");
      const worksheet2 = workbook.addWorksheet(workSheetName+"-2");

      worksheet2.mergeCells('A1', 'F1');
      worksheet2.getCell('A1').value = 'A1 Sivu 2 Pitääkö tännekkin jotain tuupata??'
      worksheet2.getRow(1).font = { bold: true };

      //Add title row
      worksheet.mergeCells('A1', 'D1');
      worksheet.getCell('A1').value = 'A1 Pohjoismainen sähköpörssi'
      worksheet.getCell('A2').value = 'Demo data vielä'
      worksheet.getRow(1).font = { bold: true };


      worksheet.getCell('A5').value = "A5 Tämäkin on tyhjä";

      worksheet.getCell('C7').value = "C7 solu ja leveys asetus 1000 ei vaikuta mitään";
      worksheet.getCell('C7').width = 1000;

      worksheet.getCell('A9').value = "Mutta sisällön mukaan, oletuksena sarakkeen levitys toimii";

      // add worksheet columns
      // each columns contains header and its mapping key from data
      /*Column headers*/
      worksheet.getRow(11).values = ['Pvm', 'Klo:', 'Hinta:'];
      worksheet.getRow(11).font = { bold: true };
      worksheet.columns = [
        { key: 'pvm'},
        { key: 'klo'},
        { key: 'hinta'}
      ]

      //alkuperäinen versio, ekaksi kolum headerit, joiden key:n mukaan rivi data sitten asetetaan
      //set first row as colum header row.
      //worksheet.columns = columns;
      //worksheet.getRow(1).font = { bold: true };
      //loop through all of the columns and set the alignment with width.
      worksheet.columns.forEach(column => {
        column.width = 10; //column.header.length + 5;
        column.alignment = { horizontal: 'center' };
      });

      // loop through data and add each one to worksheet
      data.forEach(singleData => {
        worksheet.addRow(singleData);
      });

      // loop through all of the rows and set border style
      worksheet.eachRow({ includeEmpty: false }, row => {
        // store each cell to currentCell
        const currentCell = row._cells;

        // loop through currentCell to apply border only for the non-empty cell of excel
        currentCell.forEach(singleCell => {
          // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
          const cellAddress = singleCell._address;

          worksheet.getCell(cellAddress).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
      });

      // Iterate all columns and set the width according max content found
      worksheet.columns.forEach((column, colNumber) => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, (cell) => {
          const columnLength = cell.value ? cell.value.toString().length : 10; // Minimum column width
          maxLength = Math.max(maxLength, columnLength);
        });

        // Add extra padding for better readability
        column.width = maxLength + 2; 
      });

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
          Lataa nimellä : <input id={myInputId} defaultValue={workBookName} /> .xlsx
        </div>

        <br />
        <div>
          <button className="button" onClick={saveExcel}>Lataa</button>
        </div>

        <br />

        <div>
          <table style={{ margin: '0 auto' }}>
            <tr>
              {columns.map(({ header, index }) => {
                return <th key={index}>{header}</th>;
              })}
            </tr>

            {data.map((uniqueData, i) => {
              return (
                <tr key={i}>
                  {Object.entries(uniqueData).map((eachData,w) => {
                    const value = eachData[1];
                    return <td key={w}>{value}</td>;
                  })}
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}
