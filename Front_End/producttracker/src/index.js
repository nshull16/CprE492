import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import ProductTable from './Components/ProductTable';
import ContractTable from './Components/ContractTable';
import AddProductModal from './Components/AddProductModal';
import EditProductModal from './Components/EditProductModal';
import AddContractModal from './Components/AddContractModal';
import ProductButtons from './Components/ProductButtons';
import ContractButtons from './Components/ContractButtons';
import ProductDetailsModal from './Components/ProductDetailsModal';
import EditContractModal from './Components/EditContractModal';
import ContractDetailsModal from './Components/ContractDetailsModal';
import AdminViewButton from './Components/AdminViewButton';
import AdminViewModal from './Components/AdminViewModal';
import LoadingModal from './Components/LoadingModal';
import DeleteContractModal from "./Components/DeleteContractModal";
import DeleteProductModal from "./Components/DeleteProductModal";
import GlobalEditContractModal from "./Components/GlobalEditContractModal";
import GlobalEditProductModal from "./Components/GlobalEditProductModal";

ReactDOM.render(<LoadingModal />, document.getElementById('LoadingModal'));
ReactDOM.render(<AdminViewButton />, document.getElementById('AdminViewButton'));
ReactDOM.render(<div><ProductButtons /><ProductTable /></div>, document.getElementById('ProductTable'));
ReactDOM.render(<div><ContractButtons /><ContractTable /></div>, document.getElementById('ContractTable'));
ReactDOM.render(<AdminViewModal />, document.getElementById('AdminViewModal'));
ReactDOM.render(<AddProductModal />, document.getElementById('AddProductModal'));
ReactDOM.render(<ProductDetailsModal />, document.getElementById('ProductDetailsModal'));
ReactDOM.render(<EditProductModal />, document.getElementById('EditProductModal'));
ReactDOM.render(<AddContractModal />, document.getElementById('AddContractModal'));
ReactDOM.render(<EditContractModal />, document.getElementById('EditContractModal'));
ReactDOM.render(<ContractDetailsModal />, document.getElementById('ContractDetailsModal'));
ReactDOM.render(<DeleteContractModal />, document.getElementById('DeleteContractModal'));
ReactDOM.render(<DeleteProductModal />, document.getElementById('DeleteProductModal'));
ReactDOM.render(<GlobalEditContractModal />, document.getElementById('GlobalEditContractModal'));
ReactDOM.render(<GlobalEditProductModal />, document.getElementById('GlobalEditProductModal'));