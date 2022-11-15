export default function tableToJson(table: any) {
  var data = [];
  for (var i = 0; i < table?.rows?.length; i++) {
    var tableRow = table?.rows[i];
    var rowData = [];
    for (var j = 0; j < tableRow.cells.length; j++) {
      rowData.push(tableRow.cells[j].innerHTML);
    }
    data.push(rowData);
  }
  return data;
}