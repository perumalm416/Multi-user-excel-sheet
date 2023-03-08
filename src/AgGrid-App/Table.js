import { AgGridReact } from "ag-grid-react";
import { Fragment, useState } from "react";
import "./AgGridApp.css";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "ag-grid-enterprise";

export const Table = () => {
  const [gridApi, setGridApi] = useState("");
  const [gridColumnApi, setGridColumnApi] = useState("");
  const [toggleColumn, setToggleColumn] = useState(null);

  //1. this is First way of make rows data
  // const rowInfo = [
  //   { name: "perumal", age: 23 },
  //   { name: "Bigmal", age: 24 },
  //   { name: "Abdul", age: 22 },
  //   { name: "Kalam", age: 26 },
  // ];
  const columnInfo = [
    {
      headerName: "Name",
      field: "name",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Email",
      field: "email",
      tooltipField: "name",
      filter: "agTextColumnFilter",
      cellClass: (param) => (param.value !== 23 ? "notAge23" : "Age23"),
    },
    {
      headerName: "Body",
      field: "body",
      hide: toggleColumn,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Action",
      field: "name",
      filter: "agTextColumnFilter",
      cellRendererFramework: (param) => (
        <div>
          <button onClick={() => console.log(param.value)}>Action</button>
        </div>
      ),
    },
  ];
  const columnDefsProperty = {
    sortable: true,
    editable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
  };
  const quickFilterInputStyle = {
    width: "100%",
    padding: "10px 5px",
    borderRadius: "20px",
    outline: 0,
    border: "2px solid blue",
  };
  const datasource = {
    getRows(param) {
      console.log(JSON.stringify(param.request, null, 1));
      const { startRow, endRow, sortModel, filterModel } = param.request;
      let url = "http://localhost:4001/comments?";
      const sortItem = Object.keys(filterModel);
      sortItem.forEach(item => {url += `${item}=${filterModel[item].item}&`});
      //pagination in serverside
      console.log(startRow, endRow);
      url += `_start=${startRow}&_end=${endRow}`;
      //filter
      
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          param.successCallback(res, 499);
        })
        .catch(function (error) {
          param.failCallback();
        });
    },
  };

  const onGridReady = (param) => {
    setGridApi(param.api);
    setGridColumnApi(param.columnApi);

    // 2. this is second way of make the rows data
    //   const response = fetch("https://jsonplaceholder.typicode.com/comments")
    //     .then((res) => res.json())
    //     .then((res) => param.api.applyTransaction({ add: res }));

    //3. this is third way of make rows data with using serversSide
    param.api.setServerSideDatasource(datasource);
  };

  const onExportHandler = () => gridApi.exportDataAsCsv();
  const onSelectionChanged = (param) => {
    console.log(param.api.getSelectedRows());
  };
  const isRowSelectable = (param) => {
    return param.data ? param.data.email.includes("@a") : false;
  };
  const onSelectPageSize = (event) => {
    gridApi.paginationSetPageSize(event.target.value);
  };
  const onTaggleShowColumn = () => {
    //  gridColumnApi.setColumnsVisible(["body"],toggleColumn);  it's way easily make toggle action more than one field
    setToggleColumn(!toggleColumn);
    gridColumnApi.sizeColumnsToFit();
  };
  const onQuickFilter = (event) => {
    gridApi.setQuickFilter(event.target.value);
  };

  return (
    <Fragment>
      <div>
        <div>
          <button onClick={onExportHandler}>Export</button>
          <select onChange={onSelectPageSize}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
          <button onClick={onTaggleShowColumn}>ToggleShowColumn</button>
          <div style={{ backgroundColor: "lightgreen", padding: "10px" }}>
            <input
              type="search"
              placeholder="search something..."
              onChange={onQuickFilter}
              style={quickFilterInputStyle}
            />
          </div>
        </div>

        <div className="ag-theme-alpine" style={{ width: "100%" }}>
          <AgGridReact
            // rowData={rowInfo}      1st method
            rowModelType="serverSide" // 3rd method
            columnDefs={columnInfo}
            defaultColDef={columnDefsProperty}
            onGridReady={onGridReady}
            enableBrowserTooltips={true}
            tooltipShowDelay={{ tooltipShowDelay: 2 }}
            rowSelection="multiple"
            onSelectionChanged={onSelectionChanged}
            isRowSelectable={isRowSelectable}
            pagination={true}
            paginationPageSize={8}
            domLayout="autoHeight"
            // paginationAutoPageSize={true}
          />
        </div>
      </div>
    </Fragment>
  );
};
 



                                                                                           