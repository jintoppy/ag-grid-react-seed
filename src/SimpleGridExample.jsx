import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import Input from './Input';

export default class extends Component {
    constructor(props) {
        super(props);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onBtnClick = this.onBtnClick.bind(this);
        this.state = {
            columnDefs: this.createColumnDefs(),
            rowData: this.createRowData(),
            sidebarOpen: true
        };
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }
    onBtnClick(){
        this.setState({
            sidebarOpen: !this.state.sidebarOpen
        });
    }
    onPriceChange() {
        console.log('on price change');
    }
    createColumnDefs() {
        return [
            { headerName: "Make", field: "make" },
            { headerName: "Model", field: "model" },
            {
                headerName: "Price",
                field: "price",
                cellRendererFramework: (params) => {
                    const cellData = params.data;
                    const optInElement = (
                        <Input
                            type="text"
                            onChange={() => this.onPriceChange()}
                            value={cellData}
                        />);
                    return optInElement;
                }
            }
        ];
    }

    createRowData() {
        return [
            { make: "Toyota", model: "Celica", price: 35000 },
            { make: "Ford", model: "Mondeo", price: 32000 },
            { make: "Porsche", model: "Boxter", price: 72000 }
        ];
    }

    componentWillUpdate(nextProps, nextState){
        const api = this.gridApi;
        if (this.state.sidebarOpen !== nextState.sidebarOpen && api) {
            api.sizeColumnsToFit();
        }
    }

    render() {
        let containerStyle = {
            height: '100%',
            width: 500
        };

        let contentWrapperStyle = {
            height: '100%',
            width: '100%'
        };

        let sidebarStyle = {
            display: 'inline-block',
            width: '350px',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            left: this.state.sidebarOpen? '0' : '-350px'
        };

        let gridWrapperStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            left: this.state.sidebarOpen? '350px' : '0'
        };

        return (
            <div style={containerStyle} className="ag-fresh">
                <h1>Simple ag-Grid React Example</h1>
                <div id="content-wrapper" style={contentWrapperStyle}>
                    <div id="sidebar" style={sidebarStyle}>
                        This is sidebar
                    </div>
                    <div id="grid-wrapper" style={gridWrapperStyle}>
                        <div>
                            <button onClick={this.onBtnClick}>Toggle Sidebar </button>
                        </div>
                        <AgGridReact
                            // properties
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            suppressRowClickSelection>
                        </AgGridReact>
                    </div>
                </div>
            </div>
        )
    }
};
