import React, { Component } from 'react'
import { addItem, deleteItem } from "../../Helpers/handleLocalStorage"
import { withRouter } from 'react-router-dom'
import ProductTableField from '../Atoms/ProductTableField';

class AdminProducts extends Component {

  state = {
    productName: '',
    productType: '',
    productIMG: '',
    productPrice: '',
    products: localStorage.products ? JSON.parse(localStorage.products) : []
  }

  handleChange = (field) => {
    return e => {
      this.setState({
        [field]: e.target.value
      })
    }
  }

  handleDelete = (name) => {
    return () => {
      deleteItem(name, 'products')
    }
  }


  onSubmit = (e) => {
    e.preventDefault()
    const { productName, productType, productPrice, productIMG } = this.state

    const product = {
      name: productName,
      type: productType,
      IMG: productIMG,
      price: productPrice
    }

    if (addItem(product, 'products')) {
      this.setState({
        productName: '',
        productType: '',
        productIMG: '',
        productPrice: '',
        products: localStorage.products ? JSON.parse(localStorage.products) : []
      })
    }
  }

  render() {
    return (
      <main>
        <section className="hero is-black is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="column is-4 is-offset-4">
                        <h3 className="title has-text-white">Products Manager</h3>
                        <p className="subtitle has-text-grey">Add products as you like</p>
                        <div className="box">
                            <form onSubmit={this.onSubmit}> 
                                <div className="field">
                                    <div className="control">
                                        <input className="input is-large is-warning" type="text" placeholder="Product Name" autoFocus=""
                                        value={this.state.productName}
                                        onChange={this.handleChange('productName')}
                                        required />
                                    </div>
                                </div>

                                <div className="field">
                                    <div className="control">
                                        <div className="select is-large is-warning"
                                          value={this.state.productType}
                                          onChange={this.handleChange('productType')} >
                                          <select>
                                          <option>Product Type</option>
                                          <option value="drawings">Drawings</option>
                                          <option value="tattoos">Tattoos</option>
                                          <option value="others" >Others</option>
                                          required />
                                          </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="field">
                                    <div className="control">
                                        <input className="input is-large is-warning" type="url" placeholder="Image URL"
                                        value={this.state.productIMG}
                                        onChange={this.handleChange('productIMG')}
                                        required />
                                    </div>
                                </div>

                                <div className="field">
                                    <div className="control">
                                        <input className="input is-large is-warning" type="number" placeholder="Product Price"
                                        value={this.state.productPrice}
                                        onChange={this.handleChange('productPrice')}
                                        required />
                                    </div>
                                </div>
                                <input className="button is-block is-warning is-large is-fullwidth" type="submit" value="Add Product" />
                            </form>                  
                        </div>
                    </div>
                    <div className="container">
                      <div className="notification">
                        {this.state.products.map((item, key) => (
                        <ProductTableField key={key}
                        item={item}
                        handleDelete={this.handleDelete(item)} />
                        ))}
                      </div>
                    </div>
                </div>
            </div>
        </section>
      </main>
    )
  }
}

export default withRouter(AdminProducts)
